const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const logger = require('../logger');
const utils = require('../utils');
const Program = mongoose.model('Program');

var router = express.Router();


/**
 * @api {get} /programs Search for programs
 * @apiVersion 0.1.0
 * @apiPermission student, prof
 * @apiName GetProgram
 * @apiGroup Program
 *
 * @apiParam {String} q Query
 *
 * @apiError (400) InvalidQuery Query was not valid
 * @apiError (500) InternalError Internal error
 *
 * @apiSuccess {Object[]} programs List of programs
 * @apiSuccess {String} id Program ID
 * @apiSuccess {String} name Program name
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "err": [],
 *       "programs": [
 *         {
 *           "id": "5710dbb489e3c588305896df",
 *           "name": "Informatik"
 *         }
 *       ]
 *     }
 *
 */
router.get('/', function (req, res) {
  if (req.query.q) req.checkQuery('q', 'InvalidQuery').notEmpty().isAscii();

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors
    });
  }

  var p = Program.find()
  if (req.query.q) {
    p = Program.find({ name: { $regex: req.query.q, $options: 'i' } });
  }
  p.exec().then(function (programs) {
    var data = [];

    _.each(programs, function (program) {
      data.push({
        id: program.id,
        name: program.name
      });
    });
    return res.status(200).json({
      err: [],
      programs: data,
    });
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

module.exports = router;
