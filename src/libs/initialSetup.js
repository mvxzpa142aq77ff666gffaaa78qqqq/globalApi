const Role = require("../modelos/roles")

const createRoles = async () =>{
    try {
        const count = await Role.estimatedDocumentCount()
        if (count > 0) return ;
        const values = await Promise.all([
            new Role({name:"super_admin"}).save(),
            new Role({
                name:"Master_GNOB",
                porcentage:0,

            }).save(),
            new Role({
                name:"Master_FINANCIADO",
                porcentage:25,

            }).save(),
            new Role({
                name:"Master_PREFINANCIADO",
                porcentage:25,

            }).save(),
            new Role({name:"Gestor"}).save(),
            new Role({name:"Cajero"}).save(),
            new Role({name:"Atencion_al_cliente"}).save(),
        ])

    } catch (error) {
    }
}

module.exports = createRoles

