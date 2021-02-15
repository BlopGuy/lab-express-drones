const express = require('express');
const Drone = require('../public/javascripts/models/drone.model');
// require the Drone model here

const router = express.Router();

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((allDronesDB) => {
      res.render('drones/list', { drones: allDronesDB });
    });
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  Drone.find()
    .then((dronesFromDB) => {
      res.render('drones/create-form', { drones: dronesFromDB });
    });
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;
  Drone.create({ name, propellers, maxSpeed })
    .then(() => {
      res.redirect('/drones');
    });
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const droneId = req.params.id;
  Drone.findById(droneId)
    .then((droneFromDB) => {
      res.render('drones/update-form', { drone: droneFromDB });
    });
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const droneId = req.params.id;
  const { name, propellers, maxSpeed } = req.body;

  Drone.findByIdAndUpdate(droneId, { name, propellers, maxSpeed })
    .then(() => {
      res.redirect(`/drones`);
    });
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const droneId = req.params.id;
  Drone.findByIdAndDelete(droneId).then(() => {
    res.redirect('/drones');
  });
});

module.exports = router;
