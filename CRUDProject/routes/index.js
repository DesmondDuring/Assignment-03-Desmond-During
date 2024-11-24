var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Landing', { title: 'Welcome To DD\'S Homework Tracker!', icon: "Learn More" });
});

router.get('/homework', function(req, res, next) {
  res.render('Homework/list', { title: 'Homework List', icon: "View List" });
});

module.exports = router;
