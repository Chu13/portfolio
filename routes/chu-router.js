const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const UserModel = require("../models/user-model");
const MessageModel = require("../models/message-model");

const router = express.Router();




// USER SIGNUP ----------------------------
// Show the signup form
router.get("/chu/login", (req, res, next) => {
    if(req.user) {
      res.redirect("/chu/messages");

      return;
    }

    res.render("chu-views/login");
});

// Process the signup form
router.post("/process-signup", (req, res, next) => {
  if (req.body.signupPassword === "" ||
      req.body.signupPassword.length < 6 ||
      req.body.signupPassword.match(/[^a-z0-9]/i) === null
    ) {
        res.locals.errorMessage = "Password is invalid, should have numbers, letters & special characters";
        res.render("chu-views/login");

        return;
      }

      UserModel.findOne({ email: req.body.signupEmail })
      .then((userFromDb) => {

          if(userFromDb !== null){
            res.locals.errorMessage = "Email is taken";
            res.render("user-views/signup-page");
          }

      const salt = bcrypt.genSaltSync(10);

      const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);

      const theUser = new UserModel({
        fullName: req.body.signupFullName,
        email: req.body.signupEmail,
        encryptedPassword: scrambledPassword
      });

    return theUser.save();

    })
    .then(() => {
// Redirect after SUCCESSFUL to the index page
      res.redirect("/chu/messages");
    })
    .catch((err) => {
        next(err);
    });
});


// USER LOGIN ------------------------------------------------
//Show the login form
router.get("/chu/login", (req, res, next) => {
  if(req.user) {
    res.redirect("/chu/messages");

    return;
  }
    res.render("user-views/login");
});

//Process the log in form
router.post("/process-login", (req, res, next) => {
    UserModel.findOne({ email: req.body.loginEmail })
    .then((userFromDb) => {
        if (userFromDb === null){
          res.locals.errorMessage = "Email incorrect";
          res.render("chu-views/login");

          return;
        }


      const isPasswordGood =
      bcrypt.compareSync(req.body.loginPassword, userFromDb.encryptedPassword);

      if (isPasswordGood === false){
        res.locals.errorMessage = "Password incorrect";
        res.render("user-views/login"
        , {
          page_name: 'login'
        });

        return;
      }

        req.login(userFromDb, (err) => {
          if(err) {

            next(err);
        }
        else {

          res.redirect("/chu/messages", {
            page_name: 'messages'
          });
        }
        });
     })
    .catch((err) => {
      next(err);
    });
});

router.get("/chu/messages", (req, res, next) => {
  if(req.user === undefined){
  res.redirect("/");
  return;
}

  MessageModel
  .find()
  .exec()
  .then((messagesResults) => {
    res.locals.listOfMessages = messagesResults;
    res.render("chu-views/messages", {
      page_name: 'messages'
    });
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
