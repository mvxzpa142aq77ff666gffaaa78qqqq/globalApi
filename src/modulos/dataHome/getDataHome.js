const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const RegisControlSist = require("../../modelos/regisControlSist")
const RegisAdmin = require("../../modelos/regisAdmin")
const Envios = require("../../modelos/sends")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */


async function ObtenerInfoGeneral(req, res) {

    try {


        let masters = 0
        let cajas = 0
        let admin = 0
        let saldo_restante = 0
        let saldo_repartido = 0
        let iva = 0
        let interes = 0
        let saldo_caja = 0
        let saldo_master = 0
        let saldo_envios_pending = 0

        const resultMaster = await RegisControlSist.paginate({ $or: [{ typeUser: "Master_GNOB" }, { typeUser: "Master_FINANCIADO" }, { typeUser: "Master_PREFINANCIADO" }] }, { limit: 1000, sort: { createdAt: -1 } })
        const resultCaja = await RegisAdmin.paginate({}, { limit: 1000, sort: { createdAt: -1 } })
        const resultEnvios = await Envios.paginate({verifyRecp:false}, { limit: 10000, sort: { createdAt: -1 } })
        const resultCajaAdmin = await RegisControlSist.findOne({ typeUser: 'Cajero' }).populate({ path: 'roles' })
        const resultAdmin = await RegisControlSist.paginate({ $or: [{ typeUser: "Gestor" }, { typeUser: "Cajero" }, { typeUser: "Atencion_al_cliente" }] }, { limit: 1000, sort: { createdAt: -1 } })


        if (resultMaster !== null) {
            cajas = resultMaster.docs.length
            var totalSaldMaster = 0
            if (resultMaster.docs.length) {
                var cesta = resultMaster.docs
                for (let x in cesta) {
                    totalSaldMaster += cesta[x]["quantSolde"]
                }
            }

            saldo_master = totalSaldMaster
        }

        if (resultEnvios !== null) {
            cajas = resultEnvios.docs.length
            var totalSaldo = 0
            if (resultEnvios.docs.length) {
                var cesta = resultEnvios.docs
                for (let x in cesta) {
                    totalSaldo += cesta[x]["quantSend"]
                }
            }
            saldo_envios_pending = totalSaldo
        }


        if (resultCaja !== null) {
            cajas = resultCaja.docs.length
            var totalSaldCaja = 0
            if (resultCaja.docs.length) {
                var cesta = resultCaja.docs
                for (let x in cesta) {
                    totalSaldCaja += cesta[x]["quantSolde"]
                }
            }

            saldo_caja = totalSaldCaja
        }


        if (resultMaster !== null) {
            masters = resultMaster.docs.length
        }
        if (resultCaja !== null) {
            cajas = resultCaja.docs.length
        }


        if (resultAdmin !== null) {
            admin = resultAdmin.docs.length
        }
        if (resultCajaAdmin !== null) {
            saldo_restante = resultCajaAdmin.quantSolde
            saldo_repartido = resultCajaAdmin.quantSoldeRepar
            iva = resultCajaAdmin.iva
            interes = resultCajaAdmin.interesGlobal
        }


        res.status(200).json({
            verificar: true, mens: "ok", data: {
                master: masters,
                caja: cajas,
                admin: admin,
                saldo_rest: saldo_restante,
                saldo_repar: saldo_repartido,
                interesTotal: interes,
                ivaTotal: iva,
                saldo_master:saldo_master,
                saldo_caja:saldo_caja,
                saldo_envios_pending:saldo_envios_pending
            }
        })


    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = ObtenerInfoGeneral