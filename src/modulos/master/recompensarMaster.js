const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")





/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */


const Recompensar = require("../../modelos/modelPay")
const RegisControlSist = require("../../modelos/regisControlSist")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */



async function RecargarMaster(req, res) {

    const { userId, cantidad, idMaster, idRembolso,codigo } = req.body

    try {

        /************************************************************************** */
        //VERIFICAR SI EL NUMERO YA SE HA REGISTRADO ANTES
        /************************************************************** */
        const verifyCS = await RegisControlSist.findById(userId).populate({ path: 'roles' })
        const verifyBeneficiario = await RegisControlSist.findById(idMaster).populate({ path: 'roles' })
        const verifyCaja = await RegisControlSist.findOne({ typeUser: 'Cajero' }).populate({ path: 'roles' })
        const verifyRembolso = await Recompensar.findById(idRembolso)


        if (verifyCS !== null) {
            if (verifyCS.acciones.includes('recompensar_master') && (verifyCS.roles[0].name === 'super_admin' || verifyCS.roles[0].name === 'Gestor' || verifyCS.roles[0].name === 'Cajero' || verifyCS.roles[0].name === 'Atencion_al_cliente')) {
                if (verifyRembolso !== null) {
                    if (verifyRembolso.codigo == codigo) {
                        if (verifyBeneficiario !== null) {
    
                            if (verifyCaja !== null) {
                                if (verifyBeneficiario.quantSolde >= Number(verifyRembolso.quantSolde)) {
                                    //ACTUALIZAR LA CAJA DE LA EMPRESA
                                    const new_info_caja_admin = {
                                        "quantSolde": Number(verifyCaja.quantSolde) + Number(verifyRembolso.quantSolde),
                                        "quantSoldeRepar": Number(verifyCaja.quantSoldeRepar) - Number(verifyRembolso.quantSolde)
                                    }
                                    const new_update1 = await RegisControlSist.findByIdAndUpdate(verifyCaja._id, new_info_caja_admin)
        
                                    //ACTUALIZAR LA CUENTA DEL MASTER
                                    const new_info_master = {
                                        "quantSolde": Number(verifyBeneficiario.quantSolde) - Number(verifyRembolso.quantSolde),
                                        "lastSoldeNameUser": verifyCS.nameConfSist,
                                        "lastSoldeRecharge": - Number(verifyRembolso.quantSolde),
                                        "lastSolde": Number(verifyBeneficiario.quantSolde),
                                        "tipoDeRecarga": "Recompensa",
                                    }
                                    const new_update = await RegisControlSist.findByIdAndUpdate(verifyBeneficiario._id, new_info_master)
        
                                    //ACTUALIZAR EL REMBOLSO
                                    const new_info_rembolso = {
                                        'idConfSist' : verifyCS._id,
                                        'validar' : true,
                                        'nameConfSist' : verifyCS.name,
                                        'phoneConfSist' : verifyCS.phone,
                                        'typeConfSist' : verifyCS.roles[0].name,
                                        'quantSoldeCount' : Number(verifyBeneficiario.quantSolde),
                                    }
                                    const new_update_rembolso = await Recompensar.findByIdAndUpdate(idRembolso, new_info_rembolso)
        
                                    res.status(200).json({ verificar: true, mens: "Recompensado con exito" })
                                } else {
                                    res.status(200).json({ verificar: false, mens: "Saldo insuficiente en la cuenta del master" })
                                }
                            } else {
                                res.status(200).json({ verificar: false, mens: "No existe la cuenta de la caja general" })
                            }
                        } else {
                            res.status(200).json({ verificar: false, mens: "No existe la cuenta que quieres recargar" })
                        }
                    } else {
                        res.status(200).json({ verificar: false, mens: "El codigo no coinside" })

                    }
                } else {
                    res.status(200).json({ verificar: false, mens: "El rembolso no existe" })
 
                }
            } else {
                res.status(200).json({ verificar: false, mens: "No estas autorizado para esta accion" })
            }
        } else {
            res.status(200).json({ verificar: false, mens: "Recarga no validado" })

        }

    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema" })
    }
}

module.exports = RecargarMaster