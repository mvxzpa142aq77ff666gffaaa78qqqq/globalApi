const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const InteresASaldo = require("../../modelos/interesASaldo")
const RegisControlSist = require("../../modelos/regisControlSist")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function FiltroFiltrarInteresesASaldoAdmin(req, res) {
    const { texto, ciudad, desde, hasta, userId } = req.body
    console.log(texto, ciudad, desde, hasta, userId)


    try {

        const desdes = {
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }

        const textos = {
            $or: [
                { phoneAdmin: { $regex: texto, $options: 'i' } },
                { nameAdmin: { $regex: texto, $options: 'i' } },
                { phoneConfSist: { $regex: texto, $options: 'i' } },
                { nameConfSist: { $regex: texto, $options: 'i' } },
            ]
        }


        const desdeTexto = {
            $or: [
                { phoneAdmin: { $regex: texto, $options: 'i' } },
                { nameAdmin: { $regex: texto, $options: 'i' } },
                { phoneConfSist: { $regex: texto, $options: 'i' } },
                { nameConfSist: { $regex: texto, $options: 'i' } },
            ],
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }



        let buscarVar = desde && hasta && texto ? desdeTexto : !desde && !hasta && texto ? textos : desde && hasta && !texto ? desdes : { idAdmin: '1245875zzz' }

        console.log(buscarVar)

        const result = await InteresASaldo.paginate(buscarVar, { limit: 1500, sort: { createdAt: -1 } })

        res.status(200).json({ verificar: true, mens: "ok", data: result })


    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = FiltroFiltrarInteresesASaldoAdmin