const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


//Twilio credentials



const RegisControlSist = require("../../modelos/regisControlSist")


/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */

/**************modulo de comisiones ********************************/
const CalculoIntereces = require("../comisiones")
/*************************************************************** */

/****************modulo para generar claves **************************/
const Claves = require("../generarClaves")
/***************************************************** */


async function ActiveMasterAdmin(req, res) {

    const { id, actionT, userId } = req.body


    try {

        const verify = await RegisControlSist.findById(id)

        const verifyCS = await RegisControlSist.findById(userId)

        if (verifyCS !== null && verifyCS.activeCount) {

            if (verifyCS.acciones.includes('activar_desactivar_master')) {
                if (verify !== null) {
                    if (actionT === "desactivar") {
                        //DESACTIVAR
                        const new_info = {
                            "activeCount": false,
                        }
                        const new_update = await RegisControlSist.findByIdAndUpdate(id, new_info)

                        res.status(200).json({ verificar: true, mens: "Cuenta desactivada", etat: false })

                    } else {
                        if (actionT === "activar") {
                            //ACTIVAR
                            const new_info = {
                                "activeCount": true,
                            }
                            const new_update = await RegisControlSist.findByIdAndUpdate(id, new_info)

                            res.status(200).json({ verificar: true, mens: "Cuenta activada", etat: true })

                        } else {
                            res.status(200).json({ verificar: false, mens: "Hay un problema", result: [] })
                        }
                    }
                } else {
                    res.status(200).json({ verificar: false, mens: "No se ha podido desactivar el socio", result: [] })

                }
            } else {
                res.status(200).json({ verificar: false, mens: "No tienes estos permisos", result: [] })

            }

        } else {
            res.status(200).json({ verificar: false, mens: "No se ha podido desactivar el socio", result: [] })
        }

    } catch (error) {
        res.status(200).json({ verificar: false, mens: "Hay un problema", result: [] })

    }
}

module.exports = ActiveMasterAdmin