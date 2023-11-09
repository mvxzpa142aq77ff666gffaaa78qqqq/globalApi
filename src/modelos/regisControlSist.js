// modelo para enviar dinero
const { Schema, model, models } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const fecha = new Date()

const RegisControlSist = new Schema({
    
    name: { type: String,trim: true },
    username: { type: String,trim: true },
    dip: { type: String, trim: true },
    phone: { type: String, trim: true },
    passw: { type: String, trim: true },
    activeCount: { type: Boolean, trim: true },
    codigoEntrada: { type: String, trim: true },
    typeUser: {type: String, trim: true},
    email: { type: String, trim: true },
    quantSolde: { type: Number, trim: true},
    quantSoldeRepar: { type: Number, trim: true},
    quantSoldeEfec: { type: Number, trim: true},
    quantSoldeRest: { type: Number, trim: true},
    quantSoldeRetirado: { type: Number, trim: true},
    quantSoldeEnviado: { type: Number, trim: true},
    lastSolde: { type: Number, trim: true},
    lastSoldeNameUser: { type: String, trim: true}, 
    lastSoldeRecharge: { type: Number, trim: true},
    interesGlobal: {type: Number, trim: true},
    interesSocio: {type: Number, trim: true},
    interesSocioE: {type: Number, trim: true},
    interesSocioR: {type: Number, trim: true},
    nameAdminRegister:{ type: String, trim: true},
    phoneAdminRegister:{ type: String, trim: true},
    iva: {type: Number, trim: true},
    nameBussnes: { type: String, trim: true},
    nif: { type: String, trim: true},
    totalComisiones: { type: Number, trim: true},
    gettoFriend: { type: String, trim: true},
    adress1: { type:String, trim: true},
    tipoDeRecarga: { type:String, trim: true},
    fechaA:{type:Date ,trim:true},
    adress2: { type:Array, trim: true},
    cashQuand: { type:Number, trim: true},
    cashQuandActive: { type:Number, trim: true},
    recargaDate:{type:Date,trim:true},
    acciones:{type:Array,trim:true},
    
    roles:[{
        ref:"Role",
        type:Schema.Types.ObjectId
    }]
}, {
    timestamps: true
}
);

RegisControlSist.plugin(mongoosePaginate)
module.exports = model("regisControlSist", RegisControlSist)