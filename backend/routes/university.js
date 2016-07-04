const express = require('express');
const mongoose = require('mongoose');
const logger = require('../logger');
const University = mongoose.model('University');

var router = express.Router();
/**
 * @api {get} /universities Search for universities
 * @apiVersion 0.1.0
 * @apiPermission student, prof
 * @apiName GetUniversity
 * @apiGroup University
 *
 * @apiParam {String} q Query
 *
 * @apiError (400) InvalidQuery Query was not valid
 * @apiError (500) InternalError Internal error
 *
 * @apiSuccess {Object[]} universities List of universities
 * @apiSuccess {String} id University ID
 * @apiSuccess {String} name University name
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "err": [],
 *       "universities": [
 *         {
 *           "id": "56fbd94a9b05608e04ab47fd",
 *           "name": "Uni Bonn"
 *         }
 *       ]
 *     }
 *
 */
router.get('/', function (req, res) {
  if (req.query.q) req.checkQuery('q', 'InvalidQuery').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  var p = University.find();
  if (req.query.q) {
    p = University.find({ name: { $regex: req.query.q, $options: 'i' } });
  }
  p.select('id name')
   .lean(true)
   .exec()
   .then(function (universities) {
     return res.status(200).json({
       universities,
     });
   }).catch(function (err) {
     logger.error(err);
     return res.status(500).json({
       err: [{ msg: 'InternalError' }],
     });
   });
});

module.exports = router;
