const express = require("express");
const cors = require("cors");
const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
// app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// app.get('/',(req,res) => {
//   res.send("This is a sample express app")
// })

// var apiRoutes = require('./app/routes/index');
// app.use('/api', apiRoutes);

require("./app/routes/index")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});