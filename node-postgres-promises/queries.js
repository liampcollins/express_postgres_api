var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:@localhost:5432/competitions';
var db = pgp(connectionString);

// add query functions
function getAllCompetitions(req, res, next) {
  db.any('select * from comps')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL competitions'
        });
    })
    .catch(function (err) {
      console.log('ERR:', err)
      return next(err);
    });
}

function getSingleCompetition(req, res, next) {
  var compID = parseInt(req.params.id);
  db.one('select * from comps where id = $1', compID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE comp'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createCompetition(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into comps(name, image)' +
      'values(${name}, ${image})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one comp'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateCompetition(req, res, next) {
  console.log('params', req.params, 'body', req.body)
  db.none('update comps set name=$1, image=$2 where id=$3',
    [req.body.name, req.body.image, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated comp'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeCompetition(req, res, next) {
  var compID = parseInt(req.params.id);
  db.result('delete from comps where id = $1', compID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} competition`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllCompetitions: getAllCompetitions,
  getSingleCompetition: getSingleCompetition,
  createCompetition: createCompetition,
  updateCompetition: updateCompetition,
  removeCompetition: removeCompetition
};
