// modelo para para guardar los pagos
const { Schema, model, models } = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const Roles = new Schema({
    name: { type: String,trim: true },
    nameAdminRegister: { type: String,trim: true },
    phoneAdminRegister: { type: String,trim: true },
    porcentage: { type: Number, trim: true},

}, {
    timestamps: true
}
);

Roles.plugin(mongoosePaginate)
module.exports = model("Role", Roles)