const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const EnviosCancelados = require("../../modelos/sendDelete")
const RegisControlSist = require("../../modelos/regisControlSist")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function EnviosCanceladosFiltroTodos(req, res) {
    const { texto, ciudad, desde, hasta, userId } = req.body
    console.log(texto, ciudad, desde, hasta, userId)


    try {

        const desdeCiudadTextos = {
            idCSMaster:userId,
            $or: [
                { nameAdminDelete: {$regex: texto,$options:'i'} },
                { phoneAdminDelete: {$regex: texto,$options:'i'} },
                { phoneAdminSend: {$regex: texto,$options:'i'} },
                { nameSend: {$regex: texto,$options:'i'} },
                { nameRecep: {$regex: texto,$options:'i'} },
                { phoneSend: {$regex: texto,$options:'i'} },
                { phoneRecep: {$regex: texto,$options:'i'} },
                { dipSend: {$regex: texto,$options:'i'} },
                { dipRecep: {$regex: texto,$options:'i'} },
                { description: {$regex: texto,$options:'i'} },
            ],
            adressSend: ciudad ,
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }

        const desdes = {
            idCSMaster:userId,
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }

        const textos = {
            idCSMaster:userId,
            $or: [
                { nameAdminDelete: {$regex: texto,$options:'i'} },
                { phoneAdminDelete: {$regex: texto,$options:'i'} },
                { phoneAdminSend: {$regex: texto,$options:'i'} },
                { nameSend: {$regex: texto,$options:'i'} },
                { nameRecep: {$regex: texto,$options:'i'} },
                { phoneSend: {$regex: texto,$options:'i'} },
                { phoneRecep: {$regex: texto,$options:'i'} },
                { dipSend: {$regex: texto,$options:'i'} },
                { dipRecep: {$regex: texto,$options:'i'} },
                { description: {$regex: texto,$options:'i'} },
            ]
        }

        const ciudads = {
            idCSMaster:userId,
            adressSend: ciudad
            
        }

        const desdeCiudad = {
            idCSMaster:userId,
            adressSend: ciudad ,
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }

        const desdeTexto = {
            idCSMaster:userId,

            $or: [
                { nameAdminDelete: {$regex: texto,$options:'i'} },
                { phoneAdminDelete: {$regex: texto,$options:'i'} },
                { phoneAdminSend: {$regex: texto,$options:'i'} },
                { nameSend: {$regex: texto,$options:'i'} },
                { nameRecep: {$regex: texto,$options:'i'} },
                { phoneSend: {$regex: texto,$options:'i'} },
                { phoneRecep: {$regex: texto,$options:'i'} },
                { dipSend: {$regex: texto,$options:'i'} },
                { dipRecep: {$regex: texto,$options:'i'} },
                { description: {$regex: texto,$options:'i'} },
            ],
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }


        const ciudadTexto = {
            idCSMaster:userId,
            adressSend: ciudad ,
            $or: [
                { nameAdminDelete: {$regex: texto,$options:'i'} },
                { phoneAdminDelete: {$regex: texto,$options:'i'} },
                { phoneAdminSend: {$regex: texto,$options:'i'} },
                { nameSend: {$regex: texto,$options:'i'} },
                { nameRecep: {$regex: texto,$options:'i'} },
                { phoneSend: {$regex: texto,$options:'i'} },
                { phoneRecep: {$regex: texto,$options:'i'} },
                { dipSend: {$regex: texto,$options:'i'} },
                { dipRecep: {$regex: texto,$options:'i'} },
                { description: {$regex: texto,$options:'i'} },
                
            ]

        }

        let buscarVar = (ciudad && ciudad !== 'Todo') && desde && hasta && texto ? desdeCiudadTextos : (ciudad && ciudad !== 'Todo') && desde && hasta && !texto ? desdeCiudad : (ciudad && ciudad !=='Todo') && !desde && !hasta && texto ? ciudadTexto : (!ciudad || ciudad === 'Todo') && desde && hasta && texto ? desdeTexto : (!ciudad || ciudad === 'Todo') && !desde && !hasta && texto ? textos : (ciudad && ciudad !== 'Todo') && !desde && !hasta && !texto ? ciudads : (!ciudad || ciudad === 'Todo') && desde && hasta && !texto ? desdes : { idAdmin: '1245875zzz' }

        console.log(buscarVar)

        const result = await EnviosCancelados.paginate( buscarVar, { limit: 100, sort: { createdAt: -1 } })


        res.status(200).json({ verificar: true, mens: "ok", data: result })



    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = EnviosCanceladosFiltroTodos