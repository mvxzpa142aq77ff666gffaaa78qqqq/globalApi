// modelo para para guardar los pagos
const { Schema, model, models } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const ModelInteresesPago = new Schema({
    phoneAdmin: { type: String,trim: true },
    nameAdmin: { type: String,trim: true },
    idAdmin: { type: String, trim: true},
    interesSocio: { type: Number, trim: true},
    interesGlobal: {type: Number, trim: true},
    interesSocio: {type: Number, trim: true},
    interesSocioE: {type: Number, trim: true},
    interesSocioR: {type: Number, trim: true},
    iva: {type: Number, trim: true},
}, {
    timestamps: true
}
);

ModelInteresesPago.plugin(mongoosePaginate)
module.exports = model("ModelInteresesPago", ModelInteresesPago)