const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")




/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */

const SendMoney = require("../../modelos/sends")
const RegisAdmin = require("../../modelos/regisAdmin")
const AdminRecep = require("../../modelos/recep")

const RegisControlSist = require("../../modelos/regisControlSist")

/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */

/**************modulo de comisiones ********************************/
const CalculoIntereces = require("../comisiones")
/*************************************************************** */

/****************modulo para generar claves **************************/
const Claves = require("../generarClaves")
/***************************************************** */


async function RetirarAdmins(req, res) {
    const { userPhone, nameAdmin, idAdmin, phoneRecep, nameRecep, dipRecep, quantRep, phoneSend, codeRecp } = req.body
    console.log(req.body, nameAdmin, idAdmin, phoneRecep, nameRecep, dipRecep, quantRep, phoneSend, codeRecp)

    const verifyIfAllOk = nameAdmin && idAdmin && phoneRecep && nameRecep && dipRecep && quantRep && phoneSend && codeRecp

    try {
        //FUNCION PARA CALCULAR COMISIONES

        if (verifyIfAllOk) {
            const verifyAdmin = await RegisAdmin.findById(idAdmin).populate({ path: "userMaster" })
            const verifyCajera = await RegisControlSist.findOne({ typeUser: 'Cajero' }).populate({ path: 'roles' })

            if (verifyAdmin !== null && verifyAdmin.activeAdmin) {

                const verifyCSMaster = await RegisControlSist.findById(verifyAdmin.idCSMaster).populate({ path: 'roles' })

                if (verifyCSMaster !== null && verifyCSMaster.activeCount) {
                    const verificar = await SendMoney.findOne({ codeRecp: codeRecp })

                    if (verificar !== null && verificar.verifyRecp === false) {
                        if (verificar.adressRecep === verifyAdmin.adress1) {
                            if (verifyAdmin.phone !== verificar.phoneAdmin) {
                                if (Number(verificar.quantSend) == Number(quantRep) && verificar.phoneSend == phoneSend && verificar.phoneRecep == phoneRecep) {
                                    const porcentage = Number(verifyCSMaster.roles[0].porcentage) ? Number(verifyCSMaster.roles[0].porcentage) : 0

                                    /******************************************************** */
                                    //CALCULO DE PORCENTAGES POR INTERVALOS DE PRECIOS
                                    const valoresInteres = CalculoIntereces(quantRep, verifyAdmin.userMaster[0].typeUser, porcentage)
                                    console.log(valoresInteres)
                                    const comision = Number(valoresInteres.total)
                                    const interesGlobals = valoresInteres.ig
                                    const iva = valoresInteres.iva
                                    const interesSocioE = Number(valoresInteres.isE)
                                    const interesSocioR = Number(valoresInteres.isR)
                                    /********************************************** */
                                    /************VOLVER A ENVIAR LOS DATOS DEL ADMIN ACTUALIZADOS */
                                    /*********************************************************** */
                                    //const dataAdmin = await RegisAdmin.findById(idAdmin)

                                    const adminSend = await RegisAdmin.findById(verificar.idAdmin)


                                    if (adminSend !== null) {

                                        const masterSend = await RegisControlSist.findById(adminSend.idCSMaster)

                                        if (masterSend !== null) {
                                            if (valoresInteres.verificar) {

                                                //CALCULAR PORCENTAGES Y ACTUALIZAR SOCIO  QUE HA ENVIADO Y SU MASTER

                                                //SOCIO

                                                const new_info2 = {
                                                    "interesGlobal": Number(adminSend.interesGlobal) - Number(interesSocioR),
                                                    //"quantSolde": Number(verifyAdmin.quantSolde)- Number(interesSocioR),

                                                }
                                                const new_update2 = await RegisAdmin.findByIdAndUpdate(verificar.idAdmin, new_info2)
                                                //MASTER

                                                /*
                                                const new_info4 = {
                                                    "interesGlobal": Number(masterSend.interesGlobal) - Number(interesSocioR),
                                                }

                                                const new_update4 = await RegisControlSist.findByIdAndUpdate(adminSend.idCSMaster, new_info4)
                                                */
                                                //cajera de global
                                                const new_info3 = {
                                                    "interesGlobal": Number(verifyCajera.interesGlobal) - Number(interesSocioR),

                                                }

                                                const new_update3 = await RegisControlSist.findByIdAndUpdate(verifyCajera._id, new_info3)

                                                //----------------------------------fin-----------------------------------------------------------------------


                                                //CALCULAR PORCENTAGES Y ACTUALIZAR SOCIO QUE HA HECHO EL RETIRO Y SU MASTER

                                                //SOCIO

                                                const new_info1 = {
                                                    "interesSocio": Number(verifyAdmin.interesSocio) + Number(interesSocioR),
                                                    "interesSocioR": Number(verifyAdmin.interesSocioR) + Number(interesSocioR),
                                                    "quantSolde": Number(verifyAdmin.quantSolde) + Number(quantRep),
                                                }
                                                const new_update1 = await RegisAdmin.findByIdAndUpdate(idAdmin, new_info1)

                                                //MASTER

                                                /*
                                                const new_info5 = {
                                                    "interesSocio": Number(verifyCSMaster.interesSocio) + Number(interesSocioR),
                                                    "interesSocioR": Number(verifyCSMaster.interesSocioR) + Number(interesSocioR),
                                                }
                                                
    
                                                const new_update5 = await RegisControlSist.findByIdAndUpdate(verifyAdmin.idCSMaster, new_info5)
                                                */
                                                //----------------------------------fin-------------------------------------------------------------------------


                                                //VERIFICAR QUE YA SE A COBRADO EL ENVIO Y ACTULIZAR LOS DATOS

                                                const new_info = {
                                                    "verifyRecp": true,
                                                    "refSend": "",
                                                    "codeRecp": "",
                                                    "interesGlobal": Number(verificar.interesGlobal) - Number(interesSocioR),
                                                }
                                                const new_update = await SendMoney.findByIdAndUpdate(verificar._id, new_info)

                                                /********************************************** */
                                                /************VOLVER A ENVIAR LOS DATOS DEL ADMIN ACTUALIZADOS */
                                                /*********************************************************** */
                                                const dataAdmin = await RegisAdmin.findById(idAdmin)

                                                const recepData = new AdminRecep()

                                                recepData.idAdminSend = verificar.idAdmin
                                                recepData.nameAdminSend = verificar.nameAdmin
                                                recepData.adressGettoRecep = verifyAdmin.gettoFriend
                                                recepData.comision = comision

                                                recepData.nameAdminRecep = verifyAdmin.name
                                                recepData.phoneAdminRecep = verifyAdmin.phone
                                                recepData.adressSend = verificar.adressAdmin
                                                recepData.idAdminRecep = idAdmin
                                                recepData.adressAdmin = verifyAdmin.adress1

                                                recepData.nameRecep = nameRecep
                                                recepData.phoneRecep = phoneRecep
                                                recepData.adressRecep = verificar.adressRecep
                                                recepData.dipRecep = dipRecep

                                                recepData.nameSend = verificar.nameSend
                                                recepData.phoneSend = phoneSend

                                                recepData.quantRecep = Number(quantRep)
                                                recepData.quantSend = Number(quantRep)
                                                recepData.interesSocio = Number(interesSocioR)
                                                recepData.interesGlobal = 0
                                                recepData.iva = 0
                                                recepData.verifyRecep = true
                                                recepData.codeVerificacion = codeRecp
                                                recepData.fechaA = new Date()

                                                recepData.idCSMaster = verifyAdmin.idCSMaster
                                                recepData.phoneCSMaster = verifyAdmin.phoneCSMaster

                                                const addData = await recepData.save()

                                                console.log(addData)

                                                res.status(200).json({ verificar: true, mens: "La recepcion se ha hecho con exito", "result": addData })

                                            } else {

                                                res.status(200).json({ verificar: false, mens: "Verifica la cantidad introducido" })

                                            }
                                        } else {
                                            res.status(200).json({ verificar: false, mens: "El master que ha realizado la operacion no ha sido encontrado" })

                                        }
                                    } else {

                                        res.status(200).json({ verificar: false, mens: "La caja que ha realizado la operacion no ha sido encontrado" })

                                    }


                                } else {
                                    res.status(200).json({ verificar: false, mens: "Verifica el monto o los telefonos introducido" })
                                }
                            } else {
                                res.status(200).json({ verificar: false, mens: "No estas autorizado para efectuar esta operacion" })
                            }
                        } else {
                            res.status(200).json({ verificar: false, mens: "No se puede hacer este retiro en esta ciudad" })
                        }
                    } else {
                        res.status(200).json({ verificar: false, mens: "El codigo no coincide o la transferencia ya fue cobrado" })
                    }
                } else {
                    res.status(200).json({ "verificar": false, "mens": "Cuenta bloqueada o no existe" })

                }
            } else {
                res.status(200).json({ verificar: false, mens: "No estas autorizado para esta accion" })

            }


        } else {
            res.status(200).json({ verificar: false, mens: "Revisa el formulario" })

        }
    } catch (error) {
        console.log(error)
        res.status(200).json({ verificar: false, mens: "hay un problema " })
    }
}

module.exports = RetirarAdmins