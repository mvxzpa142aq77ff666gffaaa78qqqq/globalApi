const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


//Twilio credentials

const accountSid = process.env.TWILIO_SSID_GNOP;
const authToken = process.env.AUTH_TOKEN_GNOP;

//crear el secret del token
const secretToken = process.env.SECRET_TOKEN_GNOP


/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */

/**************modulo de comisiones ********************************/
const CalculoIntereces = require("./comisiones")
/*************************************************************** */

/****************modulo para generar claves **************************/
const Claves = require("./generarClaves")
/***************************************************** */


async function InitRoute(req, res) {
    const { data } = req.body
    try {
        res.status(200).json({ verificar: false, mens: "Inicio de session incorecto o el socio esta desactivado" })
        
    } catch (error) {
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = InitRoute