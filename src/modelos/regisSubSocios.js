// modelo para enviar dinero
const { Schema, model, models } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const RegisSubSocios = new Schema({
    name: { type: String,trim: true },
    dip: { type: String, trim: true },
    email: { type: String, trim: true },
    passw: { type: String, trim: true },
    phone: { type: String, trim: true },
    adress1: { type:String, trim: true},
    adress2: { type:Array, trim: true},
    codeVeriry: { type: String, trim: true},
    genero: { type: String, trim: true},
    idAdmin: { type: String, trim: true},
    phoneAdmin: { type: String, trim: true},
    nameAdmin: { type: String, trim: true},
    activeSubSocio: { type: Boolean, trim: true},
    quantSolde: { type: Number, trim: true},
    quantSoldeEfec: { type: Number, trim: true},
    quantSoldeRest: { type: Number, trim: true},
    lastSolde: { type: Number, trim: true},
    userName: { type: String, trim: true},
    lastSoldeNameUser: { type: String, trim: true},
    lastSoldeRecharge: { type: Number, trim: true},
    interesAdmin: {type: Number, trim: true},
    interesSubSocio: {type: Number, trim: true},
    iva: {type: Number, trim: true},
    typeUser: {type: String, trim: true},
    cobrar: {type: String, trim: true},
    recargaDate:{type:Date,trim:true},

}, {
    timestamps: true
}
);

RegisSubSocios.plugin(mongoosePaginate)
module.exports = model("regisSubSocios", RegisSubSocios)