// modelo para guardar todas las recepciones de dinero
const { Schema, model, models } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const interesASaldo = new Schema({
    nameAdmin: { type: String,trim: true },
    idAdmin: { type: String, trim: true},
    phoneAdmin:{type:String,trim:true},
    codeVeriryAdmin: { type: String, trim: true},
    nameConfSist: { type: String, trim: true },
    phoneConfSist: { type: String, trim: true },
    idConfSist: { type: String, trim: true},
    typeConfSist: { type: String, trim: true},
    cantidad: { type: Number, trim: true},
    cantidadSaldo: { type: Number, trim: true},
    fechaA:{type:Date ,trim:true},
    validar: { type: Boolean, trim: true},
    typeUser: { type: String, trim: true},
    activar: { type: Boolean, trim: true},
    codigo: { type:String, trim: true},
    idInteresSaldo:{ type:String, trim: true},
    idCajaAdmin:{ type:String, trim: true},
    idMaster:{ type:String, trim: true},
    idCajaMaster:{ type:String, trim: true},


}, {
    timestamps: true
}
);

interesASaldo.plugin(mongoosePaginate)
module.exports = model("interesASaldo", interesASaldo)