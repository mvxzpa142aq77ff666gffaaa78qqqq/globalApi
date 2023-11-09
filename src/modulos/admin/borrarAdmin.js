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



async function BorrarUser(req, res) {
    const { id ,userId} = req.body

    const verifyIfAllOk = id

    try {

        if (verifyIfAllOk) {


            const verifyCS = await RegisControlSist.findById(userId).populate({path:'roles'})

            if (verifyCS !== null) {

                if (verifyCS.acciones.includes('eliminar_admin')) {

                    const registRole = new Role()

                    /******************************** */
                    //borrar role
                    /********************************* */

                    const new_update = await RegisControlSist.findByIdAndDelete(id)

                    res.status(200).json({ verificar: true, mens: "Admin borrado" })

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

module.exports = BorrarUser