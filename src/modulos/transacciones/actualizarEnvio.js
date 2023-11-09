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


async function ActualizarEnvio(req, res) {
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

    const verifyAdmin = await RegisAdmin.findById(idAdmin).populate({ path: "userMaster" })
    //console.log(verifyAdmin)

    const verifyCajera = await RegisControlSist.findOne({ typeUser: 'Cajero' }).populate({ path: 'roles' })



    try {

        if (verifyAdmin !== null && verifyAdmin.activeAdmin) {

            const resultEnvio = await Envios.findById(idEnvio)

            //comparar codigo de verificacion
            /*
                        const valoresInteres = CalculoIntereces(quantSend, verifyAdmin.userMaster[0].typeUser)
                        const comision = valoresInteres.total
                        const interesGlobals = valoresInteres.ig
                        const iva = valoresInteres.iva
                        const interesSocioE = Number(valoresInteres.isE)
                        const interesSocioR = Number(valoresInteres.isR)
                        const commisionMasQuanSend = Number(comision) + Number(quantSend)
            
            
            
                        const comisionAnt = Number(resultEnvio.interesSocio) + Number(resultEnvio.iva) + Number(resultEnvio.interesGlobal)
                        const anteriorQuanComi = comisionAnt + Number(resultEnvio.quantSend)
                        const intGlAnt = comisionAnt - Number(resultEnvio.interesSocio) - Number(resultEnvio.iva)
                        const intSocioAnt = Number(resultEnvio.interesSocio)
                        const ivaAnt = Number(resultEnvio.iva)
                        const quantSendAnt = Number(resultEnvio.quantSend)
            
                        const cantidadAnteMasQundSoldMasComi = Number(resultEnvio.quantSend) + comisionAnt + Number(verifyAdmin.quantSolde)
            */
            const verifyCSMaster = await RegisControlSist.findById(verifyAdmin.idCSMaster)


            if (verifyCSMaster !== null && verifyCSMaster.activeCount) {

                if (resultEnvio !== null) {

                    //ACTUALIZAR CAJA MASTER

                    //caja master
                    /*
                    const new_info = {
                        "quantSolde": Number(verifyAdmin.quantSolde) + anteriorQuanComi - commisionMasQuanSend,
                        "interesGlobal": Number(verifyAdmin.interesGlobal) + Number(interesGlobals) + Number(interesSocioR) - intGlAnt,
                        "interesSocio": Number(verifyAdmin.interesSocio) + Number(interesSocioE) - intSocioAnt,
                        "totalComisiones": Number(verifyAdmin.totalComisiones) + Number(comision) - comisionAnt,
                        "interesSocioE": Number(verifyAdmin.interesSocioE) + Number(interesSocioE) - intSocioAnt,
                        "iva": Number(verifyAdmin.iva) + Number(iva) - ivaAnt,
                        "quantSoldeEnviado": Number(verifyAdmin.quantSoldeEnviado) + Number(quantSend) - quantSendAnt,
                    }

                    const new_update = await RegisAdmin.findByIdAndUpdate(idAdmin, new_info)


                    //master
                    const new_info1 = {
                        "interesGlobal": Number(verifyCSMaster.interesGlobal) - intGlAnt + Number(interesGlobals) + Number(interesSocioR),
                        "interesSocio": Number(verifyCSMaster.interesSocio) - intSocioAnt + Number(interesSocioE),
                        "totalComisiones": Number(verifyCSMaster.totalComisiones) - comisionAnt + Number(comision),
                        "interesSocioE": Number(verifyCSMaster.interesSocioE) - intSocioAnt + Number(interesSocioE),
                        "iva": Number(verifyCSMaster.iva) - ivaAnt + Number(iva),
                        "quantSoldeEnviado": Number(verifyCSMaster.quantSoldeEnviado) - quantSendAnt + Number(quantSend),
                    }

                    const new_update1 = await RegisControlSist.findByIdAndUpdate(verifyAdmin.idCSMaster, new_info1)

                    //cajera de gnob
                    const new_info2 = {
                        "interesGlobal": Number(verifyCajera.interesGlobal) - intGlAnt + Number(interesGlobals) + Number(interesSocioR),
                        "iva": Number(verifyCajera.iva) - ivaAnt + Number(iva),
                    }
                    const new_update2 = await RegisControlSist.findByIdAndUpdate(verifyCajera._id, new_info2)
                    const cantidadEnviar = quantSend
                    */





                    //ENVIAR MENSAGE A LOS NUMEROS DE TELEFONO DE LA TRANSFERENCIA
                    if (verifyAdmin.acciones.includes('editar_factura')) {
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
/*

    try {

        if (verifyAdmin !== null && verifyAdmin.activeAdmin) {
            
            const resultEnvio = await Envios.findById(idEnvio)

            //comparar codigo de verificacion

            const valoresInteres = CalculoIntereces(quantSend, verifyAdmin.userMaster[0].typeUser)
            const comision = valoresInteres.total
            const interesGlobals = valoresInteres.ig
            const iva = valoresInteres.iva
            const interesSocioE = Number(valoresInteres.isE)
            const interesSocioR = Number(valoresInteres.isR)
            const commisionMasQuanSend = Number(comision) + Number(quantSend)



            const comisionAnt = Number(resultEnvio.interesSocio) + Number(resultEnvio.iva) + Number(resultEnvio.interesGlobal)
            const anteriorQuanComi = comisionAnt + Number(resultEnvio.quantSend)
            const intGlAnt = comisionAnt - Number(resultEnvio.interesSocio) - Number(resultEnvio.iva)
            const intSocioAnt = Number(resultEnvio.interesSocio)
            const ivaAnt = Number(resultEnvio.iva)
            const quantSendAnt = Number(resultEnvio.quantSend)

            const cantidadAnteMasQundSoldMasComi = Number(resultEnvio.quantSend) + comisionAnt + Number(verifyAdmin.quantSolde)


            //console.log(valoresInteres, "ssssskkkkkkkfdddddddooooooooooooooooooopppppppppp")

            if (cantidadAnteMasQundSoldMasComi >= commisionMasQuanSend) {
                const verifyCSMaster = await RegisControlSist.findById(verifyAdmin.idCSMaster)

                if (verifyCSMaster !== null && verifyCSMaster.activeCount) {

                    if (resultEnvio !== null) {

                        //ACTUALIZAR CAJA MASTER

                        //caja master
                        const new_info = {
                            "quantSolde": Number(verifyAdmin.quantSolde) + anteriorQuanComi - commisionMasQuanSend,
                            "interesGlobal": Number(verifyAdmin.interesGlobal) + Number(interesGlobals) + Number(interesSocioR) - intGlAnt,
                            "interesSocio": Number(verifyAdmin.interesSocio) + Number(interesSocioE) - intSocioAnt,
                            "totalComisiones": Number(verifyAdmin.totalComisiones) + Number(comision) - comisionAnt,
                            "interesSocioE": Number(verifyAdmin.interesSocioE) + Number(interesSocioE) - intSocioAnt,
                            "iva": Number(verifyAdmin.iva) + Number(iva) - ivaAnt,
                            "quantSoldeEnviado": Number(verifyAdmin.quantSoldeEnviado) + Number(quantSend) - quantSendAnt,

                        }

                        const new_update = await RegisAdmin.findByIdAndUpdate(idAdmin, new_info)


                        //master
                        const new_info1 = {
                            "interesGlobal": Number(verifyCSMaster.interesGlobal) - intGlAnt + Number(interesGlobals) + Number(interesSocioR),
                            "interesSocio": Number(verifyCSMaster.interesSocio) - intSocioAnt + Number(interesSocioE),
                            "totalComisiones": Number(verifyCSMaster.totalComisiones) - comisionAnt + Number(comision),
                            "interesSocioE": Number(verifyCSMaster.interesSocioE) - intSocioAnt + Number(interesSocioE),
                            "iva": Number(verifyCSMaster.iva) - ivaAnt + Number(iva),
                            "quantSoldeEnviado": Number(verifyCSMaster.quantSoldeEnviado) - quantSendAnt + Number(quantSend),
                        }

                        const new_update1 = await RegisControlSist.findByIdAndUpdate(verifyAdmin.idCSMaster, new_info1)

                        //cajera de gnob
                        const new_info2 = {
                            "interesGlobal": Number(verifyCajera.interesGlobal) - intGlAnt + Number(interesGlobals) + Number(interesSocioR),
                            "iva": Number(verifyCajera.iva) - ivaAnt + Number(iva),
                        }
                        const new_update2 = await RegisControlSist.findByIdAndUpdate(verifyCajera._id, new_info2)





                        //ENVIAR MENSAGE A LOS NUMEROS DE TELEFONO DE LA TRANSFERENCIA
                        const cantidadEnviar = quantSend

                        if (phoneAnteriorR !== phoneRecep || phoneAnteriorS !== phoneSend) {
                            //ACTUALIZAMOS EL ENVIO
                            const new_infoE = {
                                "quantSend": quantSend,
                                "interesGlobal": Number(interesGlobals),
                                "interesSocio": Number(interesSocioE),
                                "comision": Number(comision),
                                "iva": Number(iva),
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





                            //ENVIAR CODIGO DE REFERENCIA AL NUMERO QUE A ECHO LA TRANSFERENCIA
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

                        } else {
                            //ACTUALIZAMOS EL ENVIO
                            const new_infoE = {
                                "quantSend": quantSend,
                                "interesGlobal": Number(interesGlobals),
                                "interesSocio": Number(interesSocioE),
                                "comision": Number(comision),
                                "iva": Number(iva),
                                "nameRecep": nameRecep,
                                "phoneRecep": phoneRecep,
                                "nameSend": nameSend,
                                "phoneSend": phoneSend,
                                "adressRecep": adressRecep,
                                "dipSend": dipSend,
                                "actualizadoPor": verifyAdmin.name
                            }

                            const new_updateE = await Envios.findByIdAndUpdate(idEnvio, new_infoE)
                        }


                        res.status(200).json({ "verificar": true, "mens": "Envio actualizado" })

                    } else {
                        res.status(200).json({ "verificar": false, "mens": "El envio no existe" })

                    }

                } else {
                    res.status(200).json({ "verificar": false, "mens": "Cuenta master bloqueado o o master no existe" })
                }
            } else {
                res.status(200).json({ verificar: false, mens: "Porfavor no cuenta de saldo suficiente para realizar esta operacion" })
            }



        } else {
            res.status(200).json({ verificar: false, mens: "No estas autorizado para esta tarrea" })
        }
    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema azzz" })
    }

*/
module.exports = ActualizarEnvio