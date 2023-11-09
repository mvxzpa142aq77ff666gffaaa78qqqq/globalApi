// modelo para guardar todas las recepciones de dinero
const { Schema, model, models } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const Recep = new Schema({
    nameAdminSend: { type: String,trim: true },   
    idAdminSend: { type: String,trim: true },
    phoneAdminSend: { type: String,trim: true },
    adressGettoRecep: { type: String,trim: true },
    nameAdminRecep: { type: String,trim: true },
    codeVerifyAdminRecep: { type: String, trim: true},
    idAdminRecep: { type: String, trim: true},
    phoneAdminRecep: { type: String, trim: true },
    nameRecep: { type: String, trim: true },
    phoneRecep: { type: String, trim: true },
    adressRecep: { type: String, trim: true},
    adressSend: { type: String, trim: true},
    dipSend: { type: String, trim: true},
    nameSend: { type: String,trim: true },
    phoneSend: { type: String, trim: true },
    dipRecep: { type: String, trim: true},
    comision: {type: Number, trim: true},
    fechaA:{type:Date ,trim:true},
    codeVerificacion: { type: String, trim: true},
    quantSend: { type: Number, trim: true},
    quantRecep: { type: Number, trim: true},
    interesGlobal: {type: Number, trim: true},
    interesSocio: {type: Number, trim: true},
    adressAdmin:{ type: String, trim: true},
    iva: {type: Number, trim: true},
    dateRecep: { type: Date, trim: true},
    interesGlobal: {type: Number, trim: true},
    interesAdmin: { type: Number, trim: true},
    verifyRecep:{ type: Boolean, trim: true},
    idCSMaster: { type:String, trim: true},
    phoneCSMaster: { type:String, trim: true},

}, {
    timestamps: true
}
);

Recep.plugin(mongoosePaginate)
module.exports = model("AdminRecep", Recep)