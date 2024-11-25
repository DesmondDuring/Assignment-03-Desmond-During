var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Landing', { title: 'Welcome To DD\'S Homework Tracker!', icon: "Learn More" });
});

module.exports = router;
