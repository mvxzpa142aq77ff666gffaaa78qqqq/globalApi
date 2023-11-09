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

const Role = require("../../modelos/roles")


/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function RegistrarRoles(req, res) {
    const { role} = req.body
    console.log(req.body)

    const verifyIfAllOk = role
    const verify = await Role.findOne({name: role})


    try {

        if (verify === null) {
            if (verifyIfAllOk) {


                //const verifyCS = await RegisControlSist.findById(userId).populate({path:'roles'})
    
                if (/*verifyCS !== null*/true) {
    
                    if (/*verifyCS.acciones.includes('crear_admin')*/true) {
    
                        const registRole = new Role()
                                
                        /******************************** */
                        //registrar role
                        /********************************* */
        
                        registRole.name = role
                        registRole.nameAdminRegister = "pedro ndong" //verifyCS.name
                        registRole.phoneAdminRegister = "222058540"//verifyCS.phone
    
                        const addData = await registRole.save()
    
                        res.status(200).json({verificar:true, mens: "Role creado con exito", result: addData })
        
                    } else {
                        res.status(200).json({verificar:false,mens:"No estas autorizado para esta accion"})
                    }
                }else{
                    res.status(200).json({verificar:false,mens:"Tu cuenta no existe"})
                }
    
            } else {
                res.status(200).json({verificar:false,mens:"Asegurate de tener rellenado los campos obligatorios"})
            }
        } else {
            res.status(200).json({verificar:false,mens:"El role ya existe"}) 
        }


    } catch (error) {
        res.status(200).json({verificar:false,mens:"hay un problema"})
    }
}

module.exports = RegistrarRoles