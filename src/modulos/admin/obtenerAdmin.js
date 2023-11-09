const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const RegisControlSist = require("../../modelos/regisControlSist")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function ObtenerAdmin(req, res) {

    try {

        const result = await RegisControlSist.paginate({$or: [/*{typeUser: "super_admin"}, */{ typeUser: "Gestor"}, { typeUser: "Cajero"}, { typeUser: "Atencion_al_cliente"}]}, { limit: 1000, sort: { createdAt: -1 } })

        res.status(200).json({verificar:true,mens:"ok",data:result})

    } catch (error) {
        res.status(200).json({verificar:false,mens:"hay un problema"})
    }
}

module.exports = ObtenerAdmin