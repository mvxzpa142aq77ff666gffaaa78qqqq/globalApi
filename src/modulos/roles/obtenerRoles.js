const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */

const Role = require("../../modelos/roles")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function ObtenerRoles(req, res) {

    try {

        const result = await Role.paginate({}, { limit: 1000, sort: { createdAt: -1 } })
        
        res.status(200).json({verificar:true,mens:"ok",data:result})

    } catch (error) {
        res.status(200).json({verificar:false,mens:"hay un problema"})
    }
}

module.exports = ObtenerRoles