const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


//Twilio credentials

const accountSid = process.env.TWILIO_SSID_GNOP;
const authToken = process.env.AUTH_TOKEN_GNOP;
//const client = require('twilio')(accountSid, authToken);

//crear el secret del token
const secretToken = process.env.SECRET_TOKEN_GNOP

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */


const Caja = require("../../modelos/regisAdmin")
const Role = require("../../modelos/roles")


/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function IniciarSesionsCaja(req, res) {

  const { username, passw } = req.body
  const verifyIfAllOk = username && passw
  //console.log(secretToken)
  try {

    if (verifyIfAllOk) {

      //BUSCAR EL USUARIO
      const verify = await Caja.findOne({ username: username }).populate({ path: "userMaster" })

      console.log(verify)

      if (verify === null || verify.activeAdmin === false) {
        res.status(200).json({ verify: false, mens: "Inicio de session incorecto o activa la cuenta" })
      } else {
        const role = await Role.findOne({ name: verify.userMaster[0].typeUser })

        if (role !== null) {
          //comparar la contraseña del inicio de sesion con la que esta guardada en la base de datos si son iguales
          const comparePass = bcrypt.compareSync(passw, verify.passw)
          if (comparePass) {
            //creacion del token
            const newToken = jwt.sign({
              exp: Math.floor(Date.now() / 1000) + 60 *2,
              user: verify.name,
              id: verify._id
            }, secretToken)

            /******************************************** */
            //ENVIANDO LOS DATOS
            /************************************** */

            //console.log(verify)
            res.status(200).json({ verify: true, userData: verify, token: newToken, validarLogin: true, porcentage: role.porcentage })
          } else {
            res.status(200).json({ verify: false, mens: "verifica el usuario o la contrasena" })

          }

        } else {

          //comparar la contraseña del inicio de sesion con la que esta guardada en la base de datos si son iguales
          const comparePass = bcrypt.compareSync(passw, verify.passw)
          if (comparePass) {
            //creacion del token
            const newToken = jwt.sign({
              exp: Math.floor(Date.now() / 1000) + 60 *2,
              user: verify.name,
              id: verify._id
            }, secretToken)

            /******************************************** */
            //ENVIANDO LOS DATOS
            /************************************** */

            //console.log(verify)
            res.status(200).json({ verify: true, userData: verify, token: newToken, validarLogin: true, porcentage: 0 })
          } else {
            res.status(200).json({ verify: false, mens: "verifica el usuario o la contrasena" })

          }
        }
      }

    } else {
      res.status(200).json({ verify: false, mens: "Asegurate de tener rellenado los campos obligatorios" })
    }

  } catch (error) {
    console.log(error)
    res.status(200).json({ verify: false, mens: "hay un problema" })
  }
}

module.exports = IniciarSesionsCaja