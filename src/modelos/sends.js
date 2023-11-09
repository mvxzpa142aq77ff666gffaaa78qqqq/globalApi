// modelo para enviar dinero
const { Schema, model, models } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const SendMoney = new Schema({
    nameAdmin: { type: String,trim: true },
    idAdmin: { type: String, trim: true},
    phoneAdmin: { type: String, trim: true },
    nameSend: { type: String,trim: true },
    nameRecep: { type: String, trim: true },
    phoneSend: { type: String, trim: true },
    phoneRecep: { type: String, trim: true },
    adressRecep: { type: String, trim: true},
    adressGettoSend: { type: String, trim: true},
    refSend: { type: String, trim: true},
    quantSend: { type: Number, trim: true},
    interesGlobal: {type: Number, trim: true},
    interesSocio: {type: Number, trim: true},
    iva: {type: Number, trim: true},
    comision: {type: Number, trim: true},
    dipSend: { type: String, trim: true},
    codeRecp:{ type: String, trim: true},
    adressAdmin:{ type: String, trim: true},
    verifyRecp:{ type: Boolean, trim: true},
    fechaA:{type:Date ,trim:true},
    idSubSocio:{ type: String, trim: true},
    phoneSubSocio:{ type: String, trim: true},
    codeRecpStadis:{ type: String, trim: true},
    idCSMaster: { type:String, trim: true},
    phoneCSMaster: { type:String, trim: true},
    phoneContSist: { type:String, trim: true},
    actualizadoPor: { type:String, trim: true},
}, {
    timestamps: true
}
);

SendMoney.plugin(mongoosePaginate)
module.exports = model("SendMoney", SendMoney)