// modelo para guardar todas las recepciones de dinero
const { Schema, model, models } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const MovimientosMaster = new Schema({
    nameCaja: { type: String,trim: true },
    idCaja: { type: String, trim: true},
    phoneCaja:{type:String,trim:true},
    nameMaster: { type: String, trim: true },
    phoneMaster: { type: String, trim: true },
    typeCaja: { type: String, trim: true},
    quantSolde: { type: Number, trim: true},
    quantSoldeCount: { type: Number, trim: true},
    quantSoldeCaja: { type: Number, trim: true},
    fechaA:{type:Date ,trim:true},
    validar: { type: Boolean, trim: true},
    typeUserMaster: { type: String, trim: true},
    active: { type: Boolean, trim: true},
    idMaster:{ type:String, trim: true},
    tipoDeRecarga:{ type:String, trim: true},//de caja a master, master a caja , de caja a caja, .....
}, {
    timestamps: true
}
);

MovimientosMaster.plugin(mongoosePaginate)
module.exports = model("MovimientosMaster", MovimientosMaster)