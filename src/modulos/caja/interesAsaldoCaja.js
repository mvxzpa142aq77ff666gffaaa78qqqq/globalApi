const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")





/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */


const InteresASaldo = require("../../modelos/interesASaldo")
const RegisControlSist = require("../../modelos/regisControlSist")
const RegisAdmin = require("../../modelos/regisAdmin")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */
const arrayMaster = ['Master_GNOB','Master_FINANCIADO','Master_PREFINANCIADO']

async function ConifirmRecargasSocio(req, res) {

    const { userId, cantidad, idMaster } = req.body

    try {

        /************************************************************************** */
        //VERIFICAR SI EL NUMERO YA SE HA REGISTRADO ANTES
        /************************************************************** */
        //const verifyCS = await RegisControlSist.findById(userId).populate({ path: 'roles' })
        const verifyCaja = await RegisAdmin.findById(userId).populate({ path: "userMaster" })

        if (verifyCaja !== null) {
            if (arrayMaster.includes(verifyCaja.userMaster[0].typeUser)/* && verifyMaster.acciones.includes('interes_a_saldo_caja')*/) {
                const verifyMaster = await RegisControlSist.findById(verifyCaja.userMaster[0]._id)
                if (verifyMaster !== null) {
                    const accioness = verifyMaster.acciones.includes('interes_a_saldo_master')
                    if (accioness) {
                        if (Number(verifyCaja.interesSocio) >= Number(cantidad)) {
                            //ACTUALIZAR LA CAJA MASTER
                            const new_info = {
                                "interesSocio": Number(verifyCaja.interesSocio) - Number(cantidad),
                                //"quantSolde": Number(verifyCaja.quantSolde) + Number(cantidad),
                                "lastSoldeNameUser": verifyCaja.name,
                                "lastSoldeRecharge": Number(cantidad),
                                "lastSolde": Number(verifyCaja.quantSolde),
                                "tipoDeRecarga": "Interes a saldo",
                            }
                            const new_update = await RegisAdmin.findByIdAndUpdate(verifyCaja._id, new_info)
    
                            const new_info2 = {
                                "quantSolde": Number(verifyMaster.quantSolde) + Number(cantidad),
                            }
                            const new_update2 = await RegisControlSist.findByIdAndUpdate(verifyMaster._id, new_info2)
        
                            //REGISTRAR 
                            const registData = new InteresASaldo()
                            registData.nameAdmin = verifyCaja.name
                            registData.idAdmin = verifyCaja._id
                            registData.idInteresSaldo = verifyCaja._id
                            registData.phoneAdmin = verifyCaja.phone
                            registData.typeUser = verifyCaja.userMaster[0].typeUser
                            registData.fechaA = new Date()
        
                            registData.idConfSist = verifyMaster._id
                            registData.activar = true
                            registData.validar = true
                            registData.nameConfSist = verifyMaster.name
                            registData.phoneConfSist = verifyMaster.phone
                            registData.typeConfSist = verifyCaja.userMaster[0].typeUser
                            registData.cantidad = Number(cantidad)
                            registData.cantidadSaldo = Number(verifyMaster.quantSolde)
                            registData.idMaster = verifyMaster._id
        
                            const addData = await registData.save()
        
                            console.log(addData)
        
                            res.status(200).json({ verificar: true, mens: "Tu cuenta acaba de ser recargada" })
                        } else {
                            res.status(200).json({ verificar: false, mens: "Redusca el monto" })
                        }
                    } else {
                        res.status(200).json({ verificar: false, mens: "No tienes estos permisos" })

                    }

                } else {
                    res.status(200).json({ verificar: false, mens: "No encontramos tu master" })
                }

            } else {
                res.status(200).json({ verificar: false, mens: "No estas autorizado para esta accion" })
            }
        } else {
            res.status(200).json({ verificar: false, mens: "Recarga no validada" })

        }

    } catch (error) {
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = ConifirmRecargasSocio