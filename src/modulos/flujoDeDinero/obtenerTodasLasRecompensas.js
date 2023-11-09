const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const Recompensar = require("../../modelos/modelPay")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function ObtenerTodasLasRecompensas(req, res) {
    const { id } = req.params

    try {

        const result = await Recompensar.paginate({},{limit: 1000,sort: { createdAt: -1 }} )
        console.log(result)

        res.status(200).json({ verificar: true, mens: "ok", data: result })

    } catch (error) {
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = ObtenerTodasLasRecompensas