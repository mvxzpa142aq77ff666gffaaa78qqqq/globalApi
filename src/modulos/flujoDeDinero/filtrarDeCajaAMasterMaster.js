const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const MovimientoDeCajaAMaster = require("../../modelos/moviemientosMaster")
const RegisControlSist = require("../../modelos/regisControlSist")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function FiltroDeCajaAMasterMaster(req, res) {
    const { texto, ciudad, desde, hasta, userId } = req.body
    console.log(texto, ciudad, desde, hasta, userId)

    
    try {

        const desdes = {
            idMaster: userId,
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }

        const textos = {
            idMaster: userId,
            $or: [
                { nameCaja: { $regex: texto, $options: 'i' } },
                { phoneCaja: { $regex: texto, $options: 'i' } },
                { nameMaster: { $regex: texto, $options: 'i' } },
                { phoneMaster: { $regex: texto, $options: 'i' } },
            ]
        }


        const desdeTexto = {
            idMaster: userId,
            $or: [
                { nameCaja: { $regex: texto, $options: 'i' } },
                { phoneCaja: { $regex: texto, $options: 'i' } },
                { nameMaster: { $regex: texto, $options: 'i' } },
                { phoneMaster: { $regex: texto, $options: 'i' } },
            ],
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }



        let buscarVar = desde && hasta && texto ? desdeTexto : !desde && !hasta && texto ? textos : desde && hasta && !texto ? desdes : { idAdmin: '1245875zzz' }

        console.log(buscarVar)

        const result = await MovimientoDeCajaAMaster.paginate(buscarVar, { limit: 1500, sort: { createdAt: -1 } })

        res.status(200).json({ verificar: true, mens: "ok", data: result })


    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = FiltroDeCajaAMasterMaster