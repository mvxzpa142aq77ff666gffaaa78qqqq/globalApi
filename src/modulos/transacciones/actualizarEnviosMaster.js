const jwt = require("jsonwebtoken")
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

const Envios = require("../../modelos/sends")
const RegisAdmin = require("../../modelos/regisAdmin")
const RegisControlSist = require("../../modelos/regisControlSist")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */

/**************modulo de comisiones ********************************/
const CalculoIntereces = require("../comisiones")
/*************************************************************** */

/****************modulo para generar claves **************************/
const Claves = require("../generarClaves")
/***************************************************** */


async function ActualizarEnvioMaster(req, res) {

    const { nameAdmin,
        phoneAdmin, idAdmin, nameSend,
        nameRecep, phoneSend, phoneRecep,
        quantSend, dipSend, adressRecep, phoneAnteriorR,
        phoneAnteriorS, cantidadAnterior, idEnvio } = req.body


    //GENERAR LA CONTRASENA Y LA LLAVE SECRETA DEL SOCIO

    var confirmarRecp = Claves();
    var refenciaRecp = Claves();
    //console.log(confirmarRecp, refenciaRecp, "codigossssssssssssss")

    let codigoDeVerificacion = confirmarRecp //bcrypt.hashSync(confirmarRecp, bcrypt.genSaltSync(10))
    let refSendCode = refenciaRecp //bcrypt.hashSync(refenciaRecp, bcrypt.genSaltSync(10))

    //AGENCIAMAL001


    //console.log(verifyAdmin)

    const resultEnvio = await Envios.findById(idEnvio)



    try {

        if (resultEnvio !== null && !resultEnvio.verifyRecp) {

            const verifyAdmin = await RegisAdmin.findById(resultEnvio.idAdmin).populate({ path: "userMaster" })

            if (verifyAdmin !== null && verifyAdmin.activeAdmin) {
                const verifyCSMaster = await RegisControlSist.findById(idAdmin).populate({ path: 'roles' })
                if (verifyCSMaster !== null && verifyCSMaster.activeCount) {

                    if (verifyAdmin.idCSMaster === idAdmin) {

                        if (verifyCSMaster.acciones.includes('editar_factura')) {
                            if (phoneAnteriorR !== phoneRecep || phoneAnteriorS !== phoneSend) {
                                //ACTUALIZAMOS EL ENVIO
                                const new_infoE = {
                                    "nameRecep": nameRecep,
                                    "phoneRecep": phoneRecep,
                                    "nameSend": nameSend,
                                    "phoneSend": phoneSend,
                                    "adressRecep": adressRecep,
                                    "dipSend": dipSend,
                                    "codeRecp": codigoDeVerificacion,
                                    "refSend": refSendCode,
                                    "actualizadoPor": verifyAdmin.name
                                }
    
                                const new_updateE = await Envios.findByIdAndUpdate(idEnvio, new_infoE)
    
                                res.status(200).json({ "verificar": true, "mens": "Envio actualizado" })
    
    
                                
                                try {
                                    client.messages
                                        .create({
                                            messagingServiceSid: process.env.MESSAGE_ID_GNOP,
                                            from: "GNOB",
                                            to: `+240${phoneRecep}`,
                                            body: `GNOB le notifica que acaba de recibir una transferencia  de parte de ${phoneSend.slice(0, 3)} ${phoneSend.slice(3, 6)} ${phoneSend.slice(6, 9)} su codigo de verificacion es ${codigoDeVerificacion} (editado)`,
                                        })
                                        .then(message => console.log(message.sid))
                                        .done();
                                } catch (error) {
        
                                }
                                
    
    
    
    
                                /****************************************************** */
    
                                //ENVIAR CODIGO DE REFERENCIA AL NUMERO QUE A ECHO LA TRANSFERENCIA
                                /*
                                try {
        
                                    client.messages
                                        .create({
                                            messagingServiceSid: process.env.MESSAGE_ID_GNOP,
                                            from: "GNOB",
                                            to: `+240${phoneSend}`,
                                            body: `GNOB le notifica que acabas de hacer una transferencia de ${cantidadEnviar.toLocaleString("es-GQ")} XAF a ${phoneRecep.slice(0, 3)} ${phoneRecep.slice(3, 6)} ${phoneRecep.slice(6, 9)} su codigo de refencia es ${refSendCode} y su codigo de verificacion es ${codigoDeVerificacion} (editado)`,
                                        })
                                        .then(message => console.log(message.sid))
                                        .done();
        
                                     
                                } catch (error) {
        
                                }
                                */
    
                            } else {
                                //ACTUALIZAMOS EL ENVIO
                                const new_infoE = {
                                    "nameRecep": nameRecep,
                                    "phoneRecep": phoneRecep,
                                    "nameSend": nameSend,
                                    "phoneSend": phoneSend,
                                    "adressRecep": adressRecep,
                                    "dipSend": dipSend,
                                    "actualizadoPor": verifyAdmin.name
                                }
    
                                const new_updateE = await Envios.findByIdAndUpdate(idEnvio, new_infoE)
    
                                res.status(200).json({ "verificar": true, "mens": "Envio actualizado" })
    
                            }
                        } else {
                            res.status(200).json({ "verificar": false, "mens": "No tienes estos permisos" })
    
                        }

                    } else {
                        res.status(200).json({ "verificar": false, "mens": "Master no encontrado" })

                    }


                } else {
                    res.status(200).json({ "verificar": false, "mens": "El envio no existe" })
                }

            } else {
                res.status(200).json({ "verificar": false, "mens": "Cuenta master bloqueado o o master no existe" })
            }

        } else {
            res.status(200).json({ verificar: false, mens: "No estas autorizado para esta tarrea" })
        }
    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema azzz" })
    }
}

module.exports = ActualizarEnvioMaster