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



async function ConifirmRecargasSocio(req, res) {

    const { userId, cantidad } = req.body

    try {

        /************************************************************************** */
        //VERIFICAR SI EL NUMERO YA SE HA REGISTRADO ANTES
        /************************************************************** */
        const verifyCS = await RegisControlSist.findById(userId).populate({ path: 'roles' })
        const verifyCaja = await RegisControlSist.findOne({ typeUser: 'Cajero' }).populate({ path: 'roles' })

        if (verifyCS !== null) {
            if (verifyCS.acciones.includes('recargar_caja_admin')) {
                if (verifyCaja !== null) {

                    //ACTUALIZAR LA CAJA ADMIN
                    const new_info = {
                        "lastSoldeNameUser": verifyCS.nameConfSist,
                        "quantSolde": Number(verifyCaja.quantSolde) + Number(cantidad),
                        "lastSoldeRecharge": Number(cantidad),
                        "lastSolde": Number(verifyCaja.quantSolde),
                        "tipoDeRecarga":"Recarga direta",
                    }
                    const new_update = await RegisControlSist.findByIdAndUpdate(verifyCaja._id, new_info)

                    //REGISTRAR LA RECARGA
                    const registData = new RecharSolde()
                    registData.nameAdmin = verifyCaja.name
                    registData.idAdmin = verifyCaja._id
                    registData.phoneAdmin = verifyCaja.phone
                    registData.typeUser = verifyCaja.roles[0].name
                    registData.fechaA = new Date()
                    registData.tipoDeRecarga = 'super_admin_caja_admin'



                    registData.idConfSist = verifyCS._id
                    registData.activeRecarga = true
                    registData.validarRecarga = true
                    registData.nameConfSist = verifyCS.name
                    registData.phoneConfSist = verifyCS.phone
                    registData.typeConfSist = verifyCS.roles[0].name
                    registData.quantSolde = Number(cantidad)
                    registData.idCajaAdmin = verifyCaja._id
                    registData.quantSoldeCount = Number(verifyCaja.quantSolde)

                    const addData = await registData.save()

                    console.log(addData)

                    res.status(200).json({ verificar: true, mens: "Tu cuenta acaba de ser recargada" })
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

module.exports = ConifirmRecargasSocio