const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET_TOKEN_GNOP } = require("../config");
const secretToken = process.env.SECRET_TOKEN_GNOP



//crear el secret del token
// const secretToken = process.env.SECRET_TOKEN;

/********************************* */
/**PARA IMPORTAR MODELOS*****************/
/********************************* */

const RegisAdmin = require("../modelos/regisAdmin");

const RegisControlSist = require("../modelos/regisControlSist");

const VerifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(token,secretToken);
  try {
    if (!token) {
      //console.log(t)
      return res.json({
        verifivar: false,
        verificarToken: true,
        mens: "token_expirado",
      });
    } else {
      
      const decoded = jwt.verify(token, secretToken);
      const id = decoded.id;
      const user1 = await RegisAdmin.findById(id);
      console.log(user1 ,decoded)
      const user2 = await RegisControlSist.findById(id);
      if (user1) {
        console.log('existe')
        next();
      } else {
        if (user2) {
          next();
        } else {
          return res.status(200).json({
            verifivar: false,
            verificarToken: true,
            mens: "token_expirado", 
          });
        }
      }
    }
  } catch (error) {
    console.log(error)
    return res.json({
      verifivar: false,
      verificarToken: true,
      mens: "token_expirado",
    });
    
  }
};

module.exports = VerifyToken;

