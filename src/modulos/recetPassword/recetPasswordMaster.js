const bcrypt = require("bcrypt")

//Twilio credentials
const accountSid = process.env.TWILIO_SSID_GNOP;
const authToken = process.env.AUTH_TOKEN_GNOP;
const client = require('twilio')(accountSid, authToken);
//crear el secret del token
const secretToken = process.env.SECRET_TOKEN_GNOP
/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const RegisControlSist = require("../../modelos/regisControlSist")
const RegisAdmin = require("../../modelos/regisAdmin")
const Clave = require('../generarCodiggoConfirm')

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function ConfirmCode(req, res) {
    const data = req.body

    try {

        const Codigo = Clave()
        const passwortEcryp = bcrypt.hashSync(data.passw, bcrypt.genSaltSync(10))

        const verifyMaster = await RegisControlSist.findById(data.userId)

        const verifyUser1 = await RegisAdmin.findOne({ username: data.username })
        const verifyUser2 = await RegisControlSist.findOne({ username: data.username })

        if (verifyUser1 !== null) {

            if (verifyMaster !== null) {
                if (verifyMaster._id == verifyUser1.idCSMaster) {

                    const new_info = {
                        "passw": passwortEcryp,
                    }
                    const new_update = await RegisAdmin.findByIdAndUpdate(verifyUser1._id, new_info)

                    /****************************************************** */
                    res.status(200).json({ verificar: true, mens: "Contrasena modificado" })

                } else {
                    res.status(200).json({ verificar: false, mens: "La caja no pertenece a este master" })
                }
            } else {
                res.status(200).json({ verificar: false, mens: "Master no encontrado" })

            }



        } else {

            if (verifyUser2 !== null) {
                if (verifyMaster !== null) {
                    console.log(verifyUser2,verifyMaster)
                    if (verifyMaster._id == verifyUser2._id) {
    
                        const new_info = {
                            "passw": passwortEcryp,
                        }
                        const new_update = await RegisControlSist.findByIdAndUpdate(verifyUser2._id, new_info)
    
                        /****************************************************** */
                        res.status(200).json({ verificar: true, mens: "Contrasena modificado" })
    
                    } else {
                        res.status(200).json({ verificar: false, mens: "Accion no permitido" })
                    }
                } else {
                    res.status(200).json({ verificar: false, mens: "Master no encontrado" })
    
                }
            } else {
                res.status(200).json({ verificar: false, mens: "El usuario no existe" })

            }
        }



    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = ConfirmCode