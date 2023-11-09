const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")





/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */


const RecharSolde = require("../../modelos/recharSolde")
const RegisControlSist = require("../../modelos/regisControlSist")
const RegisAdmin = require("../../modelos/regisAdmin")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */

const arrayMaster = ['Master_GNOB','Master_FINANCIADO','Master_PREFINANCIADO']


async function RecargarCajaMaster(req, res) {

    const { userId, cantidad, idCaja } = req.body

    try {

        /************************************************************************** */
        //VERIFICAR SI EL NUMERO YA SE HA REGISTRADO ANTES
        /************************************************************** */
        const verifyMaster = await RegisControlSist.findById(userId).populate({ path: 'roles' })
        const verifyBeneficiario = await RegisAdmin.findById(idCaja)
        console.log(verifyBeneficiario)


        if (verifyMaster !== null) {
            if (verifyMaster.acciones.includes('recargar_caja_master') && arrayMaster.includes(verifyMaster.roles[0].name)) {
                if (verifyBeneficiario !== null) {

                    if (verifyMaster.quantSolde >= Number(cantidad)) {
                        //ACTUALIZAR LA LA CUENTA DEL MASTER
                        const new_info1 = {
                            "quantSolde": Number(verifyMaster.quantSolde) - Number(cantidad),
                            "quantSoldeRepar": Number(verifyMaster.quantSoldeRepar)?Number(verifyMaster.quantSoldeRepar) + Number(cantidad):Number(cantidad),
                        }
                        const new_update1 = await RegisControlSist.findByIdAndUpdate(verifyMaster._id, new_info1)

                        //ACTUALIZAR LA CUENTA DE LA CAJA

                        const new_info = {
                            "lastSoldeNameUser": verifyMaster.nameConfSist,
                            "quantSolde": Number(verifyBeneficiario.quantSolde) + Number(cantidad),
                            "lastSoldeRecharge": Number(cantidad),
                            "lastSolde": Number(verifyBeneficiario.quantSolde),
                            "tipoDeRecarga": "Recarga direta",
                        }

                        const new_update = await RegisAdmin.findByIdAndUpdate(verifyBeneficiario._id, new_info)

                        //REGISTRAR LA RECARGA
                        const registData = new RecharSolde()
                        registData.nameAdmin = verifyBeneficiario.name
                        registData.idAdmin = verifyBeneficiario._id
                        registData.phoneAdmin = verifyBeneficiario.phone
                        registData.typeUser = verifyMaster.roles[0].name
                        registData.fechaA = new Date()
                        registData.idRecargado = verifyBeneficiario._id
                        registData.idCajaMaster = verifyBeneficiario._id
                        registData.tipoDeRecarga = 'master_a_caja_master'

                        registData.idConfSist = verifyMaster._id
                        registData.idMaster = verifyMaster._id
                        registData.activeRecarga = true
                        registData.validarRecarga = true
                        registData.nameConfSist = verifyMaster.name
                        registData.phoneConfSist = verifyMaster.phone
                        registData.typeConfSist = verifyMaster.roles[0].name
                        registData.quantSolde = Number(cantidad)
                        registData.quantSoldeCount = Number(verifyBeneficiario.quantSolde)

                        const addData = await registData.save()

                        console.log(addData)

                        res.status(200).json({ verificar: true, mens: "La cuenta acaba de ser recargada" })
                    } else {
                        res.status(200).json({ verificar: false, mens: "Saldo insuficiente" })
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
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema dd" })
    }
}

module.exports = RecargarCajaMaster