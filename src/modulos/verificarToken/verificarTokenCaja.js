const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretToken = process.env.SECRET_TOKEN_GNOP



//crear el secret del token
// const secretToken = process.env.SECRET_TOKEN;

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */

const RegisAdmin = require("../../modelos/regisAdmin");

const RegisControlSist = require("../../modelos/regisControlSist");

const VerifyTokenNew = async (req, res) => {
    const { token } = req.body
    const tokens = req.headers;
    console.log(tokens)

    console.log(req.body, secretToken);
    try {
        if (!token) {
            //console.log(t)
            res.json({
                verifivar: false,
                verificarToken: true,
                mens: "token_expirado",
            });
        } else {

            const decoded = jwt.verify(token, secretToken);
            const id = decoded.id;
            const user1 = await RegisAdmin.findById(id);
            console.log(user1, decoded)
            const user2 = await RegisControlSist.findById(id);
            if (user1) {
                res.status(200).json({
                    verifivar: true,
                    verificarToken: true,
                    mens: "token_valido",
                });
            } else {
                res.status(200).json({
                    verifivar: false,
                    verificarToken: true,
                    mens: "token_expirado",
                });
            }
        }
    } catch (error) {
        console.log(error)
        res.json({
            verifivar: false,
            verificarToken: true,
            mens: "token_expirado",
        });

    }
};

module.exports = VerifyTokenNew;