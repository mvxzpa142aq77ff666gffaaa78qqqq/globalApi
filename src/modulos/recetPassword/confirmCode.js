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
        console.log(Codigo)

        const verifyUser1 = await RegisAdmin.findOne({ username: data.username })
        const verifyUser2 = await RegisControlSist.findOne({ username: data.username })
        if (verifyUser1 !== null) {

            /******************************************************************* */
            //ENVIAR AL SOCIO SUS CREDENCIALES DESPUES DE CREACION DE CUENTA
            /******************************************************************* */

            client.messages
                .create({
                    messagingServiceSid: process.env.MESSAGE_ID_GNOP,
                    from: "GNOB",
                    to: `+240${verifyUser1.phone}`,
                    body: `codigo de confirmacion ${Codigo}`,
                })
                .then(message => console.log(message.sid))
                .done();

            /****************************************************** */
            res.status(200).json({ verificar: true, mens: "ok", clave: Codigo })


        } else {

            if (verifyUser2 !== null) {
                /******************************************************************* */
                //ENVIAR AL SOCIO SUS CREDENCIALES DESPUES DE CREACION DE CUENTA
                /******************************************************************* */

                try {
                    client.messages
                        .create({
                            messagingServiceSid: process.env.MESSAGE_ID_GNOP,
                            from: "GNOB",
                            to: `+240${verifyUser2.phone}`,
                            body: `codigo de confirmacion ${Codigo}`,
                        })
                        .then(message => console.log(message.sid))
                        .done();
                } catch (error) {

                }



                /****************************************************** */
                res.status(200).json({ verificar: true, mens: "ok", clave: Codigo })
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