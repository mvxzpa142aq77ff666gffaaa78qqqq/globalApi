const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const Envios = require("../../modelos/sends")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function obtenerEnviosDeUnMaster(req, res) {
    const { id } = req.params

    try {

        const result = await Envios.paginate({idCSMaster:id},{limit: 100,sort: { createdAt: -1 }} )
        console.log(result)

        res.status(200).json({ verificar: true, mens: "ok", data: result })

    } catch (error) {
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = obtenerEnviosDeUnMaster