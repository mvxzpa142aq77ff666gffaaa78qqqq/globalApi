const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")





/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */


const Recompensar = require("../../modelos/modelPay")
const RegisControlSist = require("../../modelos/regisControlSist")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function RecompensasCajaAdmin(req, res) {

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
                    if (Number(verifyCaja.quantSolde) >= Number(cantidad)) {
                        //ACTUALIZAR LA CAJA ADMIN
                        const new_info = {
                            "quantSolde": Number(verifyCaja.quantSolde) - Number(cantidad),
                            "lastSoldeNameUser": verifyCS.nameConfSist,
                            "lastSoldeRecharge": - Number(cantidad),
                            "lastSolde": Number(verifyCaja.quantSolde),
                            "tipoDeRecarga": "Recompensa",
                        }
                        const new_update = await RegisControlSist.findByIdAndUpdate(verifyCaja._id, new_info)

                        //REGISTRAR LA RECARGA
                        const registData = new Recompensar()
                        registData.nameAdmin = verifyCaja.name
                        registData.idAdmin = verifyCaja._id
                        registData.phoneAdmin = verifyCaja.phone
                        registData.typeUser = verifyCaja.roles[0].name
                        registData.fechaA = new Date()
                        registData.tipoDeRecompensa = 'caja_admin'



                        registData.idConfSist = verifyCS._id
                        registData.activar = true
                        registData.validar = true
                        registData.nameConfSist = verifyCS.name
                        registData.phoneConfSist = verifyCS.phone
                        registData.typeConfSist = verifyCS.roles[0].name
                        registData.cantidadSaldo = Number(verifyCaja.quantSolde)
                        registData.quantSolde = Number(cantidad)
                        registData.quantSoldeCount = Number(verifyCaja.quantSolde)



                        const addData = await registData.save()

                        console.log(addData)

                        res.status(200).json({ verificar: true, mens: "Recompensa efectuado" })
                    } else {
                        res.status(200).json({ verificar: false, mens: "Redusca el monto" })
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
        console.log(first)
        res.status(200).json({ verificar: false, mens: "hay un problema w" })
    }
}

module.exports = RecompensasCajaAdmin