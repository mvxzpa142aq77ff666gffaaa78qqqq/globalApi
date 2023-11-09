const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const RegisControlSist = require("../../modelos/regisControlSist")
const RegisAdmin = require("../../modelos/regisAdmin")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */


async function ObtenerInfoHomeCaja(req, res) {
    const { id } = req.params

    try {


        let masters = 1
        let cajas = 0
        let admin = 0
        let saldo_restante = 0
        let saldo_repartido = 0
        let iva = 0
        let interes = 0

        const resultCaja = await RegisControlSist.findById(id).populate({ path: 'userMaster' })




       
        if (resultCaja !== null) {
            saldo_restante = resultCaja.quantSolde
            saldo_repartido = resultCaja.quantSoldeRepar
            iva = resultCaja.iva
            interes = resultCaja.interesSocio
        }


        res.status(200).json({
            verificar: true, mens: "ok", data: {
                master: masters,
                caja: cajas,
                admin: admin,
                saldo_rest: saldo_restante,
                saldo_repar: saldo_repartido,
                interesTotal: interes,
                ivaTotal:iva
            }
        })


    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = ObtenerInfoHomeCaja