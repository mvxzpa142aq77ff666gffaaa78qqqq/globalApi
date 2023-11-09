// modelo para enviar dinero
const { Schema, model, models } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const RegisClient = new Schema({
    name: { type: String,trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    passw: { type: String, trim: true },
    codeCliente: { type: String, trim: true },
    activeCount: { type: Boolean, trim: true},
    quantSolde: { type: Number, trim: true},
    interesGlobal: {type: Number, trim: true},
    interesSocio: {type: Number, trim: true},
    typeUser: {type: String, trim: true},
}, {
    timestamps: true
}
);

RegisClient.plugin(mongoosePaginate)
module.exports = model("regisClient", RegisClient)