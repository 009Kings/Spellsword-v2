module.exports = function(req, res, next) {
  if(!req.user){
    res.json({ message: 'You need to be logged in to view this page' });
  } else {
    next();
  }
};