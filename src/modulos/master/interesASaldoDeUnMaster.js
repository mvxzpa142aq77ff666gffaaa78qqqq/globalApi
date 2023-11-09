const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")





/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */


const InteresASaldo = require("../../modelos/interesASaldo")
const RegisControlSist = require("../../modelos/regisControlSist")

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
        const verifyMaster = await RegisControlSist.findById(idMaster).populate({ path: 'roles' })

        if (verifyMaster !== null) {
            if (arrayMaster.includes(verifyMaster.roles[0].name) && verifyMaster.acciones.includes('interes_a_saldo_master')) {
                if (Number(verifyMaster.interesSocio) >= Number(cantidad)) {
                    //ACTUALIZAR LA CAJA ADMIN
                    const new_info = {
                        "interesSocio": Number(verifyMaster.interesSocio) - Number(cantidad),
                        "quantSolde": Number(verifyMaster.quantSolde) + Number(cantidad),
                        "lastSoldeNameUser": verifyMaster.name,
                        "lastSoldeRecharge": Number(cantidad),
                        "lastSolde": Number(verifyMaster.quantSolde),
                        "tipoDeRecarga": "Interes a saldo",
                    }
                    const new_update = await RegisControlSist.findByIdAndUpdate(verifyMaster._id, new_info)

                    //REGISTRAR LA RECARGA
                    const registData = new InteresASaldo()
                    registData.nameAdmin = verifyMaster.name
                    registData.idAdmin = verifyMaster._id
                    registData.idInteresSaldo = verifyMaster._id
                    registData.phoneAdmin = verifyMaster.phone
                    registData.typeUser = verifyMaster.roles[0].name
                    registData.fechaA = new Date()

                    registData.idConfSist = verifyMaster._id
                    registData.activar = true
                    registData.validar = true
                    registData.nameConfSist = verifyMaster.name
                    registData.phoneConfSist = verifyMaster.phone
                    registData.typeConfSist = verifyMaster.roles[0].name
                    registData.cantidad = Number(cantidad)
                    registData.cantidadSaldo = Number(verifyMaster.quantSolde)


                    const addData = await registData.save()

                    console.log(addData)

                    res.status(200).json({ verificar: true, mens: "Tu cuenta acaba de ser recargada" })
                } else {
                    res.status(200).json({ verificar: false, mens: "Redusca el monto" })
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