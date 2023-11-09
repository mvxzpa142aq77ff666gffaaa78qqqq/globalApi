const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const RegisControlSist = require("../../modelos/regisControlSist")
const RegisAdmin = require("../../modelos/regisAdmin")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function ObtenerTodasLasCajas(req, res) {
    const { userId } = req.body
    try {

        const result = await RegisAdmin.paginate({}, { limit: 1000, sort: { createdAt: -1 } })

        res.status(200).json({verificar:true,mens:"ok",data:result})

    } catch (error) {
        res.status(200).json({verificar:false,mens:"hay un problema"})
    }
}

module.exports = ObtenerTodasLasCajas