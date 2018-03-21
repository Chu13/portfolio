const express = require('express');
const router  = express.Router();

const MessageModel = require('../models/message-model');

router.get('/skills', (req, res, next) => {
  res.render('profile-views/skills',{
    page_name: 'skills'
  });
});

router.get('/work', (req, res, next) => {
  res.render('profile-views/work', {
    page_name: 'work'
  });
});

router.get('/resume', (req, res, next) => {
  res.render('profile-views/resume', {
    page_name: 'resume'
  });
});

router.get('/contact', (req, res, next) => {
  res.render('contact', {
    page_name: 'contact'
  });
});

router.post("/contact", (req, res, next) => {
  const theMessage = new MessageModel({
    name: req.body.name ,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
    dateAdded: new Date()
  });

  theMessage.save()
// After process the form redirect to the list of places
  .then(() => {

    res.redirect("/thanks");

  })
  .catch((err) => {
    if(theMessage.errors) {
      res.locals.validationErrors = err.errors;
      res.render("/contact");
    }
    else{
      next(err);
  }
  });
});

router.get('/thanks', (req, res, next) => {
  res.render('thanks');
});


module.exports = router;
