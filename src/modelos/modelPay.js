// modelo para para guardar los pagos
const { Schema, model, models } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const fecha = new Date()

const ModelPay = new Schema({
    nameAdmin: { type: String,trim: true },
    idAdmin: { type: String, trim: true},
    phoneAdmin:{type:String,trim:true},
    nameConfSist: { type: String, trim: true },
    phoneConfSist: { type: String, trim: true },
    idConfSist: { type: String, trim: true},
    typeConfSist: { type: String, trim: true},
    quantSolde: { type: Number, trim: true},
    quantSoldeCount: { type: Number, trim: true},
    interesGlobal:{type:Number,trim:true},
    fechaA:{type:Date},   
    interesSocio:{type:Number,trim:true},
    cantidadSaldo: { type: Number, trim: true},
    validar: { type: Boolean, trim: true},
    typeUser: { type: String, trim: true},
    activar: { type: Boolean, trim: true},
    codigo: { type:String, trim: true},
    idRecompensado:{ type:String, trim: true},
    tipoDeRecompensa:{ type:String, trim: true},
    idCajaAdmin:{ type:String, trim: true},
    idCajaMaster:{ type:String, trim: true},
    idMaster:{ type:String, trim: true},
    codigo:{ type:String, trim: true},

}, {
    timestamps: true
}
);

ModelPay.plugin(mongoosePaginate)
module.exports = model("modelRecompesas", ModelPay)