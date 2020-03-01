const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Item = db.item;

db.sequelize.sync();
//Database Migrations. 
// force: true will drop the table if it already exists
//comment this after  running first time.
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});


function initial() {
  Item.create({
    name: "bin1",
    bin_height: 8
  });

  Item.create({
    name: "bin2",
    bin_height: 9
  });

  Item.create({
    name: "bin3",
    bin_height: 7
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/item.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
