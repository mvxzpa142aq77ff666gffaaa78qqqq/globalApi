const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const Recept = require("../../modelos/recep")
const RegisControlSist = require("../../modelos/regisControlSist")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function BuscarRecepcionesFiltro(req, res) {
    const { texto, ciudad, desde, hasta, userId } = req.body
    console.log(texto, ciudad, desde, hasta, userId)
    

    try {

        const desdeCiudadTextos = {
            idAdminRecep: userId,
            $or: [
                { phoneAdminSend: {$regex: texto,$options:'i'} },
                { nameAdminSend: {$regex: texto,$options:'i'} },
                { phoneAdminRecep: {$regex: texto,$options:'i'} },
                { nameAdminRecep: {$regex: texto,$options:'i'} },
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
            idAdminRecep: userId,
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }

        const textos = {
            idAdminRecep: userId,
            $or: [
                { phoneAdminSend: {$regex: texto,$options:'i'} },
                { nameAdminSend: {$regex: texto,$options:'i'} },
                { phoneAdminRecep: {$regex: texto,$options:'i'} },
                { nameAdminRecep: {$regex: texto,$options:'i'} },
                { nameSend: {$regex: texto,$options:'i'} },
                { nameRecep: {$regex: texto,$options:'i'} },
                { phoneSend: {$regex: texto,$options:'i'} },
                { phoneRecep: {$regex: texto,$options:'i'} },
                { dipSend: {$regex: texto,$options:'i'} },
                { dipRecep: {$regex: texto,$options:'i'} },
            ]
        }

        const ciudads = {
            idAdminRecep: userId,
            adressAdmin: ciudad 
            
        }

        const desdeCiudad = {
            idAdminRecep: userId,
            adressAdmin: ciudad ,
            $and: [
                { createdAt: { $gte: desde } },
                { createdAt: { $lte: hasta } }
            ]
        }

        const desdeTexto = {
            idAdminRecep: userId,

            $or: [
                { phoneAdminSend: {$regex: texto,$options:'i'} },
                { nameAdminSend: {$regex: texto,$options:'i'} },
                { phoneAdminRecep: {$regex: texto,$options:'i'} },
                { nameAdminRecep: {$regex: texto,$options:'i'} },
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
            idAdminRecep: userId,
            adressAdmin: ciudad ,
            $or: [
                { phoneAdminSend: {$regex: texto,$options:'i'} },
                { nameAdminSend: {$regex: texto,$options:'i'} },
                { phoneAdminRecep: {$regex: texto,$options:'i'} },
                { nameAdminRecep: {$regex: texto,$options:'i'} },
                { nameSend: {$regex: texto,$options:'i'} },
                { nameRecep: {$regex: texto,$options:'i'} },
                { phoneSend: {$regex: texto,$options:'i'} },
                { phoneRecep: {$regex: texto,$options:'i'} },
                { dipSend: {$regex: texto,$options:'i'} },
                { dipRecep: {$regex: texto,$options:'i'} },
                
            ]

        }

        let buscarVar = (ciudad && ciudad !== 'Todo') && desde && hasta && texto ? desdeCiudadTextos : (ciudad && ciudad !== 'Todo') && desde && hasta && !texto ? desdeCiudad : (ciudad && ciudad !=='Todo') && !desde && !hasta && texto ? ciudadTexto : (!ciudad || ciudad === 'Todo') && desde && hasta && texto ? desdeTexto : (!ciudad || ciudad === 'Todo') && !desde && !hasta && texto ? textos : (ciudad && ciudad !== 'Todo') && !desde && !hasta && !texto ? ciudads : (!ciudad || ciudad === 'Todo') && desde && hasta && !texto ? desdes : { idAdmin: '1245875zzz' }

        console.log(buscarVar)

        const result = await Recept.paginate( buscarVar, { limit: 1500, sort: { createdAt: -1 } })

        console.log(result)


        res.status(200).json({ verificar: true, mens: "ok", data: result })


        /*
        if (ciudad && desde && hasta && texto) {

            console.log(desdeCiudadTextos,'desdeCiudadTextos')

            const result = await Envios.paginate(desdeCiudadTextos, { limit: 1500, sort: { createdAt: -1 } })

            res.status(200).json({ verificar: true, mens: "ok", data: result })
        }

        if (ciudad && desde && hasta && texto === "") {
            console.log(desdeCiudad,'desdeCiudad')

            const result = await Envios.paginate(desdeCiudad, { limit: 1500, sort: { createdAt: -1 } })

            res.status(200).json({ verificar: true, mens: "ok", data: result })
        }

        if (ciudad && desde ==='' && hasta ==='' && texto) {
            console.log(ciudadTexto,'ciudadTexto')

            const result = await Envios.paginate( ciudadTexto, { limit: 1500, sort: { createdAt: -1 } })

            res.status(200).json({ verificar: true, mens: "ok", data: result })
        }

        if (ciudad === '' && desde && hasta && texto) {
            console.log(desdeTexto,'desdeTexto')

            const result = await Envios.paginate(desdeTexto, { limit: 1500, sort: { createdAt: -1 } })

            res.status(200).json({ verificar: true, mens: "ok", data: result })
        }
        if (ciudad === '' && desde === '' && hasta === '' && texto) {
            console.log(textos,'textos')

            const result = await Envios.paginate(textos, { limit: 1500, sort: { createdAt: -1 } })

            res.status(200).json({ verificar: true, mens: "ok", data: result })
        }

        if (ciudad && desde === '' && hasta === '' && texto === '') {
            console.log(ciudads,"ciudad")

            const result = await Envios.paginate(ciudads, { limit: 1500, sort: { createdAt: -1 } })

            res.status(200).json({ verificar: true, mens: "ok", data: result })
        }

        if (ciudad === '' && desde && hasta && texto === '' ) {
            console.log(desdes,"desdes")

            const result = await Envios.paginate(desdes, { limit: 1500, sort: { createdAt: -1 } })

            res.status(200).json({ verificar: true, mens: "ok", data: result })
        }
        if (ciudad === '' && desde === '' && hasta === '' && texto === '') {

            res.status(200).json({ verificar: false, mens: "verifica el formulario" })

        }
*/
    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = BuscarRecepcionesFiltro