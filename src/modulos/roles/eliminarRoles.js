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


/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function BorrarRoles(req, res) {
    const {id} = req.body

    const verifyIfAllOk = id

    try {

        if (verifyIfAllOk) {


            //const verifyCS = await RegisControlSist.findById(userId).populate({path:'roles'})

            if (/*verifyCS !== null*/true) {

                if (/*verifyCS.acciones.includes('crear_admin')*/true) {

                    const registRole = new Role()
                            
                    /******************************** */
                    //borrar role
                    /********************************* */
    
                    const new_update = await Role.findByIdAndDelete(id)

                    res.status(200).json({verificar:true, mens: "Role borrado"})
    
                } else {
                    res.status(200).json({verificar:false,mens:"No estas autorizado para esta accion"})
                }
            }else{
                res.status(200).json({verificar:false,mens:"Tu cuenta no existe"})
            }

        } else {
            res.status(200).json({verificar:false,mens:"Asegurate de tener rellenado los campos obligatorios"})
        }

    } catch (error) {
        res.status(200).json({verificar:false,mens:"hay un problema"})
    }
}

module.exports = BorrarRoles