const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const Recepciones = require("../../modelos/recep")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function ObtenerTodasLasRecepciones(req, res) {
    const { id } = req.params

    try {

        const result = await Recepciones.paginate({},{limit: 100,sort: { createdAt: -1 }} )
        console.log(result)

        res.status(200).json({ verificar: true, mens: "ok", data: result })

    } catch (error) {
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = ObtenerTodasLasRecepciones