const bcrypt = require("bcrypt")


//Twilio credentials
const accountSid = process.env.TWILIO_SSID;
const authToken = process.env.AUTH_TOKEN;
//const client = require('twilio')(accountSid, authToken);
//crear el secret del token
const secretToken = process.env.SECRET_TOKEN

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */

const RegisAdmin = require("../../modelos/regisAdmin")
const RegisControlSist = require("../../modelos/regisControlSist")
const Role = require("../../modelos/roles")



/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */

/****************modulo para generar claves **************************/
const Claves = require("../generarClaves")
/***************************************************** */
const arrayMaster = ['Master_GNOB','Master_FINANCIADO','Master_PREFINANCIADO']

async function ActualizarCajas(req, res) {
    const datos = req.body
    console.log(datos)

    try {

        const verifyCS = await RegisControlSist.findById(datos.userId).populate({ path: 'roles' })
        const verifyCaja = await RegisAdmin.findById(datos.id).populate({ path: 'userMaster' })
        const foundRoles = await Role.findOne({ name: datos.typeUser })


        if (verifyCS !== null) {

            const checkMaster = verifyCS.acciones.includes('editar_caja_master') //&& arrayMaster.includes(verifyCS.roles[0].name)
            //const checkSuper = ['super_admin'].includes(verifyCS.roles[0].name)

            if (checkMaster) {

                if (verifyCaja !== null) {
                    if (datos.username === datos.usernameAntiguo) {
                        if (datos.phone === datos.phoneAntiguo) {
                            /******************************** */
                            //ractualizar role
                            /********************************* */

                            const new_info = {
                                "acciones": datos.acciones,
                                "name": datos.name,
                                "adress1": datos.adress1,
                                "gettoFriend": datos.gettoFriend,
                                "dip": datos.dip

                            }
                            const new_update = await RegisAdmin.findByIdAndUpdate(datos.id, new_info)

                            console.log(new_info)

                            res.status(200).json({ verificar: true, mens: "Caja actualizada simple" })

                        } else {
                            const verify = await RegisAdmin.findOne({ phone: datos.phone })

                            if (verify === null) {
                                /******************************** */
                                //actualizacion con numero de telefono difente
                                /********************************* */

                                /*********************************************************** */
                                //GENERAR LA CONTRASENA Y LA LLAVE SECRETA DEL SOCIO
                                /*********************************************************** */
                                var passw = Claves();
                                var codigoEntrada = Claves();

                                console.log(passw, codigoEntrada, 'nuevo pasword')

                                /************************* */
                                //encriptando la contraseña
                                /****************************************** */
                                const passwortEcryp1 = bcrypt.hashSync(passw, bcrypt.genSaltSync(10))
                                const passwortEcryp2 = bcrypt.hashSync(codigoEntrada, bcrypt.genSaltSync(10))



                                const new_info = {
                                    "acciones": datos.acciones,
                                    "name": datos.name,
                                    "phone": datos.phone,
                                    "passw": passwortEcryp1,
                                    "codigoEntrada": passwortEcryp2,
                                    "adress1": datos.adress1,
                                    "gettoFriend": datos.gettoFriend,
                                    "dip": datos.dip
                                }

                                const new_update = await RegisAdmin.findByIdAndUpdate(datos.id, new_info)

                                /******************************************************************* */
                                //ENVIAR AL SOCIO SUS CREDENCIALES DESPUES DE CREACION DE CUENTA
                                /******************************************************************* */
                                /*
                                                client.messages
                                                    .create({
                                                        messagingServiceSid: process.env.MESSAGE_ID,
                                                        from: "GNOB",
                                                        to: `+240${datos.phone}`,
                                                        body: `GNOB le notifica que acaba de convertirse en miembro de la administracion de Global Money Transfer su contraseña es ${passw} . Gracias por confiar en Global Money Transfer`,
                                                    })
                                                    .then(message => console.log(message.sid))
                                                    .done();
                                */
                                /****************************************************** */
                                res.status(200).json({ verificar: true, mens: "Caja actualizada phone" })
                            } else {
                                res.status(200).json({ verificar: false, mens: "El telefono ya existe" })

                            }

                        }
                    } else {
                        if (datos.phone === datos.phoneAntiguo) {
                            const verify = await RegisAdmin.findOne({ username: datos.username })

                            if (verify === null) {
                                /******************************** */
                                //ractualizacion con nombre de usuario diferente
                                /********************************* */

                                const new_info = {
                                    "acciones": datos.acciones,
                                    "name": datos.name,
                                    "username": datos.username,
                                    "adress1": datos.adress1,
                                    "gettoFriend": datos.gettoFriend,
                                    "dip": datos.dip
                                }
                                const new_update = await RegisAdmin.findByIdAndUpdate(datos.id, new_info)


                                res.status(200).json({ verificar: true, mens: "Caja actualizada" })
                            } else {
                                res.status(200).json({ verificar: false, mens: "El nombre de usuario ya existe" })

                            }

                        } else {
                            const verify = await RegisAdmin.findOne({ $or: [{ username: datos.username }, { phone: datos.phone }] })

                            if (verify === null) {

                                /*********************************************************** */
                                //GENERAR LA CONTRASENA Y LA LLAVE SECRETA DEL SOCIO
                                /*********************************************************** */
                                var passw = Claves();
                                var codigoEntrada = Claves();

                                console.log(passw, codigoEntrada, 'nuevo pasword')

                                /************************* */
                                //encriptando la contraseña
                                /****************************************** */
                                const passwortEcryp1 = bcrypt.hashSync(passw, bcrypt.genSaltSync(10))
                                const passwortEcryp2 = bcrypt.hashSync(codigoEntrada, bcrypt.genSaltSync(10))

                                /******************************** */
                                //actualizacion con numero de telefono y nombre de usuario diferente
                                /********************************* */

                                const new_info = {
                                    "acciones": datos.acciones,
                                    "name": datos.name,
                                    "phone": datos.phone,
                                    "username": datos.username,
                                    "adress1": datos.adress1,
                                    "gettoFriend": datos.gettoFriend,
                                    "dip": datos.dip
                                }
                                const new_update = await RegisAdmin.findByIdAndUpdate(datos.id, new_info)

                                /******************************************************************* */
                                //ENVIAR AL SOCIO SUS CREDENCIALES DESPUES DE CREACION DE CUENTA
                                /******************************************************************* */
                                /*
                                                client.messages
                                                    .create({
                                                        messagingServiceSid: process.env.MESSAGE_ID,
                                                        from: "GNOB",
                                                        to: `+240${datos.phone}`,
                                                        body: `GNOB le notifica que acaba de convertirse en miembro de la administracion de Global Money Transfer su contraseña es ${passw} . Gracias por confiar en Global Money Transfer`,
                                                    })
                                                    .then(message => console.log(message.sid))
                                                    .done();
                                */
                                /****************************************************** */
                                res.status(200).json({ verificar: true, mens: "Caja actualizada pphone" })

                            } else {

                                res.status(200).json({ verificar: false, mens: "La caja ya existe" })

                            }

                        }
                    }
                } else {

                    res.status(200).json({ verificar: false, mens: "La caja no existe" })

                }


            } else {
                res.status(200).json({ verificar: false, mens: "No estas autorizado para esta accion" })
            }
        } else {
            res.status(200).json({ verificar: false, mens: "Tu cuenta no existe" })
        }

    } catch (error) {
        res.status(200).json({ verificar: false, mens: "hay un problema ss" })
    }
}

module.exports = ActualizarCajas