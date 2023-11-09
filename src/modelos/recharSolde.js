// modelo para guardar todas las recepciones de dinero
const { Schema, model, models } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const RecharSolde = new Schema({
    nameAdmin: { type: String,trim: true },
    idAdmin: { type: String, trim: true},
    phoneAdmin:{type:String,trim:true},
    interesAdmin: { type: Number, trim: true},    
    codeVeriryAdmin: { type: String, trim: true},
    nameConfSist: { type: String, trim: true },
    phoneConfSist: { type: String, trim: true },
    idConfSist: { type: String, trim: true},
    typeConfSist: { type: String, trim: true},
    quantSolde: { type: Number, trim: true},
    quantSoldeCount: { type: Number, trim: true},
    interesGlobal: {type: Number, trim: true},
    interesSocio: {type: Number, trim: true},
    fechaA:{type:Date ,trim:true},
    validarRecarga: { type: Boolean, trim: true},
    typeUser: { type: String, trim: true},
    activeRecarga: { type: Boolean, trim: true},
    codigo: { type:String, trim: true},
    idRecargado:{ type:String, trim: true},
    idCajaAdmin:{ type:String, trim: true},
    idMaster:{ type:String, trim: true},
    tipoDeRecarga:{ type:String, trim: true},//de caja a master, master a caja , de caja a caja, .....
    idCajaMaster:{ type:String, trim: true},



}, {
    timestamps: true
}
);

RecharSolde.plugin(mongoosePaginate)
module.exports = model("RecharSolde", RecharSolde)