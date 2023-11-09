const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const RegisControlSist = require("../../modelos/regisControlSist")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function ObtenerInfoCajaAdmin(req, res) {

    try {

        const result = await RegisControlSist.findOne({typeUser: "Cajero"})

        console.log(result,'eqrqtqfqgqgh')

        if (result !== null) {
            res.status(200).json({verificar:true,mens:"ok",data:result})
        } else {
            res.status(200).json({verificar:true,mens:"ok",data:null})   
        }

    } catch (error) {
        console.log(error)
        res.status(200).json({verificar:false,mens:"hay un problema",data:{docs:null}})
    }
}

module.exports = ObtenerInfoCajaAdmin