/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// Requiring our models and passport as we've configured it
const db = require('../models');
const passport = require('../config/passport');

module.exports = function(app) {
  const currentPlayer = [];
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/api/login', passport.authenticate('local'), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/signup', function(req, res) {
    db.User.create({
      email: req.body.user.email,
      password: req.body.user.password,
    })
        .then(function(response) {
          db.Hero.create({
            name: req.body.hero.name,
            UserId: response.id,
          })
              .then(function(result) {
                // console.log(result);
                res.status(201);
              })
              .catch(function(err) {
                res.status(500).json(err);
              });
        });
  });
  // Route for logging user out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.status(401);
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
      console.log(res.req.user);
    }
  });

  app.get('/api/hero_data', function(req, res) {
    console.log(req);
    console.log(res);
    res.json({
      name: req.hero.name,
      health_points: req.hero.health_points,
      attack_points: req.hero.attack_points,
      weapon_power: req.hero.weapon_power,
      potion_count: req.hero.potion_count,
    });
  });
};
