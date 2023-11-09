const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const RecharSolde = require("../../modelos/recharSolde")
const InteresASaldo = require("../../modelos/interesASaldo")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function ObtenerInteresASaldoCajaAdmin(req, res) {

    try {

        const result = await InteresASaldo.paginate({typeUser: "Cajero"}, { limit: 1000, sort: { createdAt: -1 } })

        if (result !== null) {
            res.status(200).json({verificar:true,mens:"ok",data:result})
        } else {
            res.status(200).json({verificar:true,mens:"ok",data:[]})
        }

    } catch (error) {
        res.status(200).json({verificar:false,mens:"hay un problema"})
    }
}

module.exports = ObtenerInteresASaldoCajaAdmin