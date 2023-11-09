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
    const { role, id,porcentage,idSuper } = req.body
    console.log(req.body)

    const verifyIfAllOk = role

    const verify = await Role.findOne({ name: role })

    try {

        if (porcentage === '0'|| Number(porcentage)) {
            if (porcentage <=40) {
                if (verify !== null) {
                    if (verifyIfAllOk) {
        
                        const verifyCS = await RegisControlSist.findById(idSuper).populate({path:'roles'})
        
                        if (verifyCS !== null) {
        
                            if (verifyCS.roles[0].name === 'super_admin') {
        
                                const registRole = new Role()
        
                                /******************************** */
                                //ractualizar role
                                /********************************* */
        
                                const new_info = {
                                    "name": role,
                                    "porcentage":porcentage,
                                }
                                const new_update = await Role.findByIdAndUpdate(id, new_info)
        
                                res.status(200).json({ verificar: true, mens: "Role actualizado" })
        
                            } else {
                                res.status(200).json({ verificar: false, mens: "No estas autorizado para esta accion" })
                            }
                        } else {
                            res.status(200).json({ verificar: false, mens: "Tu cuenta no existe" })
                        }
        
                    } else {
                        res.status(200).json({ verificar: false, mens: "Asegurate de tener rellenado los campos obligatorios" })
                    }
                } else {
                    res.status(200).json({ verificar: false, mens: "Error de actualizacion" })
        
                }
            } else {
                res.status(200).json({ verificar: false, mens: "Reduce el porcentage" }) 
            }
        } else {
            if (verify === null) {
                if (verifyIfAllOk) {
    
                    const verifyCS = await RegisControlSist.findById(idSuper).populate({path:'roles'})
    
                    if (verifyCS !== null) {
    
                        if (verifyCS.roles[0].name === 'super_admin') {
    
                            const registRole = new Role()
    
                            /******************************** */
                            //ractualizar role
                            /********************************* */
    
                            const new_info = {
                                "name": role,
                            }
                            const new_update = await Role.findByIdAndUpdate(id, new_info)
    
                            res.status(200).json({ verificar: true, mens: "Role actualizado" })
    
                        } else {
                            res.status(200).json({ verificar: false, mens: "No estas autorizado para esta accion" })
                        }
                    } else {
                        res.status(200).json({ verificar: false, mens: "Tu cuenta no existe" })
                    }
    
                } else {
                    res.status(200).json({ verificar: false, mens: "Asegurate de tener rellenado los campos obligatorios" })
                }
            } else {
                res.status(200).json({ verificar: false, mens: "El role ya existe" })
    
            }
        }



    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = ActualizarRoles