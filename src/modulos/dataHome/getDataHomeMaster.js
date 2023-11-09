const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const RegisControlSist = require("../../modelos/regisControlSist")
const RegisAdmin = require("../../modelos/regisAdmin")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */


async function ObtenerInfoHomeMaster(req, res) {
    const { id } = req.params

    try {


        let masters = 1
        let cajas = 0
        let admin = 0
        let saldo_restante = 0
        let saldo_repartido = 0
        let saldo_caja = 0
        let iva = 0
        let interes = 0

        const resultCaja = await RegisAdmin.paginate({idCSMaster:id}, { limit: 1000, sort: { createdAt: -1 } })
        const resultMaster = await RegisControlSist.findById(id).populate({ path: 'roles' })


        if (resultCaja !== null) {
            cajas = resultCaja.docs.length
            var totalInt = 0
            var totalSaldCaja = 0

            if (resultCaja.docs.length) {
                var cesta = resultCaja.docs
                for (let x in cesta) {
                    totalInt += cesta[x]["interesSocio"]
                    totalSaldCaja += cesta[x]["quantSolde"]
                }
                
            }

            interes = totalInt
            saldo_caja = totalSaldCaja
        }


       
        if (resultMaster !== null) {
            saldo_restante = resultMaster.quantSolde
            saldo_repartido = resultMaster.quantSoldeRepar
            iva = resultMaster.iva
            //interes = resultMaster.interesGlobal
        }


        res.status(200).json({
            verificar: true, mens: "ok", data: {
                master: masters,
                caja: cajas,
                admin: admin,
                saldo_rest: saldo_restante,
                saldo_repar: saldo_repartido,
                interesTotal: interes,
                ivaTotal:iva,
                saldo_caja:saldo_caja
            }
        })


    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = ObtenerInfoHomeMaster