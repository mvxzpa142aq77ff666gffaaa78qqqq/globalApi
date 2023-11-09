const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const Envios = require("../../modelos/sends")
const RegisControlSist = require("../../modelos/regisControlSist")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function FiltrarEnviosPendientesMaster(req, res) {
    const { texto, ciudad, desde, hasta, userId } = req.body
    console.log(texto, ciudad, desde, hasta, userId)


    try {

        const desdeCiudadTextos = {
            verifyRecp:false,
            idCSMaster:userId,
            $or: [
                { phoneAdmin: {$regex: texto,$options:'i'} },
                { nameAdmin: {$regex: texto,$options:'i'} },
                { nameSend: {$regex: texto,$options:'i'} },
                { nameRecep: {$regex: texto,$options:'i'} },
                { phoneSend: {$regex: texto,$options:'i'} },
                { phoneRecep: {$regex: texto,$options:'i'} },
                { dipSend: {$regex: texto,$options:'i'} },
                { dipRecep: {$regex: texto,$options:'i'} },
            ],
            adressAdmin: ciudad ,
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }

        const desdes = {
            verifyRecp:false,
            idCSMaster:userId,
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }

        const textos = {
            verifyRecp:false,
            idCSMaster:userId,
            $or: [
                { phoneAdmin: {$regex: texto,$options:'i'} },
                { nameAdmin: {$regex: texto,$options:'i'} },
                { nameSend: {$regex: texto,$options:'i'} },
                { nameRecep: {$regex: texto,$options:'i'} },
                { phoneSend: {$regex: texto,$options:'i'} },
                { phoneRecep: {$regex: texto,$options:'i'} },
                { dipSend: {$regex: texto,$options:'i'} },
                { dipRecep: {$regex: texto,$options:'i'} },
            ]
        }

        const ciudads = {
            verifyRecp:false,
            idCSMaster:userId,
            adressAdmin: ciudad
            
        }

        const desdeCiudad = {
            verifyRecp:false,
            idCSMaster:userId,
            adressAdmin: ciudad ,
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }

        const desdeTexto = {
            verifyRecp:false,
            idCSMaster:userId,
            $or: [
                { phoneAdmin: {$regex: texto,$options:'i'} },
                { nameAdmin: {$regex: texto,$options:'i'} },
                { nameSend: {$regex: texto,$options:'i'} },
                { nameRecep: {$regex: texto,$options:'i'} },
                { phoneSend: {$regex: texto,$options:'i'} },
                { phoneRecep: {$regex: texto,$options:'i'} },
                { dipSend: {$regex: texto,$options:'i'} },
                { dipRecep: {$regex: texto,$options:'i'} },
            ],
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }


        const ciudadTexto = {
            adressAdmin: ciudad ,
            verifyRecp:false,
            idCSMaster:userId,
            $or: [
                { phoneAdmin: {$regex: texto,$options:'i'} },
                { nameAdmin: {$regex: texto,$options:'i'} },
                { nameSend: {$regex: texto,$options:'i'} },
                { nameRecep: {$regex: texto,$options:'i'} },
                { phoneSend: {$regex: texto,$options:'i'} },
                { phoneRecep: {$regex: texto,$options:'i'} },
                { dipSend: {$regex: texto,$options:'i'} },
                { dipRecep: {$regex: texto,$options:'i'} },
                
            ]

        }

        let buscarVar = (ciudad && ciudad !== 'Todo') && desde && hasta && texto ? desdeCiudadTextos : (ciudad && ciudad !== 'Todo') && desde && hasta && !texto ? desdeCiudad : (ciudad && ciudad !=='Todo') && !desde && !hasta && texto ? ciudadTexto : (!ciudad || ciudad === 'Todo') && desde && hasta && texto ? desdeTexto : (!ciudad || ciudad === 'Todo') && !desde && !hasta && texto ? textos : (ciudad && ciudad !== 'Todo') && !desde && !hasta && !texto ? ciudads : (!ciudad || ciudad === 'Todo') && desde && hasta && !texto ? desdes : { idAdmin: '1245875zzz' }

        //console.log(buscarVar)

        const result = await Envios.paginate( buscarVar, { limit: 1500, sort: { createdAt: -1 } })


        res.status(200).json({ verificar: true, mens: "ok", data: result })


      
    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = FiltrarEnviosPendientesMaster