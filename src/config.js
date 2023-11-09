const path = require("path");

/*
 * Toma las variables de .env. Asi otro desarrollador sabra que variables
 * debe incluir su version de archivo .env
 */


const MONGODB_URI_GNOP = process.env.MONGODB_URI_GNOP;
const MONGODB_LOCAL_GNOP = process.env.MONGODB_LOCAL_GNOP;
const SESSION_SECRET_GNOP = process.env.SESSION_SECRET_GNOP;
const SECRET_TOKEN_GNOP = process.env.SECRET_TOKEN_GNOP;
const TWILIO_SSID_GNOP = process.env.TWILIO_SSID_GNOP;
const TWILIO_AUTH_TOKEN_GNOP = process.env.TWILIO_AUTH_TOKEN_GNOP;

const PUBLIC_DIR_GNOP = path.join(__dirname, "public");

module.exports = {
  MONGODB_URI_GNOP,
  SESSION_SECRET_GNOP,
  PUBLIC_DIR_GNOP,
  SECRET_TOKEN_GNOP,
  TWILIO_SSID_GNOP,
  TWILIO_AUTH_TOKEN_GNOP,
  MONGODB_LOCAL_GNOP,
};
