// modelo para enviar dinero
const { Schema, model, models } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const SolicitudCash = new Schema({

    idContSist: { type: String, trim: true},
    nameContSist: { type: String, trim: true},
    typeUser: {type: String, trim: true},
    idCSMaster: { type:String, trim: true},
    phoneCSMaster: { type:String, trim: true},
    phoneContSist: { type:String, trim: true},
    cashQuand: { type:Number, trim: true},
    cashQuandActive: { type:Boolean, trim: true},

}, {
    timestamps: true
}
);

SolicitudCash.plugin(mongoosePaginate)
module.exports = model("SolicitudCash", SolicitudCash)