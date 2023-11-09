const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const RecharSolde = require("../../modelos/recharSolde")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function ObtenerInfoCajaAdmin(req, res) {

    try {

        const result = await RecharSolde.paginate({typeUser: "Cajero"}, { limit: 1000, sort: { createdAt: -1 } })

        if (result !== null) {
            res.status(200).json({verificar:true,mens:"ok",data:result})
        } else {
            res.status(200).json({verificar:true,mens:"ok",data:[]})
        }

    } catch (error) {
        res.status(200).json({verificar:false,mens:"hay un problema"})
    }
}

module.exports = ObtenerInfoCajaAdmin