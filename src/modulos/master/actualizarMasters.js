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

const Role = require("../../modelos/roles");
const RegisControlSist = require("../../modelos/regisControlSist")



/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */

/****************modulo para generar claves **************************/
const Claves = require("../generarClaves")
/***************************************************** */
const arrayMaster = ['Master_GNOB','Master_FINANCIADO','Master_PREFINANCIADO']

async function ActualizarRoles(req, res) {

    const datos = req.body
    console.log(datos)

    try {

        const verifyCS = await RegisControlSist.findById(datos.userId).populate({ path: 'roles' })
        const verifyMasters = await RegisControlSist.findById(datos.id).populate({ path: 'roles' })
        const foundRoles = await Role.findOne({ name: datos.typeUser })


        if (verifyCS !== null) {
            if (verifyMasters !== null) {
                const checkSuperAdmin = verifyCS.acciones.includes('editar_master') && verifyCS.roles[0].name === 'super_admin'
                const checkGestor = verifyCS.acciones.includes('editar_master') && verifyCS.roles[0].name === 'Gestor'
                const checkMaster = verifyCS.acciones.includes('editar_master') && arrayMaster.includes(verifyCS.roles[0].name)

                if (verifyCS.acciones.includes('editar_master')) {
                    if (foundRoles) {
                        const new_info = {
                            "roles": [foundRoles._id],
                        }
                        datos.roles = [foundRoles._id]

                    } else {

                    }
                    if (datos.username === datos.usernameAntiguo) {
                        if (datos.phone === datos.phoneAntiguo) {
                            /******************************** */
                            //ractualizar role
                            /********************************* */

                            const new_info = {
                                "acciones": datos.acciones,
                                "name": datos.name,
                                "typeUser": datos.typeUser,
                                "roles": datos.roles,
                                "adress1": datos.adress1,
                                "gettoFriend": datos.gettoFriend,
                                "nif": datos.nif,
                                "dip": datos.dip
                            }
                            const new_update = await RegisControlSist.findByIdAndUpdate(datos.id, new_info)

                            console.log(new_info)

                            res.status(200).json({ verificar: true, mens: "Master actualizado" })

                        } else {
                            const verify = await RegisControlSist.findOne({ phone: datos.phone })

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
                                    "typeUser": datos.typeUser,
                                    "phone": datos.phone,
                                    "roles": datos.roles,
                                    "passw": passwortEcryp1,
                                    "codigoEntrada": passwortEcryp2,
                                    "adress1": datos.adress1,
                                    "gettoFriend": datos.gettoFriend,
                                    "nif": datos.nif,
                                    "dip": datos.dip
                                }
                                const new_update = await RegisControlSist.findByIdAndUpdate(datos.id, new_info)

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
                                res.status(200).json({ verificar: true, mens: "Master actualizado" })
                            } else {
                                res.status(200).json({ verificar: false, mens: "El telefono ya existe" })

                            }

                        }
                    } else {
                        if (datos.phone === datos.phoneAntiguo) {
                            const verify = await RegisControlSist.findOne({ username: datos.username })

                            if (verify === null) {
                                /******************************** */
                                //ractualizacion con nombre de usuario diferente
                                /********************************* */

                                const new_info = {
                                    "acciones": datos.acciones,
                                    "name": datos.name,
                                    "typeUser": datos.typeUser,
                                    "username": datos.username,
                                    "roles": datos.roles,
                                    "adress1": datos.adress1,
                                    "gettoFriend": datos.gettoFriend,
                                    "nif": datos.nif,
                                    "dip": datos.dip
                                }
                                const new_update = await RegisControlSist.findByIdAndUpdate(datos.id, new_info)


                                res.status(200).json({ verificar: true, mens: "Master actualizado" })
                            } else {
                                res.status(200).json({ verificar: false, mens: "El nombre de usuario ya existe" })

                            }

                        } else {
                            const verify = await RegisControlSist.findOne({ $or: [{ username: datos.username }, { phone: datos.phone }] })

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
                                    "typeUser": datos.typeUser,
                                    "phone": datos.phone,
                                    "username": datos.username,
                                    "roles": datos.roles,
                                    "adress1": datos.adress1,
                                    "gettoFriend": datos.gettoFriend,
                                    "nif": datos.nif,
                                    "dip": datos.dip
                                }
                                const new_update = await RegisControlSist.findByIdAndUpdate(datos.id, new_info)

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
                                res.status(200).json({ verificar: true, mens: "Master actualizado" })

                            } else {

                                res.status(200).json({ verificar: false, mens: "El admin ya existe" })

                            }

                        }
                    }

                } else {
                    res.status(200).json({ verificar: false, mens: "No estas autorizado para esta accion" })
                }
            } else {
                res.status(200).json({ verificar: false, mens: "El master no existe" })

            }

        } else {
            res.status(200).json({ verificar: false, mens: "Tu cuenta no existe" })
        }

    } catch (error) {
        res.status(200).json({ verificar: false, mens: "hay un problema ss" })
    }
}

module.exports = ActualizarRoles