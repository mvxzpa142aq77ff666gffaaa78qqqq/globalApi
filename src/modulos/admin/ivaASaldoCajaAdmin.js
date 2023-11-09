const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")





/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */


const IvaASaldo = require("../../modelos/ivaAsaldo")
const RegisControlSist = require("../../modelos/regisControlSist")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function IvaASaldoCajaAdmin(req, res) {

    const { userId, cantidad } = req.body

    try {

        /************************************************************************** */
        //VERIFICAR SI EL NUMERO YA SE HA REGISTRADO ANTES
        /************************************************************** */
        const verifyCS = await RegisControlSist.findById(userId).populate({ path: 'roles' })
        const verifyCaja = await RegisControlSist.findOne({ typeUser: 'Cajero' }).populate({ path: 'roles' })

        if (verifyCS !== null) {
            if (verifyCS.acciones.includes(  'iva_a_saldo_caja_admin')) {
                if (verifyCaja !== null) {
                    if (Number(verifyCaja.iva) >= Number(cantidad)) {
                        //ACTUALIZAR LA CAJA ADMIN
                        const new_info = {
                            "iva": Number(verifyCaja.iva) - Number(cantidad),
                            "quantSolde": Number(verifyCaja.quantSolde) + Number(cantidad),
                            "lastSoldeNameUser": verifyCS.nameConfSist,
                            "lastSoldeRecharge": Number(cantidad),
                            "lastSolde": Number(verifyCaja.quantSolde),
                            "tipoDeRecarga": "Iva a saldo",
                        }
                        const new_update = await RegisControlSist.findByIdAndUpdate(verifyCaja._id, new_info)

                        //REGISTRAR LA RECARGA
                        const registData = new IvaASaldo()
                        registData.nameAdmin = verifyCaja.name
                        registData.idAdmin = verifyCaja._id
                        registData.idIvaASaldo = verifyCaja._id
                        registData.phoneAdmin = verifyCaja.phone
                        registData.typeUser = verifyCaja.roles[0].name
                        registData.fechaA = new Date()


                        registData.idConfSist = verifyCS._id
                        registData.activar = true
                        registData.validar = true
                        registData.nameConfSist = verifyCS.name
                        registData.phoneConfSist = verifyCS.phone
                        registData.typeConfSist = verifyCS.roles[0].name
                        registData.cantidad = Number(cantidad)
                        registData.cantidadSaldo = Number(verifyCaja.quantSolde)


                        const addData = await registData.save()

                        console.log(addData)

                        res.status(200).json({ verificar: true, mens: "Conversion exitosa" })
                    } else {
                        res.status(200).json({ verificar: false, mens: "Interes insuficiente" })
                    }
                } else {
                    res.status(200).json({ verificar: false, mens: "La cajara general todavia no esta creada" })
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

module.exports = IvaASaldoCajaAdmin