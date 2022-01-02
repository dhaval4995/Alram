const sql = require("../config/db");

// constructor
const Alram = function(alram) {
  this.title = alram.title;
  this.description = alram.description;
  this.date = alram.date;
  this.time = alram.time;
  this.day = alram.day;
  this.active = alram.active ? alram.active : 0;
};

Alram.create = (newData, result) => {
  sql.query("INSERT INTO data SET ?", newData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created alram data: ", { id: res.insertId, ...newData });
    result(null, { id: res.insertId, ...newData });
  });
};

Alram.findById = (id, result) => {
  sql.query(`SELECT * FROM data WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found alram data: ", res[0]);
      
      var data = {
        'status' : true,
        'code' : 200,
        'data' : res[0]
      };
      result(null, data);
      return;
    }

    // not found Alram data with the id
    result({ kind: "not_found" }, null);
  });
};

Alram.getAll = (result) => {
  let query = "SELECT * FROM data";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("alram get all: ", res);
    result(null, res);
  });
};

Alram.updateById = (id, data, result) => {
  sql.query(
    "UPDATE data SET title = ?, description = ?, date = ?, time = ?, day = ?, active = ? WHERE id = ?",
    [data.title, data.description, data.date, data.time, data.day, data.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Alram with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated alram: ", { id: id, ...data });
      result(null, { id: id, ...data });
    }
  );
};

Alram.remove = (id, result) => {
  sql.query("DELETE FROM data WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Alram data with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted alram data with id: ", id);
    var data = {
        'status' : true,
        'code' : 200,
        'data' : [],
        'message' : 'Alram was deleted successfully!'
    };
    result(null, data);
  });
};

Alram.removeAll = result => {
  sql.query("DELETE FROM data", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} data`);
    var data = {
        'status' : true,
        'code' : 200,
        'data' : res,
        'message' : 'All Alram data were deleted successfully!'
    };
    result(null, data);
  });
};

module.exports = Alram;
