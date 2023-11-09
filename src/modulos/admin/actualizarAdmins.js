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



async function ActualizarRoles(req, res) {
    const datos = req.body
    console.log(datos)

    try {

        //verificar si existe el usuario que realiza la operacio
        const verifyCS = await RegisControlSist.findById(datos.userId).populate({ path: 'roles' })
        //obtener roles
        const foundRoles = await Role.findOne({ name: datos.typeUser })


        if (verifyCS !== null) {

            if (verifyCS.acciones.includes('editar_admin')) {
                //actualizar role de forma automatica
                if (foundRoles) {
                    const new_info = {
                        "roles": [foundRoles._id],
                    }
                    datos.roles = [foundRoles._id]

                } else {

                }
                if (datos.username === datos.usernameAntiguo) {//probar si se ha modificado el nombre de usuario
                    if (datos.phone === datos.phoneAntiguo) {//probar si se ha modificado el telefono
                        /******************************** */
                        //ractualizar role
                        /********************************* */

                        const new_info = {
                            "acciones": datos.acciones,
                            "name": datos.name,
                            "typeUser": datos.typeUser,
                            "roles":datos.roles
                        }
                        const new_update = await RegisControlSist.findByIdAndUpdate(datos.id, new_info)

                        console.log(new_info)

                        res.status(200).json({ verificar: true, mens: "Admin actualizado" })

                    } else {
                        const verify = await RegisControlSist.findOne({ phone: datos.phone })

                        if (verify === null) {
                            /******************************** */
                            //ractualizar role
                            /********************************* */

                            const new_info = {
                                "acciones": datos.acciones,
                                "name": datos.name,
                                "typeUser": datos.typeUser,
                                "phone": datos.phone,
                                "roles":datos.roles
                            }
                            const new_update = await RegisControlSist.findByIdAndUpdate(datos.id, new_info)
                            res.status(200).json({ verificar: true, mens: "Admin actualizado" })
                        } else {
                            res.status(200).json({ verificar: false, mens: "El telefono ya existe" })

                        }

                    }
                } else {
                    if (datos.phone === datos.phoneAntiguo) {
                        const verify = await RegisControlSist.findOne({ username: datos.username })

                        if (verify === null) {
                            /******************************** */
                            //ractualizar role
                            /********************************* */

                            const new_info = {
                                "acciones": datos.acciones,
                                "name": datos.name,
                                "typeUser": datos.typeUser,
                                "username": datos.username,
                                "roles":datos.roles
                            }
                            const new_update = await RegisControlSist.findByIdAndUpdate(datos.id, new_info)


                            res.status(200).json({ verificar: true, mens: "Admin actualizado" })
                        } else {
                            res.status(200).json({ verificar: false, mens: "El nombre de usuario ya existe" })

                        }

                    } else {
                        const verify = await RegisControlSist.findOne({ $or: [{ username: datos.username }, { phone: datos.phone }] })

                        if (verify === null) {

                            /******************************** */
                            //ractualizar role
                            /********************************* */

                            const new_info = {
                                "acciones": datos.acciones,
                                "name": datos.name,
                                "typeUser": datos.typeUser,
                                "phone": datos.phone,
                                "username": datos.username,
                                "roles":datos.roles
                            }
                            const new_update = await RegisControlSist.findByIdAndUpdate(datos.id, new_info)


                            res.status(200).json({ verificar: true, mens: "Admin actualizado" })

                        } else {

                            res.status(200).json({ verificar: false, mens: "El admin ya existe" })

                        }

                    }
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

module.exports = ActualizarRoles