const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET_TOKEN_GNOP } = require("../../config");
const secretToken = process.env.SECRET_TOKEN_GNOP



//crear el secret del token
// const secretToken = process.env.SECRET_TOKEN;

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */

const RegisAdmin = require("../../modelos/regisAdmin");

const RegisControlSist = require("../../modelos/regisControlSist");
const Role = require("../../modelos/roles")


const RenoverToken = async (req, res) => {
    const token = req.body.token;
    //console.log(token, secretToken);
    try {
        if (!token) {
            //console.log(t)
            return res.json({
                verify: false,
                verificarToken: true,
                mens: "token_expirado 4",
            });
        } else {

            const decoded = jwt.verify(token, secretToken);
            const id = decoded.id;
            const user1 = await RegisAdmin.findById(id).populate({ path: "userMaster" });
            //console.log(user1, decoded)
            const user2 = await RegisControlSist.findById(id).populate({ path: "roles" });
            if (user1) {
                const role = await Role.findOne({ name: user1.userMaster[0].typeUser })
                //console.log(role,user1,user1.userMaster[0])

                if (role) {
                    //creacion del token
                    const newToken = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + 60 * 2,
                        user: user1.name,
                        id: user1._id
                    }, secretToken)

                    /******************************************** */
                    //ENVIANDO LOS DATOS
                    /************************************** */
                    //console.log(verify)
                    res.status(200).json({ verify: true, userData: user1, token: newToken, validarLogin: true, porcentage: role.porcentage })
                } else {
                    return res.status(200).json({
                        verify: false,
                        verificarToken: true,
                        mens: "token_expirado 3",
                    });
                }

            } else {
                if (user2) {
                    //creacion del token
                    const newToken = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + 60 * 2,
                        user: user2.name,
                        id: user2._id
                    }, secretToken)

                    /******************************************** */
                    //ENVIANDO LOS DATOS
                    /************************************** */

                    //console.log(verify)
                    res.status(200).json({ verify: true, userData: user2, token: newToken, validarLogin: true })
                } else {
                    return res.status(200).json({
                        verify: false,
                        verificarToken: true,
                        mens: "token_expirado 2",
                    });
                }
            }
        }
    } catch (error) {
        console.log(error)
        return res.json({
            verify: false,
            verificarToken: true,
            mens: "token_expirado 1",
        });

    }
};

module.exports = RenoverToken;