const Alram = require('../models/data.models');
const Data = require('../models/data.models');

// create alram 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Alram
  const alram = new Alram({
    title: req.body.title,
    date: req.body.date,
    time: req.body.time,
    day: req.body.day,
    description: req.body.description,
    active: req.body.active ? req.body.active : 1
  });

  // Save Alram in the database
  Alram.create(alram, (err, data) => {
    if (err) {
      var dataObj = {
        'status': false,
        'code': 500,
        'message': err.message || "Some error occurred while creating the Alram.",
        'data': []
      };
    }
    else {
      if (data) {
        Data.getAll((err, result) => {
          if (err) {
            var dataObj = {
              'status': false,
              'code': 404,
              'message': 'Sorry, Alram no data found',
              'data': []
            };
          }
          else {
            var dataObj = {
              'status': true,
              'code': 200,
              'message': 'Success, Alram has been created',
              'data': result
            };
          }
        });
      } else {
        var dataObj = {
          'status': false,
          'code': 202,
          'message': 'Sorry, Alram has been not created',
          'data': data
        };
      }
    }
    res.send(dataObj);
  });
};

// Retrieve all alram data from the database.
exports.getAll = (req, res) => {

  const title = req.query.title;

  Data.getAll((err, data) => {
    if (err) {
      var dataObj = {
        'status': false,
        'code': 500,
        'message': err.message || "Some error occurred while retrieving alram data.",
        'data': []
      };
    }
    else {
      if (data.length > 0) {
        var dataObj = {
          'status': true,
          'code': 200,
          'message': 'Success, Alram listing',
          'data': data
        };
      } else {
        var dataObj = {
          'status': false,
          'code': 404,
          'message': 'Sorry,Alram data not found',
          'data': []
        };
      }
      res.send(dataObj);
    }
  });

};

// find single alram data
exports.findOne = (req, res) => {

  Alram.findById(req.params.alramId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        var dataObj = {
          'status': false,
          'code': 404,
          'message': `Not found Alram data with id ${req.params.alramId}.`,
          'data': []
        };
      } else {
        var dataObj = {
          'status': false,
          'code': 500,
          'message': "Error retrieving Alram data with id " + req.params.alramId,
          'data': []
        };
      }
    } else {
      var dataObj = {
        'status': true,
        'code': 200,
        'message': "Success,Alram data",
        'data': data
      };
    }
    res.send(dataObj);
  });
};

// remove single alram data
exports.delete = (req, res) => {
  Alram.remove(req.params.alramId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        var dataObj = {
          'status': false,
          'code': 404,
          'message': `Sorry,Not found Alram with id ${req.params.alramId}.`,
          'data': data
        };
      } else {
        var dataObj = {
          'status': false,
          'code': 500,
          'message': "Sorry,Could not delete Alram with id " + req.params.alramId,
          'data': data
        };
      }
    } else {
      var dataObj = {
        'status': true,
        'code': 200,
        'message': "Success,Remove alram data",
        'data': data
      };
    }
    res.send(dataObj);
  });
};

// remove all alram data
exports.deleteAll = (req, res) => {
  Alram.removeAll((err, data) => {
    if (err) {
      var dataObj = {
        'status': false,
        'code': 500,
        'message': err.message || "Some error occurred while removing all alram.",
        'data': []
      };
    } else {
      var dataObj = {
        'status': true,
        'code': 200,
        'message': "Success,Delete all alram data",
        'data': []
      };
    }
    res.send(dataObj);
  });
};

// update alram data
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Alram.updateById(
    req.params.alramId,
    new Alram(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          var dataObj = {
            'status': false,
            'code': 404,
            'message': `Not found Alram with id ${req.params.alramId}.`,
            'data': []
          };
        } else {
          var dataObj = {
            'status': false,
            'code': 500,
            'message': "Error updating Alram with id " + req.params.alramId,
            'data': []
          };
        }
      } else {
        var dataObj = {
          'status': true,
          'code': 200,
          'message': "Success,Update alram data",
          'data': []
        };
      }
      res.send(dataObj);
    }
  );
};