const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const RegisControlSist = require("../../modelos/regisControlSist")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function ObtenerMaster(req, res) {

    try {

        const result = await RegisControlSist.paginate({$or: [{ typeUser: "Master_GNOB"},{typeUser:'Master_FINANCIADO'},{typeUser:'Master_PREFINANCIADO'}]}, { limit: 1000, sort: { createdAt: -1 } })

        res.status(200).json({verificar:true,mens:"ok",data:result})

    } catch (error) {
        res.status(200).json({verificar:false,mens:"hay un problema"})
    }
}

module.exports = ObtenerMaster