const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")





/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */


const Recompensar = require("../../modelos/modelPay")
const RegisControlSist = require("../../modelos/regisControlSist")
const Codigo = require("../generarClaves")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function SolicitarRecompensaMaster(req, res) {

    const { userId, cantidad, idMaster } = req.body

    let codigo = Codigo()


    try {

        /************************************************************************** */
        //VERIFICAR SI EL NUMERO YA SE HA REGISTRADO ANTES
        /************************************************************** */
        const verifyBeneficiario = await RegisControlSist.findById(idMaster).populate({ path: 'roles' })



        if (verifyBeneficiario !== null) {

            if (verifyBeneficiario.acciones.includes('solicitar_recompensa')) {

                if (verifyBeneficiario.quantSolde >= Number(cantidad)) {

                    //REGISTRAR LA RECARGA
                    const registData = new Recompensar()
                    registData.nameAdmin = verifyBeneficiario.name
                    registData.idAdmin = verifyBeneficiario._id
                    registData.phoneAdmin = verifyBeneficiario.phone
                    registData.typeUser = verifyBeneficiario.roles[0].name
                    registData.fechaA = new Date()
                    registData.tipoDeRecompensa = 'master'
                    registData.codigo = codigo

                    registData.idRecompensado = verifyBeneficiario._id
                    registData.validar = false
                    registData.quantSolde = Number(cantidad)

                    const addData = await registData.save()

                    console.log(addData)

                    res.status(200).json({ verificar: true, mens: "Tu cuenta acaba de ser recargada" })

                } else {
                    res.status(200).json({ verificar: false, mens: "Saldo insuficiente en la cuenta del master" })
                }

            } else {
                res.status(200).json({ verificar: false, mens: "Accion no permitida" })
            }
        } else {
            res.status(200).json({ verificar: false, mens: "No estas autorizado para esta accion" })
        }


    } catch (error) {
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = SolicitarRecompensaMaster