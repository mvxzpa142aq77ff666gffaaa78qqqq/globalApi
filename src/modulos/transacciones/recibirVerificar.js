const bcrypt = require("bcrypt")

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */
const Envios = require("../../modelos/sends")
const RegisControlSist = require("../../modelos/regisControlSist")
const Recepciones = require("../../modelos/recep")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function VerificarEnvio(req, res) {
    const { phone,code,monto } = req.body
    //console.log(req.body)

    try {

        const result = await Envios.paginate({codeRecp:code }, { limit: 1, sort: { createdAt: -1 } })
        const verSiRecep = await Recepciones.findOne({quantRecep:Number(monto),codeVerificacion:code,phoneSend:phone})
        console.log(verSiRecep)
        //console.log(result.docs[0])
        if (verSiRecep === null) {
            if (result.docs[0]) {
                if (result.docs[0].phoneSend === phone) {
                    if (Number(result.docs[0].quantSend) === Number(monto)) {
    
                        res.status(200).json({ verificar: true, mens: "ok", data: result })
    
                    } else {
                        res.status(200).json({ verificar: false, mens: "Verifica el monto"})
    
                    }
                } else {
                    res.status(200).json({ verificar: false, mens: "verifica el telefono"})
                }
    
            } else {
                res.status(200).json({ verificar: false, mens: "Verifica el codigo" })
    
            } 
        } else {
            res.status(200).json({ verificar: false, mens: "El envio ya se ha cobrado",data: verSiRecep })

        }


    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = VerificarEnvio