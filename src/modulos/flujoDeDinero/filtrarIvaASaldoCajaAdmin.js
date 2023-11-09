const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const IvaASaldo = require("../../modelos/ivaAsaldo")
const RegisControlSist = require("../../modelos/regisControlSist")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function  FiltrarIvaASaldoAdmin(req, res) {
    const { texto, ciudad, desde, hasta, userId } = req.body
    console.log(texto, ciudad, desde, hasta, userId)

    
    try {

        const desdes = {
            typeUser: "Cajero",
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }

        const textos = {
            typeUser: "Cajero",
            $or: [
                { nameCaja: { $regex: texto, $options: 'i' } },
                { phoneCaja: { $regex: texto, $options: 'i' } },
                { nameMaster: { $regex: texto, $options: 'i' } },
                { phoneMaster: { $regex: texto, $options: 'i' } },
            ]
        }


        const desdeTexto = {
            typeUser: "Cajero",
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

        const result = await IvaASaldo.paginate(buscarVar, { limit: 1500, sort: { createdAt: -1 } })

        res.status(200).json({ verificar: true, mens: "ok", data: result })


    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = FiltrarIvaASaldoAdmin