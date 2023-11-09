const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")





/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */


const MovimientosMaster = require("../../modelos/moviemientosMaster")
const RegisControlSist = require("../../modelos/regisControlSist")
const RegisAdmin = require("../../modelos/regisAdmin")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */
const arrayMaster = ['Master_GNOB','Master_FINANCIADO','Master_PREFINANCIADO']
async function RecargarDeCajaAMaster(req, res) {

    const { userId, cantidad, idCaja } = req.body

    try {

        /************************************************************************** */
        //VERIFICAR SI EL NUMERO YA SE HA REGISTRADO ANTES
        /************************************************************** */
        const verifyMaster = await RegisControlSist.findById(userId).populate({ path: 'roles' })
        const verifyCaja = await RegisAdmin.findById(idCaja).populate({ path: 'roles' })


        if (verifyMaster !== null) {
            if (verifyMaster.acciones.includes('saldo_de_caja_a_master') && arrayMaster.includes(verifyMaster.roles[0].name)) {
                if (verifyCaja !== null) {

                    if (verifyCaja.quantSolde >= Number(cantidad)) {
                        //ACTUALIZAR LA LA CUENTA DE LA CAJA
                        const new_info1 = {
                            "quantSolde": Number(verifyCaja.quantSolde) - Number(cantidad),
                            "quantSoldeRepar": Number(verifyCaja.quantSoldeRepar) + Number(cantidad),
                        }
                        const new_update1 = await RegisAdmin.findByIdAndUpdate(verifyCaja._id, new_info1)

                        //ACTUALIZAR LA CUENTA DEL MASTER

                        const new_info = {
                            "lastSoldeNameUser": verifyMaster.nameConfSist,
                            "quantSolde": Number(verifyMaster.quantSolde) + Number(cantidad),
                            "quantSoldeRepar": Number(verifyMaster.quantSoldeRepar) - Number(cantidad),
                            "lastSoldeRecharge": Number(cantidad),
                            "lastSolde": Number(verifyMaster.quantSolde),
                            "tipoDeRecarga": "Recarga de caja master a master",
                        }

                        const new_update = await RegisControlSist.findByIdAndUpdate(verifyMaster._id, new_info)

                        //REGISTRAR LA RECARGA
                        const registData = new MovimientosMaster()
                        registData.nameCaja = verifyCaja.name
                        registData.idCaja = verifyCaja._id
                        registData.phoneCaja = verifyCaja.phone
                        registData.typeUser = verifyCaja.typeUser
                        registData.fechaA = new Date()
                        registData.tipoDeRecarga = 'caja_master_a_master'

                        registData.idMaster = verifyMaster._id
                        registData.active = true
                        registData.validar = true
                        registData.nameMaster = verifyMaster.name
                        registData.phoneMaster = verifyMaster.phone
                        registData.typeMaster = verifyMaster.roles[0].name
                        registData.quantSolde = Number(cantidad)
                        registData.quantSoldeCount = Number(verifyMaster.quantSolde)
                        registData.quantSoldeCaja = Number(verifyCaja.quantSolde)

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
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = RecargarDeCajaAMaster