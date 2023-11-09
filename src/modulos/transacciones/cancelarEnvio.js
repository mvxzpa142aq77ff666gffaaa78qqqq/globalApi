const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")




/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */

const SendMoney = require("../../modelos/sends")
const RegisAdmin = require("../../modelos/regisAdmin")

const RegisControlSist = require("../../modelos/regisControlSist")
const SendDelete = require("../../modelos/sendDelete")


/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */

/**************modulo de comisiones ********************************/
const CalculoIntereces = require("../comisiones")
/*************************************************************** */

/****************modulo para generar claves **************************/
const Claves = require("../generarClaves")
/***************************************************** */


async function CancelarEnvio(req, res) {

    const { codeRecp, id, idAdmin, userName, userPhone, motivo } = req.body

    try {
        const verificar = await SendMoney.findById(id)
        const verificarAdmin = await RegisAdmin.findById(idAdmin)

        const verifyCajera = await RegisControlSist.findOne({ typeUser: 'Cajero' }).populate({ path: 'roles' })



        if (verificarAdmin !== null) {
            if (verificar !== null) {
                if (verificar.verifyRecp === false) {
                    if (verificar.refSend === codeRecp) {
                        const master = await RegisControlSist.findById(verificar.idCSMaster).populate({ path: "roles" })
                        if (master !== null) {
                            if (verifyCajera !== null) {
                                const cancelar = await SendMoney.findByIdAndDelete(id)
                                if (cancelar !== null) {
                                    const valoresInteres = CalculoIntereces(Number(verificar.quantSend), master.roles[0].name)
                                    const interesSocioR = Number(valoresInteres.isR)

                                    const new_info2 = {
                                        "interesGlobal": Number(verifyCajera.interesGlobal) - Number(interesSocioR)
                                    }
                                    const new_update2 = await RegisControlSist.findByIdAndUpdate(verifyCajera._id, new_info2)

                                    const new_info3 = {
                                        "interesGlobal": Number(master.interesGlobal) - Number(interesSocioR)
                                    }
                                    const new_update3 = await RegisControlSist.findByIdAndUpdate(master._id, new_info3)


                                    const new_info1 = {
                                        "quantSolde": Number(verificarAdmin.quantSolde) + Number(verificar.quantSend) + Number(interesSocioR)
                                    }
                                    const new_update1 = await RegisAdmin.findByIdAndUpdate(verificar.idAdmin, new_info1)

                                    const addDataCancell = new SendDelete()  

                                    addDataCancell.nameAdminDelete = userName
                                    addDataCancell.idAdminDelete = idAdmin
                                    addDataCancell.phoneAdminDelete = userPhone
                                    addDataCancell.phoneAdminSend = verificar.phoneAdmin
                                    addDataCancell.nameSend = verificar.nameSend
                                    addDataCancell.nameRecep = verificar.nameRecep
                                    addDataCancell.phoneSend = verificar.phoneSend
                                    addDataCancell.phoneRecep = verificar.phoneRecep
                                    addDataCancell.adressSend = verificar.adressAdmin
                                    addDataCancell.adressRecep = verificar.adressRecep
                                    addDataCancell.refSend = verificar.refSend
                                    addDataCancell.quantSend = verificar.quantSend
                                    addDataCancell.dipSend = verificar.dipSend
                                    addDataCancell.verifyRecp = verificar.verifyRecp
                                    addDataCancell.description = motivo
                                    addDataCancell.idAdminSend = verificar.idAdmin
                                    addDataCancell.idCSMaster = verificar.idCSMaster
                                    addDataCancell.fechaA = new Date()


                                    await addDataCancell.save()

                                    res.status(200).json({ verificar: true, mens: "La transferencia ha sido cancelada" })
                                } else {

                                    res.status(200).json({ verificar: false, mens: "No se a podido anular la transferencia" })
                                }
                            } else {
                                res.status(200).json({ verificar: true, mens: "La cajera no existe" })
                            }

                        } else {
                            res.status(200).json({ verificar: false, mens: "El master no existe" })

                        }
                    } else {
                        res.status(200).json({ verificar: false, mens: "Codigo de referencia incorrecta" })

                    }
                } else {
                    res.status(200).json({ verificar: false, mens: "La transferencia ya se ha cobrado" })
                }
            } else {
                res.status(200).json({ verificar: false, mens: "El envio no existe" })
            }
        } else {
            res.status(200).json({ verificar: false, mens: "La caja no existe" })
        }

    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = CancelarEnvio