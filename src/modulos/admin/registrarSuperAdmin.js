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


async function RegistrarSuperAdmin(req, res) {
    const { name, phone, username } = req.body
    console.log(req.body)

    const verifyIfAllOk = name && phone && username

    try {

        if (verifyIfAllOk) {

            /************************************************************************** */
            //VERIFICAR SI EL NUMERO YA SE HA REGISTRADO ANTES
            /************************************************************** */
            const verify = await RegisControlSist.findOne({ $or: [{ phone: phone }, { username: username }] })

            if (verify === null) {
                const registData = new RegisControlSist()
                /*********************************************************** */
                //GENERAR LA CONTRASENA Y LA LLAVE SECRETA DEL SOCIO
                /*********************************************************** */
                var passw = Claves();
                var codigoEntrada = Claves();

                console.log(passw, codigoEntrada, 'clavez')

                //console.log(passw , codigoEntrada ,'codigos caja')

                /************************* */
                //encriptando la contraseña
                /****************************************** */
                const passwortEcryp1 = bcrypt.hashSync(passw, bcrypt.genSaltSync(10))
                const passwortEcryp2 = bcrypt.hashSync(codigoEntrada, bcrypt.genSaltSync(10))

                /******************************** */
                //registrar
                /********************************* */

                //array de acciones que puede hacer un super admin
                const acciones = [
                    'ver_info',
                    'crear_admin',
                    'crear_master',
                    'recargar_master',
                    'recompensar_master',
                    'activar_desactivar_master',
                    'activar_desactivar_admin',
                    'activar_desactivar_caja_master',
                    'recargar_caja_admin',
                    'recompensar_caja_admin',
                    'interes_a_saldo_caja_admin',
                    'iva_a_saldo_caja_admin',
                    'editar_admin',
                    'eliminar_admin',
                    'editar_master',
                    'editar_caja_master',
                    'editar_factura',
                    'ver_factura',
                    'anular_envios',
                    'ver_flujo_de_dinero',
                    'ver_transacciones',
                    'ver_codigo_recepcion',
                    'ver_info_caja_master',
                    'ver_info_master',
                    'ver_info_admin',
                    'ver_info_caja_admin',
                    'interes_a_saldo_admin',
                    'ver_info_home',
                    'ver_facturas',
                    'cambiar_password',
                    'ver_iva',
                    'ver_saldo_rest',
                    'ver_saldo_repart',
                    'ver_interes',
                    'ver_cant_master',
                    'ver_cant_cajas',
                    'ver_saldo_total_cajas',
                    'ver_saldo_total_master',
                    'ver_saldo_op_pending',
                    'ver_envios_pending',
                ];
                
                //relacionar el usuario con id de su rol el role del usuario
                registData.typeUser = 'super_admin'

                const foundRoles = await Role.findOne({ name: 'super_admin' })

                if (foundRoles) {
                    const new_info = {
                        "roles": [foundRoles._id],
                    }
                    registData.roles = [foundRoles._id]

                } else {

                }



                registData.name = name
                registData.username = username
                registData.codigoEntrada = passwortEcryp2
                registData.phone = phone
                registData.nameAdminRegister = name
                registData.phoneAdminRegister = phone
                registData.activeCount = true
                registData.passw = passwortEcryp1
                registData.acciones = acciones
                registData.email = "gnob@gnob.com"

                const addData = await registData.save()

                console.log(addData)

                /******************************************************************* */
                //ENVIAR AL SOCIO SUS CREDENCIALES DESPUES DE CREACION DE CUENTA
                /******************************************************************* */

                try {
                    client.messages
                        .create({
                            messagingServiceSid: process.env.MESSAGE_ID_GNOP,
                            from: "GNOB",
                            to: `+240${phone}`,
                            body: `GNOB le notifica que acaba de convertirse en miembro de su administracion. Su contraseña es ${passw}  .`,//y su llave secreta es ${codigoEntrada}
                        })
                        .then(message => { })
                        .done();
                } catch (error) {

                }



                /****************************************************** */

                res.status(200).json({ verificar: true, mens: "Te has verificado con exito", result: addData })

            } else {
                res.status(200).json({ verificar: false, mens: "Ya te has registrado antes" })
            }

        } else {
            res.status(200).json({ verificar: false, mens: "Asegurate de tener rellenado los campos obligatorios" })
        }

    } catch (error) {
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = RegistrarSuperAdmin