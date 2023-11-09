const mongoose = require("mongoose");
const { MONGODB_URI_GNOP, MONGODB_LOCAL_GNOP } = require("./config");
// const mongodb_local = "mongodb://localhost/pedroBASE"

//nube
//const mongoDigi = process.env.MONGODB_URI_GNOP;

//local
//const local = process.env.MONGODB_LOCAL_GNOP;
mongoose
  .connect(MONGODB_URI_GNOP, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((db) => console.log("db is conected"))
  .catch((error) => {
    console.log(error); 
    console.log("Error can not conected in db");
}); 
