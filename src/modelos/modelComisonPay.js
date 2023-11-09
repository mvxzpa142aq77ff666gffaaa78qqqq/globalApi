// modelo para para guardar los pagos
const { Schema, model, models } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const ModelComisionPay = new Schema({
    nameContSist: { type: String,trim: true },
    idConfSist: { type: String, trim: true },
    phoneAdmin: { type: String,trim: true },
    nameAdmin: { type: String,trim: true },
    idAdmin: { type: String, trim: true},
    comision: { type: Number, trim: true},
    interesGlobal:{type:Number,trim:true},
    interesSocio:{type:Number,trim:true},
    iva:{type:Number,trim:true},
    active:{type:Boolean,trim:true},
    valide:{type:Boolean,trim:true},

}, {
    timestamps: true
}
);

ModelComisionPay.plugin(mongoosePaginate)
module.exports = model("ModelComisionPay", ModelComisionPay)