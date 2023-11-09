// modelo para recargar la cuenta
const { Schema, model, models } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const RecharClient = new Schema({
    nameClient: { type: Array,trim: true },
    idClient: { type: String, trim: true },
    phoneClient: { type: String, trim: true },
    nameContSiste: { type: String, trim: true},
    idContSiste: { type: String, trim: true},
    quantSolt: { type: Number, trim: true},
    interesCliente:{type:Number,trim:true}

}, {
    timestamps: true
}
);

RecharClient.plugin(mongoosePaginate)
module.exports = model("RecharClient", RecharClient)