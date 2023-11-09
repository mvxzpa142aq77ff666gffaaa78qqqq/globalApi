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

const SendMoney = require("../../modelos/sends")
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


async function Enviar(req, res) {
    const { nameAdmin,
        phoneAdmin, idAdmin, nameSend,
        nameRecep, phoneSend, phoneRecep,
        quantSend, dipSend, adressRecep } = req.body


    //GENERAR LA CONTRASENA Y LA LLAVE SECRETA DEL SOCIO

    var confirmarRecp = Claves();
    var refenciaRecp = Claves();
    console.log(confirmarRecp, refenciaRecp, "codigossssssssssssss")

    let codigoDeVerificacion = confirmarRecp //bcrypt.hashSync(confirmarRecp, bcrypt.genSaltSync(10))
    let refSendCode = refenciaRecp //bcrypt.hashSync(refenciaRecp, bcrypt.genSaltSync(10))

    //AGENCIAMAL001

    const verifyAdmin = await RegisAdmin.findById(idAdmin).populate({ path: "userMaster" })
    //console.log(verifyAdmin)

    const verifyCajera = await RegisControlSist.findOne({ typeUser: 'Cajero' }).populate({ path: 'roles' })



    try {

        if (verifyAdmin !== null && verifyAdmin.activeAdmin) {

            //comparar codigo de verificacion



            //console.log(valoresInteres, "ssssskkkkkkkfdddddddooooooooooooooooooopppppppppp")
            if (true) {

                const verifyCSMaster = await RegisControlSist.findById(verifyAdmin.idCSMaster).populate({ path: 'roles' })
                //console.log(verifyCSMaster , 'fffffff')

                if (verifyCSMaster !== null && verifyCSMaster.activeCount) {
                    const porcentage = Number(verifyCSMaster.roles[0].porcentage) ? Number(verifyCSMaster.roles[0].porcentage) : 0
                    const valoresInteres = CalculoIntereces(quantSend, verifyAdmin.userMaster[0].typeUser, porcentage)
                    const comision = valoresInteres.total
                    const interesGlobals = valoresInteres.ig
                    const iva = valoresInteres.iva
                    const interesSocioE = Number(valoresInteres.isE)
                    const interesSocioR = Number(valoresInteres.isR)
                    const commisionMasQuanSend = Number(comision) + Number(quantSend)

                    if (verifyAdmin.quantSolde >= commisionMasQuanSend) {
                        if (valoresInteres.verificar) {
                            console.log(valoresInteres)

                            //CALCULAR PORCENTAGES Y ACTUALIZAR SOCIO

                            //caja

                            const cantSend = Number(quantSend)
                            const interesGeIva = Number(interesGlobals) + Number(iva)

                            const new_info = {
                                "quantSolde": Number(verifyAdmin.quantSolde) - commisionMasQuanSend,
                                "interesGlobal": Number(verifyAdmin.interesGlobal) + Number(interesGlobals) + Number(interesSocioR),
                                "interesSocio": Number(verifyAdmin.interesSocio) + Number(interesSocioE),
                                "totalComisiones": Number(verifyAdmin.totalComisiones) + Number(comision),
                                "interesSocioE": Number(verifyAdmin.interesSocioE) + Number(interesSocioE),
                                "iva": Number(verifyAdmin.iva) + Number(iva),
                                "quantSoldeEnviado": Number(verifyAdmin.quantSoldeEnviado) + Number(quantSend),
                            }

                            const new_update = await RegisAdmin.findByIdAndUpdate(idAdmin, new_info)


                            //master
                            /*
                            const new_info1 = {
                                "interesGlobal": Number(verifyCSMaster.interesGlobal) + Number(interesGlobals) + Number(interesSocioR),
                                "interesSocio": Number(verifyCSMaster.interesSocio) + Number(interesSocioE),
                                "totalComisiones": Number(verifyCSMaster.totalComisiones) + Number(comision),
                                "interesSocioE": Number(verifyCSMaster.interesSocioE) + Number(interesSocioE),
                                "iva": Number(verifyCSMaster.iva) + Number(iva),
                                "quantSoldeEnviado": Number(verifyCSMaster.quantSoldeEnviado) + Number(quantSend),
                            }

                            const new_update1 = await RegisControlSist.findByIdAndUpdate(verifyAdmin.idCSMaster, new_info1)
                            */

                            //cajera de gnob


                            const new_info2 = {
                                "interesGlobal": Number(verifyCajera.interesGlobal) + Number(interesGlobals) + Number(interesSocioR),
                                "iva": Number(verifyCajera.iva) + Number(iva),
                            }

                            const new_update2 = await RegisControlSist.findByIdAndUpdate(verifyCajera._id, new_info2)


                        } else {

                            console.log(valoresInteres)
                        }


                        //REGISTRAR TRANSFERENCIA
                        const sendData = new SendMoney()
                        sendData.nameAdmin = nameAdmin
                        sendData.idAdmin = idAdmin
                        sendData.phoneAdmin = phoneAdmin
                        sendData.adressGettoSend = verifyAdmin.gettoFriend

                        sendData.nameSend = nameSend
                        sendData.phoneSend = phoneSend
                        sendData.quantSend = Number(quantSend)
                        sendData.dipSend = dipSend
                        sendData.nameRecep = nameRecep
                        sendData.phoneRecep = phoneRecep
                        sendData.adressRecep = adressRecep
                        sendData.refSend = refSendCode
                        sendData.interesGlobal = Number(interesGlobals) + Number(interesSocioR)
                        sendData.iva = iva
                        sendData.interesSocio = interesSocioE
                        sendData.adressAdmin = verifyAdmin.adress1
                        sendData.idCSMaster = verifyAdmin.idCSMaster
                        sendData.phoneCSMaster = verifyAdmin.phoneCSMaster
                        sendData.comision = comision
                        sendData.fechaA = new Date()

                        sendData.codeRecp = codigoDeVerificacion
                        sendData.verifyRecp = false

                        const addData = await sendData.save()

                        console.log(addData)

                        //ENVIAR MENSAGE A LOS NUMEROS DE TELEFONO DE LA TRANSFERENCIA
                        const cantidadEnviar = quantSend

                        
                        try {
                            client.messages
                                .create({
                                    messagingServiceSid: process.env.MESSAGE_ID_GNOP,
                                    from: "G-NOB",
                                    to: `+240${phoneRecep}`,
                                    body: `G-NOB MONEY le notifica que acabas de recibir una transferencia de dinero. Su codigo de verificacion es ${codigoDeVerificacion}, dirijase a cualquier agencia de G-NOB MONEY. No olvides llevar tu documento de identificacion personal`,
                                })
                                .then(message => console.log(message.sid))
                                .done();


                        } catch (error) {

                        }
                        //${phoneSend.slice(0, 3)} ${phoneSend.slice(3, 6)} ${phoneSend.slice(6, 9)} 

                        try {

                            //ENVIAR CODIGO DE REFERENCIA AL NUMERO QUE A ECHO LA TRANSFERENCIA
                            client.messages
                                .create({
                                    messagingServiceSid: process.env.MESSAGE_ID_GNOP,
                                    from: "G-NOB",
                                    to: `+240${phoneSend}`,
                                    body: `G-NOB le notifica que su transferencia de ${cantidadEnviar.toLocaleString("es-GQ")} XAF se ha realizado con exito. Su codigo de cancelacion es el ${refSendCode}. Y su codigo del envio es el ${codigoDeVerificacion}. Su satisfaccion es nuestra prioridad.`,
                                })
                                .then(message => console.log(message.sid))
                                .done();

                        } catch (error) {

                        }

                        res.status(200).json({ "verificar": true, "mens": "El envio se a realizado con exito", "result": addData })
                    } else {
                        res.status(200).json({ verificar: false, mens: "Porfavor no cuenta de saldo suficiente para realizar esta operacion" })
                    }

                } else {
                    res.status(200).json({ "verificar": false, "mens": "Cuenta master bloqueado o o master no existe" })

                }
                //CALCULO DE PORCENTAGES POR INTERVALOS DE PRECIOS

            }





        } else {
            res.status(200).json({ verificar: false, mens: "No estas autorizado para esta tarrea" })
        }
    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema azzz" })
    }
}

module.exports = Enviar