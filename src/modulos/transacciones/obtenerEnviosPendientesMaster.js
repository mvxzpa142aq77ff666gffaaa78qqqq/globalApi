const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const Envios = require("../../modelos/sends")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function ObtenerLosEnviosPendientesMaster(req, res) {
    const { id } = req.params

    try {

        const result = await Envios.paginate({verifyRecp:false,idCSMaster:id},{limit: 100,sort: { createdAt: -1 }} )

        res.status(200).json({ verificar: true, mens: "ok", data: result })

    } catch (error) {
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = ObtenerLosEnviosPendientesMaster