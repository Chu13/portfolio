const express = require('express');
const router  = express.Router();

router.get('/skills', (req, res, next) => {
  res.render('profile-views/skills');
});

router.get('/work', (req, res, next) => {
  res.render('profile-views/work');
});

router.get('/resume', (req, res, next) => {
  res.render('profile-views/resume');
});

module.exports = router;
