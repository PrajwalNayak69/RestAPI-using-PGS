const express = require("express");
const { Pool } = require("pg");
var app = express();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "prajwal",
});

const checkConn = () => {
  return new Promise((resolve, reject) => {
    try {
      pool.connect().then(() => {
        console.log("Database connected");
        return resolve();
      });
    } catch (err) {
      return reject(err);
    }
  });
};

checkConn();

const query = (text) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(text, (error, elements) => {
        if (error) {
          return reject(error);
        }
        return resolve(elements);
      });
    } catch (err) {
      return reject(err);
    }
  });
};

app.get("/dbtest", async (req, res) => {
  const queryText = `SELECT * FROM "Test"
  ORDER BY id ASC `;

  await query(queryText)
    .then((data) => {
      console.log(data.rows);
      return res.status(200).send({ success: true, data: data.rows });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ success: false });
    });

  //   return res.status(200).send({ success: true });
});
app.post("/dbtest", async (req, res) => {
    console.log(req.body);
  
    const { id, name } = req.body;
  
    const queryText = `INSERT INTO "Test"(id, name) VALUES (${id}, '${name}') RETURNING *`;
  
    await query(queryText)
      .then((data) => {
        console.log(data.rows);
        return res.status(200).send({ success: true, data: data.rows });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({ success: false });
      });
  
    //   return res.status(200).send({ success: true });
  });
  
  var server = app.listen(4001, function () {
    //   var host = server.address().address;
    var port = server.address().port;
    console.log("listening at %s", port);
  });
  