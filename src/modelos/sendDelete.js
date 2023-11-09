// modelo para enviar dinero
const { Schema, model, models } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const SendDelete = new Schema({
    
    nameAdminDelete: { type: String,trim: true },
    idAdminDelete: { type: String, trim: true},
    phoneAdminDelete: { type: String, trim: true },
    phoneAdminSend: { type: String, trim: true },
    idAdminSend: { type: String, trim: true },
    nameSend: { type: String,trim: true },
    nameRecep: { type: String, trim: true },
    phoneSend: { type: String, trim: true },
    phoneRecep: { type: String, trim: true },
    adressRecep: { type: String, trim: true},
    refSend: { type: String, trim: true},
    adressSend: { type: String, trim: true},
    quantSend: { type: Number, trim: true},
    dipSend: { type: String, trim: true},
    verifyRecp:{ type: Boolean, trim: true},
    description:{ type: String, trim: true},
    idCSMaster: { type:String, trim: true},
    phoneCSMaster: { type:String, trim: true},
    fechaA:{type:Date ,trim:true},

}, {
    timestamps: true
}
);

SendDelete.plugin(mongoosePaginate)
module.exports = model("SenDelete", SendDelete)