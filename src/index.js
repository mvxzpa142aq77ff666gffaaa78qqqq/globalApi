if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require("express")
const morgan = require("morgan")
const path = require("path")
const multer = require("multer")
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')
const session = require('express-session');
const passport = require('passport');
const CreateRoles = require("./libs/initialSetup")

const app = express()


//db
require("./db")
//passpor-local
require('./passport/local-auth');

//CREAR ROLES AL INICIAR POR EL SERVIDOR POR PRIMERA VEZ
CreateRoles()


//routing
const route = require("./route/rutas")



//setting
app.set("port", process.env.PORT || 9000)
app.set(morgan("dev"))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")



//middelware

app.use(express.urlencoded({ extended: false }))
app.use(morgan("dev"))
app.use(express.json({limit: '50mb'}))
app.use(cors(/*{origin:['http://localhost:3000','http://localhost:3001']}*/))

app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

//route
app.use("/", route)


//static
app.use(express.static(path.join(__dirname, "public")))





//init server
const puerto = app.get("port")
app.listen(puerto, () => {
  console.log(`servidor en el puerto ${puerto}`)
})