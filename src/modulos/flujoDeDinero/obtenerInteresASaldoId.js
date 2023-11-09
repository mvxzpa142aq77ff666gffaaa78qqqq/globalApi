const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const InteresASaldo = require("../../modelos/interesASaldo")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function ObtenerInteresASaldoId(req, res) {
    const { id } = req.params

    try {

        const result = await InteresASaldo.paginate({idInteresSaldo:id},{limit: 1000,sort: { createdAt: -1 }} )
        console.log(result)

        res.status(200).json({ verificar: true, mens: "ok", data: result })

    } catch (error) {
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = ObtenerInteresASaldoId