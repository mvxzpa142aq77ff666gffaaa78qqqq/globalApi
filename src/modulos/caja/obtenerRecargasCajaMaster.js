const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const RegisControlSist = require("../../modelos/regisControlSist")
const RecharSolde = require("../../modelos/recharSolde")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function ObtenerRecargasCajaMaster(req, res) {
    const { id } = req.params

    try {

        const result = await RecharSolde.paginate({idAdmin:id},{limit: 1000,sort: { createdAt: -1 }} )
        console.log(result)

        res.status(200).json({ verificar: true, mens: "ok", data: result })

    } catch (error) {
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = ObtenerRecargasCajaMaster