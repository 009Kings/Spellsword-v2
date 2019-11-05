/* ------------------------------------------ */
/* ------------ HELPER FUNCTIONS ------------ */
/* ------------------------------------------ */
let cleanString = string => {
  var regex = /â€™/gi;
  return string.replace(regex, "'");
}

let cleanDesc = sqeeky => {
  sqeeky.forEach((string, i) => {
    if (string[0] === " ") {
      let subtitleString = "*" + sqeeky[i-1];
      sqeeky[i-1] = subtitleString;
      let thisString = "|" + cleanString(string).substr(1);
      sqeeky[i] = thisString;
    } else {
      sqeeky[i] = cleanString(string);
    }
  });
  return sqeeky;
}

const axios = require('axios');
const db = require('./models');

async function seedClasses(classLinks) {
  for(const link of classLinks) {
    await axios.get(link).then(response=>{
      db.characterclass.findOrCreate({
        where: { name: response.data.name },
        defaults: {
          apiReference: link
        }
      }).then(([characterclass, created])=>{
        console.log(`${characterclass.name} was ${created ? 'created' : 'found'}`)
      }).catch(err=>{
        console.log(`💩You fucked up in class creation`);
        console.log(err);
      })
    })
  }
};

async function seedSchools(schoolLinks) {
  for(const link of schoolLinks) {
    await axios.get(link).then(response=>{
      db.school.findOrCreate({
        where: { name: response.data.name },
        defaults: {
          description: response.data.desc
        }
      }).then(([school, created])=>{
        console.log(`${school.name} was ${created ? 'created' : 'found'}`)
      }).catch(err=>{
        console.log(`💩You fucked up in school creation`);
        console.log(err);
      })
    })
  }
};

async function seedSpells(spellLinks) {
  for(const link of spellLinks) {
    await axios.get(link).then(response=>{
      let spellDeets = {...response.data};
      // Clean up the info
      spellDeets.desc = cleanDesc(spellDeets.desc).join('\n');
      spellDeets.higher_level = spellDeets.higher_level ? cleanString(spellDeets.higher_level.join(' ')) : null;
      spellDeets.components = cleanString(spellDeets.components.join(''));
      spellDeets.material = spellDeets.material ? cleanString(spellDeets.material) : null;
      spellDeets.ritual = spellDeets.ritual === "yes" ? true : false;
      spellDeets.concentration = spellDeets.concentration === "yes" ? true : false;

      db.school.findOne({ where: { 
        name: spellDeets.school.name 
      }}).then(school=>{
        db.spell.findOrCreate({
          where: { name: spellDeets.name },
          defaults: {
            description: spellDeets.desc,
            higherLevel: spellDeets.higher_level,
            reference: spellDeets.page,
            range: spellDeets.range,
            components: spellDeets.components,
            material: spellDeets.material,
            ritual: spellDeets.ritual,
            duration: spellDeets.duration,
            concentration: spellDeets.concentration,
            castingTime: spellDeets.casting_time,
            schoolId: school.id,
            level: spellDeets.level
          }
        }).then(([spell, created])=>{
          console.log(`💥${spell.name} was ${created ? 'created' : 'found'}`)
          spellDeets.classes.forEach(characterClass=>{
            db.characterclass.findOne({
              where: {name: characterClass.name}
            }).then(characterClass=>{
              spell.addCharacterclass(characterClass);
            }).catch(err=>{
              console.log(`Error in associating ${characterClass.name} and ${spell.name}`)
              console.log(err);
            })
          });
        }).catch(err=>{
          console.log(`💩You fucked up in spell creation`);
          console.log(err);
        })
      }).catch(err=>{
        console.log(`💩You fucked up in school finding`);
        console.log(err);
      })
    })
  }
};

// Seed classes
axios.get('http://www.dnd5eapi.co/api/classes/')
.then(response => {
  let urls = response.data.results.map(result=>result.url);
  seedClasses(urls)
}).catch(err=>console.log(`💥You done gon fucked up ${err}`))

// Seed schools
axios.get('http://www.dnd5eapi.co/api/magic-schools')
.then(response => {
  let urls = response.data.results.map(result=>result.url);
  seedSchools(urls)
}).catch(err=>console.log(`💥You done gon fucked up ${err}`))

// Seed spells
axios.get('http://www.dnd5eapi.co/api/spells')
.then(response => {
  let urls = response.data.results.map(result=>result.url);
  seedSpells(urls)
}).catch(err=>console.log(`💥You done gon fucked up ${err}`))


