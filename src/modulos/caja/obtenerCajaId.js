const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const CajasMaster = require("../../modelos/regisAdmin")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function ObtenerCajasDeUnMaster(req, res) {
    const { id } = req.params

    try {

        const result = await CajasMaster.findById(id).populate({path:"userMaster"})
        console.log(result)

        res.status(200).json({ verificar: true, mens: "ok", data: result })

    } catch (error) {
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports =ObtenerCajasDeUnMaster