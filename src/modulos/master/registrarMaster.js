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
const Role = require("../../modelos/roles")


/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */


/****************modulo para generar claves **************************/
const Claves = require("../generarClaves")
/***************************************************** */


async function RegistrarAdmin(req, res) {
    const { name, phone, username, typeUser,
        userId, acciones, email, dip, adress1, adress2,
        genero, nameBussnes, gettoFriend, nif, cashQuand
    } = req.body
    console.log(req.body)

    const verifyIfAllOk = name && phone && username && typeUser && userId && acciones
    const foundRoles = await Role.findOne({ name: typeUser })


    try {

        if (verifyIfAllOk) {

            /************************************************************************** */
            //VERIFICAR SI EL NUMERO YA SE HA REGISTRADO ANTES
            /************************************************************** */
            const verify = await RegisControlSist.findOne({ $or: [{ phone: phone }, { username: username }] })
            const verifyCS = await RegisControlSist.findById(userId).populate({ path: 'roles' })

            if (verifyCS !== null) {

                const checkMaster = verifyCS.acciones.includes('crear_master') && verifyCS.roles[0].name === 'super_admin'
                const checkGestor = verifyCS.acciones.includes('crear_master') && verifyCS.roles[0].name === 'Gestor'
                const checkAtencion = verifyCS.acciones.includes('crear_master') && verifyCS.roles[0].name === 'Atencion_al_cliente'

                if (checkMaster || checkGestor || checkAtencion) {

                    //const comparePass = bcrypt.compareSync(secretKey, verifyCS.codigoEntrada)

                    if (true) {
                        if (verify === null) {
                            const registData = new RegisControlSist()
                            /*********************************************************** */
                            //GENERAR LA CONTRASENA Y LA LLAVE SECRETA DEL SOCIO
                            /*********************************************************** */
                            var passw = Claves();
                            var codigoEntrada = Claves();

                            console.log(passw, codigoEntrada, 'codigos master')

                            /************************* */
                            //encriptando la contraseña
                            /****************************************** */
                            const passwortEcryp1 = bcrypt.hashSync(passw, bcrypt.genSaltSync(10))
                            const passwortEcryp2 = bcrypt.hashSync(codigoEntrada, bcrypt.genSaltSync(10))

                            /******************************** */
                            //registrar
                            /********************************* */



                            if (foundRoles) {
                                const new_info = {
                                    "roles": [foundRoles._id],
                                }
                                registData.roles = [foundRoles._id]

                            } else {

                            }

                            registData.name = name
                            registData.username = username
                            registData.phone = phone
                            registData.passw = passwortEcryp1
                            registData.activeCount = false
                            registData.codigoEntrada = passwortEcryp2
                            registData.typeUser = typeUser
                            registData.email = email
                            registData.nameBussnes = nameBussnes
                            registData.gettoFriend = gettoFriend
                            registData.dip = dip
                            registData.nif = nif
                            registData.adress1 = adress1
                            registData.adress2 = adress2
                            registData.cashQuand = cashQuand
                            registData.acciones = acciones
                            registData.fechaA = new Date()
                            registData.idContSist = verifyCS._id
                            registData.lastSoldeNameUser = verifyCS.name
                            registData.nameContSist = verifyCS.name

                            registData.quantSolde = 0
                            registData.quantSoldeEfec = 0
                            registData.quantSoldeRest = 0
                            registData.quantSoldeRepar = 0
                            registData.quantSoldeRetirado = 0
                            registData.quantSoldeEnviado = 0
                            registData.lastSolde = 0
                            registData.lastSoldeRecharge = 0
                            registData.interesGlobal = 0
                            registData.interesSocio = 0
                            registData.interesSocioE = 0
                            registData.interesSocioR = 0
                            registData.cashQuandActive = 0
                            registData.totalComisiones = 0
                            registData.iva = 0
                            registData.quantSoldeRepar = 0


                            const addData = await registData.save()

                            console.log(addData, 'master')

                            /******************************************************************* */
                            //ENVIAR AL SOCIO SUS CREDENCIALES DESPUES DE CREACION DE CUENTA
                            /******************************************************************* */

                            try {
                                client.messages
                                    .create({
                                        messagingServiceSid: process.env.MESSAGE_ID_GNOP,
                                        from: "GNOB",
                                        to: `+240${phone}`,
                                        body: `GNOB le notifica que acaba de convertirse en uno de sus master. Su contraseña es ${passw} . `,// y su llave secreta es ${codigoEntrada}.
                                    })
                                    .then(message => console.log(message.sid))
                                    .done();
                            } catch (error) {

                            }



                            /****************************************************** */

                            res.status(200).json({ verificar: true, mens: "El master se ha sido registrado con exito", data: addData })

                        } else {
                            res.status(200).json({ verificar: false, mens: "Ya te has registrado antes" })
                        }
                    } else {
                        res.status(200).json({ verificar: false, mens: "Verifica la llave secreta" })
                    }
                } else {
                    res.status(200).json({ verificar: false, mens: "No estas autorizado para esta accion" })
                }
            } else {
                res.status(200).json({ verificar: false, mens: "Tu cuenta no existe" })
            }

        } else {
            res.status(200).json({ verificar: false, mens: "Asegurate de tener rellenado los campos obligatorios" })
        }

    } catch (error) {
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = RegistrarAdmin