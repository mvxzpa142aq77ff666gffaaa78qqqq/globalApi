const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")





/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */


const RecharSolde = require("../../modelos/recharSolde")
const RegisControlSist = require("../../modelos/regisControlSist")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function RecargarMaster(req, res) {

    const { userId, cantidad, idMaster } = req.body

    try {

        /************************************************************************** */
        //VERIFICAR SI EL NUMERO YA SE HA REGISTRADO ANTES
        /************************************************************** */
        const verifyCS = await RegisControlSist.findById(userId).populate({ path: 'roles' })
        const verifyBeneficiario = await RegisControlSist.findById(idMaster).populate({ path: 'roles' })
        const verifyCaja = await RegisControlSist.findOne({ typeUser: 'Cajero' }).populate({ path: 'roles' })


        if (verifyCS !== null) {
            if (verifyCS.acciones.includes('recargar_master') && (verifyCS.roles[0].name === 'super_admin' || verifyCS.roles[0].name === 'Gestor' || verifyCS.roles[0].name === 'Cajero' || verifyCS.roles[0].name === 'Atencion_al_cliente')) {
                if (verifyBeneficiario !== null) {

                    if (verifyCaja !== null) {
                        if (verifyCaja.quantSolde >= Number(cantidad)) {
                            //ACTUALIZAR LA CAJA DE LA EMPRESA
                            const new_info1 = {
                                "quantSolde": Number(verifyCaja.quantSolde) - Number(cantidad),
                                "quantSoldeRepar": Number(verifyCaja.quantSoldeRepar) + Number(cantidad),
                            }
                            const new_update1 = await RegisControlSist.findByIdAndUpdate(verifyCaja._id, new_info1)

                            //ACTUALIZAR LA CUENTA DEL MASTER
                            const new_info = {
                                "lastSoldeNameUser": verifyCS.nameConfSist,
                                "quantSolde": Number(verifyBeneficiario.quantSolde) + Number(cantidad),
                                "lastSoldeRecharge": Number(cantidad),
                                "lastSolde": Number(verifyBeneficiario.quantSolde),
                                "tipoDeRecarga": "Recarga direta",
                            }
                            const new_update = await RegisControlSist.findByIdAndUpdate(verifyBeneficiario._id, new_info)

                            //REGISTRAR LA RECARGA
                            const registData = new RecharSolde()
                            registData.nameAdmin = verifyBeneficiario.name
                            registData.idAdmin = verifyBeneficiario._id
                            registData.phoneAdmin = verifyBeneficiario.phone
                            registData.typeUser = verifyBeneficiario.roles[0].name
                            registData.fechaA = new Date()
                            registData.idRecargado = verifyBeneficiario._id
                            registData.idMaster = verifyBeneficiario._id

                            registData.tipoDeRecarga = 'caja_admin_master'

                            registData.idConfSist = verifyCS._id
                            registData.activeRecarga = true
                            registData.validarRecarga = true
                            registData.nameConfSist = verifyCS.name
                            registData.phoneConfSist = verifyCS.phone
                            registData.typeConfSist = verifyCS.roles[0].name
                            registData.quantSolde = Number(cantidad)
                            registData.quantSoldeCount = Number(verifyBeneficiario.quantSolde)

                            const addData = await registData.save()

                            console.log(addData)

                            res.status(200).json({ verificar: true, mens: "Tu cuenta acaba de ser recargada" })
                        } else {
                            res.status(200).json({ verificar: false, mens: "Saldo insuficiente" })
                        }
                    } else {
                        res.status(200).json({ verificar: false, mens: "No existe la cuenta de la caja general" })
                    }
                } else {
                    res.status(200).json({ verificar: false, mens: "No existe la cuenta que quieres recargar" })
                }
            } else {
                res.status(200).json({ verificar: false, mens: "No estas autorizado para esta accion" })
            }
        } else {
            res.status(200).json({ verificar: false, mens: "Recarga no validado" })

        }

    } catch (error) {
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = RecargarMaster