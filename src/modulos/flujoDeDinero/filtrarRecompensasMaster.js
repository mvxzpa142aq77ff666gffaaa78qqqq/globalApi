const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const Recompensar = require("../../modelos/modelPay")
const RegisControlSist = require("../../modelos/regisControlSist")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function FiltroRecompensasAdmin(req, res) {
    const { texto, ciudad, desde, hasta, userId } = req.body
    console.log(texto, ciudad, desde, hasta, userId)
    try {


        const desdes = {
            idCSMaster: userId,
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }

        const textos = {
            idCSMaster: userId,
            $or: [
                { phoneAdmin: {$regex: texto,$options:'i'} },
                { nameAdmin: {$regex: texto,$options:'i'} },
                { phoneConfSist: {$regex: texto,$options:'i'} },
                { nameConfSist: {$regex: texto,$options:'i'} },
            ]
        }


        const desdeTexto = {
            idCSMaster: userId,
            $or: [
                { phoneAdmin: {$regex: texto,$options:'i'} },
                { nameAdmin: {$regex: texto,$options:'i'} },
                { phoneConfSist: {$regex: texto,$options:'i'} },
                { nameConfSist: {$regex: texto,$options:'i'} },
            ],
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }



        let buscarVar =  desde && hasta && texto ? desdeTexto :!desde && !hasta && texto ? textos : desde && hasta && !texto ? desdes : { idAdmin: '1245875zzz' }

        console.log(buscarVar)

        const result = await Recompensar.paginate( buscarVar, { limit: 1500, sort: { createdAt: -1 } })

        res.status(200).json({ verificar: true, mens: "ok", data: result })


    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = FiltroRecompensasAdmin