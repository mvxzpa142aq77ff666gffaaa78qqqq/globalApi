const express = require("express")
const path = require("path")
const cloudinary = require("cloudinary")
const fs = require("fs-extra")
const passport = require("passport")
const route = express.Router()
const bcrypt = require("bcrypt")
const { truncate } = require("fs")
const nodemailer = require("nodemailer");
const twilio = require("twilio")
const sharp = require("sharp");
const jwt = require("jsonwebtoken")


//Twilio credentials

const accountSid = process.env.TWILIO_SSID_GNOP;
const authToken = process.env.AUTH_TOKEN_GNOP;
//const client = require('twilio')(accountSid, authToken);

//crear el secret del token
const secretToken = process.env.SECRET_TOKEN_GNOP





/********************************* */
/**FIN DE IMPORTAR MODELOS*****************/
/********************************* */

/**************modulo de comisiones ********************************/
const CalculoIntereces = require("../modulos/comisiones")
/*************************************************************** */

/****************modulo para generar claves **************************/
const Claves = require("../modulos/generarClaves")
/***************************************************** */




//-----midleware ----------------
const VerifyTokens = require("../midleware/verifyToken");

//--------------------------------------------------------

/************************************************************ */
/********* Init route ***************************** */
/***************************************************************** */

const InitRout = require("../modulos/initRoute");
route.post("/",VerifyTokens, async (req, res) => {
  //console.log(req.id)
  await InitRout(req, res);
});

/************************************************************ */


/************************************************************ */
/********* Ruta para crear roles ***************************** */
/***************************************************************** */

const CrearRoles = require("../modulos/roles/registerRole");
route.post("/crear_roles",VerifyTokens, async (req, res) => {
  //console.log(req.id)
  await CrearRoles(req, res);
});

/************************************************************ */

/************************************************************ */
/********* Ruta para crear roles ***************************** */
/***************************************************************** */

const ObtenerRoles = require("../modulos/roles/obtenerRoles");
route.get("/obtener_roles",VerifyTokens, async (req, res) => {
  await ObtenerRoles(req, res);
});

/************************************************************ */

/************************************************************ */
/********* Ruta para actualizar roles ***************************** */
/***************************************************************** */

const ActualizarRoles = require("../modulos/roles/actualizarRoles");
route.post("/update_role",VerifyTokens, async (req, res) => {
  await ActualizarRoles(req, res);
});

/************************************************************ */


/************************************************************ */
/********* Ruta para borrar roles ***************************** */
/***************************************************************** */

const BorrarRoles = require("../modulos/roles/eliminarRoles");
route.post("/delete_role",VerifyTokens, async (req, res) => {
  await BorrarRoles(req, res);
});

/************************************************************ */


/***********************  ADMINISTRADORES  **********************************  */


/************************************************************ */
/********* Ruta para regsitrar super admin  ***************************** */
/***************************************************************** */

const RegistrarSuperAdmins = require("../modulos/admin/registrarSuperAdmin");
route.post("/registrar_super_admin",VerifyTokens, async (req, res) => {
  await RegistrarSuperAdmins(req, res);
});


/************************************************************ */
/********* Ruta para registrar los admin  ***************************** */
/***************************************************************** */

const RegistrarAdmins = require("../modulos/admin/adminRegister");
route.post("/registrar_user_admin",VerifyTokens, async (req, res) => {
  await RegistrarAdmins(req, res);
});


/************************************************************ */
/********* Ruta para el login de los admin y los masters  ***************************** */
/***************************************************************** */

const IniciarAdminMaster = require("../modulos/login/iniciarSesionAdminMaster");
route.post("/iniciarSesion", async (req, res) => {
  await IniciarAdminMaster(req, res);
});



/************************************************************ */
/********* Ruta para obtener los admin  ***************************** */
/***************************************************************** */

const ObtenerAdmins = require("../modulos/admin/obtenerAdmin");
route.get("/obtener_users_admin",VerifyTokens, async (req, res) => {
  await ObtenerAdmins(req, res);
});

/************************************************************ */
/********* Ruta para obtener los informacion de la cuelta del 
            cajero del administracion  ***************************** */
/***************************************************************** */

const ObtenerInfoCajaAdmin = require("../modulos/admin/obtenerInfoCajaAdmin");
route.get("/obtener_info_caja_admins",VerifyTokens, async (req, res) => {
  await ObtenerInfoCajaAdmin(req, res);
});

/************************************************************ */
/********* Ruta para recargar la cuenta de la caja admin ***************************** */
/***************************************************************** */

const RecargarCajaAdmin = require("../modulos/admin/recargarCajaAdmin");
route.post("/recargar_caja_admin",VerifyTokens, async (req, res) => {
  await RecargarCajaAdmin(req, res);
});

/************************************************************ */
/********* Ruta para obtener todas las recargas hechas a la caja admin ***************************** */
/***************************************************************** */

const ObtenerRecargarCajaAdmin = require("../modulos/admin/obtenerRecargasCajaAdmin");
route.get("/obtener_recargar_caja_admin",VerifyTokens, async (req, res) => {
  await ObtenerRecargarCajaAdmin(req, res);
});

/************************************************************ */
/********* Ruta para pasar los intereses de la caja admin a saldo ***************************** */
/***************************************************************** */

const InteresesASaldoCajaAdmin = require("../modulos/admin/interesASaldoCajaAdmin");
route.post("/intereses_a_saldo_caja_admin",VerifyTokens, async (req, res) => {
  await InteresesASaldoCajaAdmin(req, res);
});


/************************************************************ */
/********* Ruta para obtener interes a saldo de la caja admin ***************************** */
/***************************************************************** */

const ObtenerInteresesASaldoCajaAdmin = require("../modulos/admin/obtenerInteresASaldoCajaAdmin");
route.get("/get_interes_a_saldo_caja_admin",VerifyTokens, async (req, res) => {
  await ObtenerInteresesASaldoCajaAdmin(req, res);
});


/************************************************************ */
/********* Ruta para pasar la iva a saldo caja admin***************************** */
/***************************************************************** */

const IvaASaldoCajaAdmin = require("../modulos/admin/ivaASaldoCajaAdmin");
route.post("/iva_a_saldo_caja_admin",VerifyTokens, async (req, res) => {
  await IvaASaldoCajaAdmin(req, res);
});

/************************************************************ */
/********* Ruta para obtener interes a saldo de la caja admin ***************************** */
/***************************************************************** */

const ObtenerIvaASaldoCajaAdmin = require("../modulos/admin/obtenerIvaASaldoCajaAdmin");
route.get("/iva_a_saldo_caja_admin",VerifyTokens, async (req, res) => {
  await ObtenerIvaASaldoCajaAdmin(req, res);
});


/************************************************************ */
/********* Ruta para registrar recompensas ***************************** */
/***************************************************************** */

const RecompensasCajaAdmin = require("../modulos/admin/recompensasCajaAdmin");
route.post("/recompensas_caja_admin",VerifyTokens, async (req, res) => {
  await RecompensasCajaAdmin(req, res);
});

/************************************************************ */
/********* Ruta para registrar recompensas ***************************** */
/***************************************************************** */

const ObtenerRecompensasCajaAdmin = require("../modulos/admin/obtenerRecompensasCajaAdmin");
route.get("/get_recomp_caja_admin",VerifyTokens, async (req, res) => {
  await ObtenerRecompensasCajaAdmin(req, res);
});


/************************************************************ */
/********* Ruta para actualizar los admin  ***************************** */
/***************************************************************** */

const ActualizarAdmins = require("../modulos/admin/actualizarAdmins");
route.post("/actualizar_users_admin",VerifyTokens, async (req, res) => {
  await ActualizarAdmins(req, res);
});


/************************************************************ */
/********* Ruta para borrar los admin  ***************************** */
/***************************************************************** */

const BorrarAdmins = require("../modulos/admin/borrarAdmin");
route.post("/delete_users_admin",VerifyTokens, async (req, res) => {
  await BorrarAdmins(req, res);
});



/***********************  FIN DE LOS ADMINISTRADORES  **********************************  */




/*************** OBTENER INFORMACION PARA LA HOME PAGE***************** */


const ObtenerInfoHome = require("../modulos/dataHome/getDataHome");
route.get("/get_info_home",VerifyTokens, async (req, res) => {
  await ObtenerInfoHome(req, res);
});

const ObtenerInfoHomeMaster = require("../modulos/dataHome/getDataHomeMaster");
route.get("/get_info_home_master/:id",VerifyTokens, async (req, res) => {
  await ObtenerInfoHomeMaster(req, res);
});

const ObtenerInfoHomeCaja = require("../modulos/dataHome/getDataHomeCaja");
route.get("/get_info_home_caja/:id",VerifyTokens, async (req, res) => {
  await ObtenerInfoHomeCaja(req, res);
});





























/*************** FIN OBTENER INFORMACION PARA LA HOME PAGE***************** */



/***********************  MASTERS  **********************************  */



/************************************************************ */
/********* Ruta para registrar los masters  ***************************** */
/***************************************************************** */

const RegistrarMasters = require("../modulos/master/registrarMaster");
route.post("/registrar_masters",VerifyTokens, async (req, res) => {
  await RegistrarMasters(req, res);
});

/************************************************************ */
/********* Ruta para obtener los masters  ***************************** */
/***************************************************************** */

const ObtenerMasters = require("../modulos/master/obtenerMasters");
route.get("/obtener_masters",VerifyTokens, async (req, res) => {
  await ObtenerMasters(req, res);
});


/************************************************************ */
/********* Ruta para actualizar los masters  ***************************** */
/***************************************************************** */

const ActualizarMasters = require("../modulos/master/actualizarMasters");
route.post("/actualizar_masters",VerifyTokens, async (req, res) => {
  await ActualizarMasters(req, res);
});

/******************************************************************************** */
/****** OBTENER INFORMACION DE UN MASTER EN PARTICULAR***************** */
/*********************************************************************************** */
const ObtenerInfoMaster = require("../modulos/master/obtenerInfoMaster");
route.get(`/obtener_info_master/:id`,VerifyTokens, async (req, res) => {
  await ObtenerInfoMaster(req, res);
});

/******************************************************************************** */
/****** OBTENER LAS RECARGAS DE UN MASTER ***************** */
/*********************************************************************************** */
const ObtenerRecargasMaster = require("../modulos/master/obtenerRecargasDeUnMaster");
route.get(`/obtener_recargas_master/:id`,VerifyTokens, async (req, res) => {
  await ObtenerRecargasMaster(req, res);
});

/******************************************************************************** */
/****** OBTENER LAS RECARGAS POR ID MASTER ***************** */
/*********************************************************************************** */
const ObtenerRecargasIdMaster = require("../modulos/flujoDeDinero/obtenerRecargasPorIdMaster");
route.get(`/obtener_recargas_id_master/:id`,VerifyTokens, async (req, res) => {
  await ObtenerRecargasIdMaster(req, res);
});

/******************************************************************************** */
/****** RECARGAR A UN MASTER ***************** */
/*********************************************************************************** */
const RecargarAUnMaster = require("../modulos/master/recargarMaster");
route.post(`/recargar_a_un_master`,VerifyTokens, async (req, res) => {
  await RecargarAUnMaster(req, res);
});


/******************************************************************************** */
/****** RECOMPENSAR A UN MASTER ***************** */
/*********************************************************************************** */
const RecompensarAUnMaster = require("../modulos/master/recompensarMaster");
route.post(`/recompensar_a_un_master`,VerifyTokens, async (req, res) => {
  await RecompensarAUnMaster(req, res);
});
/******************************************************************************** */
/****** ENVIAR SOLICITUD PARA RECOMPENSAR A UN MASTER ***************** */
/*********************************************************************************** */
const SolicitarRecompensaMaster = require("../modulos/master/solicitarRecompensaMaster");
route.post(`/solicitud_recompensar_a_un_master`,VerifyTokens, async (req, res) => {
  await SolicitarRecompensaMaster(req, res);
});
/******************************************************************************** */
/****** OBTENER RECOMPENSAS DE UN MASTER ***************** */
/*********************************************************************************** */
const ObtenerRecompensasMaster = require("../modulos/master/obtenerRecompensasMaster");
route.get(`/obtener_recompensas_master/:id`,VerifyTokens, async (req, res) => {
  await ObtenerRecompensasMaster(req, res);
});

/******************************************************************************** */
/****** OBTENER RECOMPENSAS TODAS ***************** */
/*********************************************************************************** */
const ObtenerRecompensasTodas = require("../modulos/master/obtenerRecompensasTodas");
route.get(`/obtener_recompensas_todas`,VerifyTokens, async (req, res) => {
  await ObtenerRecompensasTodas(req, res);
});

/******************************************************************************** */
/****** CONVERTIR INTERES A SALDO DE UN MASTER ***************** */
/*********************************************************************************** */
const InteresASaldoMaster = require("../modulos/master/interesASaldoDeUnMaster");
route.post(`/interes_a_saldo_master`,VerifyTokens, async (req, res) => {
  await InteresASaldoMaster(req, res);
});


/******************************************************************************** */
/****** OBTENER INTERESES CONVERTIDOS A SALDO DE UN MASTER ***************** */
/*********************************************************************************** */
const ObtenerInteresesASaldoMaster = require("../modulos/master/obtenerinteresASaldoDeUnMaster");
route.get(`/obtener_interes_a_saldo_master/:id`,VerifyTokens, async (req, res) => {
  await ObtenerInteresesASaldoMaster(req, res);
});


/******************************************************************************** */
/****** ACTIVAR DESACTIVAR MASTER  Y ADMIN ***************** */
/*********************************************************************************** */
const ActiveDesactiveMasterAdmin = require("../modulos/master/activeDesactiveMasterAdmin");
route.post(`/activar_desactivar_master_admin`,VerifyTokens, async (req, res) => {
  await ActiveDesactiveMasterAdmin(req, res);
});

/******************************************************************************** */
/****** ACTIVAR DESACTIVAR CAJA***************** */
/*********************************************************************************** */
const ActiveDesactiveCaja = require("../modulos/master/activeDesactiveCaja");
route.post(`/activar_desactivar_caja`,VerifyTokens, async (req, res) => {
  await ActiveDesactiveCaja(req, res);
});







/***********************  FIN DE LOS MASTERS  **********************************  */



/***********************  CAJAS  **********************************  */

/************************************************************ */
/********* Ruta para registrar las cajas  ***************************** */
/***************************************************************** */

const RegistrarCaja = require("../modulos/caja/registrarCajas");
route.post("/registrar_caja",VerifyTokens, async (req, res) => {
  await RegistrarCaja(req, res);
});

/************************************************************ */
/********* Ruta para obtener todas las cajas  ***************************** */
/***************************************************************** */

const ObtenerTodasLasCajas = require("../modulos/caja/obtenerTodasLasCajas");
route.get("/obtener_todas_cajas",VerifyTokens, async (req, res) => {
  await ObtenerTodasLasCajas(req, res);
});

/************************************************************ */
/********* Ruta para actualizar caja  ***************************** */
/***************************************************************** */

const ActualizarCajas = require("../modulos/caja/actualizarCajas");
route.post("/actualizar_cajas",VerifyTokens, async (req, res) => {
  await ActualizarCajas(req, res);
});

/************************************************************ */
/********* Ruta para obtener cajas de un master en particular   ***************************** */
/***************************************************************** */

const ObtenerCajasMaster = require("../modulos/caja/obtenerCajasDeUnMaster");
route.get("/obtener_cajas_master/:id",VerifyTokens, async (req, res) => {
  await ObtenerCajasMaster(req, res);
});

/************************************************************ */
/********* Interes a saldo caja   ***************************** */
/***************************************************************** */

const InteresAsaldoCaja = require("../modulos/caja/interesAsaldoCaja");
route.post("/interes_a_saldo_caja",VerifyTokens, async (req, res) => {
  await InteresAsaldoCaja(req, res);
});

/************************************************************ */
/********* Obtener Interes a saldo caja   ***************************** */
/***************************************************************** */

const ObtenerInteresesASaldoCaja = require("../modulos/caja/obtenerInteresesASaldoCaja");
route.get("/obtener_interes_a_saldo_caja/:id",VerifyTokens, async (req, res) => {
  await ObtenerInteresesASaldoCaja(req, res);
});


/************************************************************ */
/********* Ruta para obtener cajas por ID   ***************************** */
/***************************************************************** */

const ObtenerCajasId = require("../modulos/caja/obtenerCajaId");
route.get("/obtener_cajas_id/:id",VerifyTokens, async (req, res) => {
  await ObtenerCajasId(req, res);
});

/************************************************************ */
/********* Ruta para recargar master   ***************************** */
/***************************************************************** */

const RecargarCajaMaster = require("../modulos/caja/recargarCajaMaster");
route.post("/recargar_caja_master",VerifyTokens, async (req, res) => {
  await RecargarCajaMaster(req, res);
});

/************************************************************ */
/********* Ruta de caja master a master   ***************************** */
/***************************************************************** */

const DeCajaMaster = require("../modulos/caja/recargarDeCajaAMaster");
route.post("/de_caja_a_master",VerifyTokens, async (req, res) => {
  await DeCajaMaster(req, res);
});

/************************************************************ */
/********* Iniciar sesion caja   ***************************** */
/***************************************************************** */

const IniciarSesionCaja = require("../modulos/login/iniciarSesionCaja");
route.post("/iniciar_caja", async (req, res) => {
  await IniciarSesionCaja(req, res);
});
/************************************************************ */
/********* Obtener recargas por id caja  ****************************************** */
/***************************************************************** */
const ObtenerRecargasPorIdCaja = require("../modulos/flujoDeDinero/obtenerRecargasPorIdCaja");
route.get("/obtener_recargas_por_id_caja/:id",VerifyTokens, async (req, res) => {
  await ObtenerRecargasPorIdCaja(req, res);
});




/***********************  CAJAS FIN  **********************************  */







/********************************************************************* */
/****************  TRANSACCIONES ******************************* */
/********************************************************************* */

/************************************************************ */
/********* Ruta para obtener envios de un master en particular   ***************************** */
/***************************************************************** */
const ObtenerEnviosMaster = require("../modulos/transacciones/obtenerEnviosMaster");
route.get("/obtener_envios_master/:id",VerifyTokens, async (req, res) => {
  await ObtenerEnviosMaster(req, res);
});


/************************************************************ */
/********* Ruta para obtener recepciones de un master en particular   ***************************** */
/***************************************************************** */
const ObtenerRecepcionesMaster = require("../modulos/transacciones/obtenerRecepcionesMaster");
route.get("/obtener_recepciones_master/:id",VerifyTokens, async (req, res) => {
  await ObtenerRecepcionesMaster(req, res);
});

/************************************************************ */
/********* Ruta para obtener recepciones de un master en particular   ***************************** */
/***************************************************************** */
const ObtenerTodosLosEnvioa = require("../modulos/transacciones/obtenerTodosLosEnvios");
route.get("/envios_todos",VerifyTokens, async (req, res) => {
  await ObtenerTodosLosEnvioa(req, res);
});


/************************************************************ */
/********* Ruta para obtener envios pendientes todos   ***************************** */
/***************************************************************** */
const ObtenerEnviosPendientesTodos = require("../modulos/transacciones/obtenerEnviosPendientesTodos");
route.get("/envios_pendientes_todos",VerifyTokens, async (req, res) => {
  await ObtenerEnviosPendientesTodos(req, res);
});
/************************************************************ */
/********* Ruta para obtener envios pendientes master   ***************************** */
/***************************************************************** */
const ObtenerEnviosPendientesMaster = require("../modulos/transacciones/obtenerEnviosPendientesMaster");
route.get("/envios_pendientes_master/:id",VerifyTokens, async (req, res) => {
  await ObtenerEnviosPendientesMaster(req, res);
});
/************************************************************ */
/********* Ruta para obtener renvios pendientes todos   ***************************** */
/***************************************************************** */
const FiltrarEnviosPendientesTodos = require("../modulos/transacciones/filtrarEnviosPendientesTodos");
route.post("/filtrar_envios_pendientes_todos",VerifyTokens, async (req, res) => {
  await FiltrarEnviosPendientesTodos(req, res);
});
/************************************************************ */
/********* Ruta para filtrar envios pendientes master   ***************************** */
/***************************************************************** */
const FiltrarEnviosPendientesMaster = require("../modulos/transacciones/filtrarEnviosPendientesMaster");
route.post("/filtrar_envios_pendientes_master",VerifyTokens, async (req, res) => {
  await FiltrarEnviosPendientesMaster(req, res);
});
/************************************************************ */
/********* Ruta para obtener envios cancelados todos  ***************************** */
/***************************************************************** */
const ObtenerEnviosCanceladosTodos = require("../modulos/transacciones/obtenerEnviosCanceladosTodos");
route.get("/envios_cancelados_todos",VerifyTokens, async (req, res) => {
  await ObtenerEnviosCanceladosTodos(req, res);
});
/************************************************************ */
/********* Ruta para obtener envios cancelados todos  ***************************** */
/***************************************************************** */
const FiltrarEnviosCanceladosTodos = require("../modulos/transacciones/filtrarEnviosCanceladosTodos");
route.post("/filtrar_envios_cancelados_todos",VerifyTokens, async (req, res) => {
  await FiltrarEnviosCanceladosTodos(req, res);
});
/************************************************************ */
/********* Ruta para obtener envios cancelados todos  ***************************** */
/***************************************************************** */
const FiltrarEnviosCanceladosMaster = require("../modulos/transacciones/filtrarEnviosCanceladosMaster");
route.post("/filtrar_envios_cancelados_master",VerifyTokens, async (req, res) => {
  await FiltrarEnviosCanceladosMaster(req, res);
});
/************************************************************ */
/********* Ruta para obtener envios cancelados master   ***************************** */
/***************************************************************** */
const ObtenerEnviosCanceladosMaster = require("../modulos/transacciones/obtenerEnviosCanceladosMaster");
route.get("/envios_cancelados_master/:id",VerifyTokens, async (req, res) => {
  await ObtenerEnviosCanceladosMaster(req, res);
});
/************************************************************ */
/********* Ruta para obtener envios filtrados caja   ***************************** */
/***************************************************************** */
const BuscarEnvioFiltro = require("../modulos/transacciones/buscarEnvioFiltro");
route.post("/envios_filtrados_caja",VerifyTokens, async (req, res) => {
  await BuscarEnvioFiltro(req, res);
});

/************************************************************ */
/********* Ruta para obtener envios filtrados master   ***************************** */
/***************************************************************** */
const BuscarEnvioFiltroMaster = require("../modulos/transacciones/buscarEnviosFiltroMaster");
route.post("/envios_filtrados_master",VerifyTokens, async (req, res) => {
  await BuscarEnvioFiltroMaster(req, res);
});
/************************************************************ */
/********* Ruta para obtener envios filtrados admin   ***************************** */
/***************************************************************** */
const BuscarEnvioFiltroAdmin = require("../modulos/transacciones/buscarEnviosFiltroAdmin");
route.post("/envios_filtrados_admin",VerifyTokens, async (req, res) => {
  await BuscarEnvioFiltroAdmin(req, res);
});
/************************************************************ */
/********* Ruta para obtener recepciones filtrados caja   ***************************** */
/***************************************************************** */
const BuscarRecepcionesFiltro = require("../modulos/transacciones/buscarRecepcionesFiltro");
route.post("/recepciones_filtrados_caja",VerifyTokens, async (req, res) => {
  await BuscarRecepcionesFiltro(req, res);
});
/************************************************************ */
/********* Ruta para obtener recepciones filtrados master   ***************************** */
/***************************************************************** */
const BuscarRecepcionesFiltroMaster = require("../modulos/transacciones/buscarRecepcionesFiltroMaster");
route.post("/recepciones_filtrados_master",VerifyTokens, async (req, res) => {
  await BuscarRecepcionesFiltroMaster(req, res);
});
/************************************************************ */
/********* Ruta para obtener recepciones filtrados admin   ***************************** */
/***************************************************************** */
const BuscarRecepcionesFiltroAdmin = require("../modulos/transacciones/buscarRecepcionesFiltroAdmin");
route.post("/recepciones_filtrados_admin",VerifyTokens, async (req, res) => {
  await BuscarRecepcionesFiltroAdmin(req, res);
});
/************************************************************ */
/********* Ruta para obtener recepciones de un master en particular   ***************************** */
/***************************************************************** */
const ObtenerTodasLasRecepciones = require("../modulos/transacciones/obtenerTodasLasRecepciones");
route.get("/recepciones_todas",VerifyTokens, async (req, res) => {
  await ObtenerTodasLasRecepciones(req, res);
});

/************************************************************ */
/********* Ruta para obtener recepciones por ID de la caja de un master  ***************************** */
/***************************************************************** */

const RecepcionesCajaMaster = require("../modulos/transacciones/obtenerRecepcionesCajaMaster");
route.get("/obtener_recepciones_caja_master/:id",VerifyTokens, async (req, res) => {
  await RecepcionesCajaMaster(req, res);
});


/************************************************************ */
/********* Ruta para obtener envios por ID de la caja de un master  ***************************** */
/***************************************************************** */

const EnviosCajaMaster = require("../modulos/transacciones/obtenerEnviosCajaMaster");
route.get("/obtener_envios_caja_master/:id",VerifyTokens, async (req, res) => {
  await EnviosCajaMaster(req, res);
});


/************************************************************ */
/********* Ruta para obtener buscar un envio   ***************************** */
/***************************************************************** */
const BuscarEnvios = require("../modulos/transacciones/buscarEnvios");
route.post("/buscar_envios",VerifyTokens, async (req, res) => {
  await BuscarEnvios(req, res);
});

/************************************************************ */
/********* Ruta para enviar   ***************************** */
/***************************************************************** */
const Enviar = require("../modulos/transacciones/enviar");
route.post("/enviar",VerifyTokens, async (req, res) => {
  await Enviar(req, res);
});

/************************************************************ */
/********* Ruta para actualizar envios   ***************************** */
/***************************************************************** */
const ActualizarEnvio = require("../modulos/transacciones/actualizarEnvio");
route.post("/actualizarEnviar",VerifyTokens, async (req, res) => {
  await ActualizarEnvio(req, res);
});

/************************************************************ */
/********* Ruta para actualizar envios master   ***************************** */
/***************************************************************** */
const ActualizarEnvioMaster = require("../modulos/transacciones/actualizarEnviosMaster");
route.post("/actualizarEnviarMaster",VerifyTokens, async (req, res) => {
  await ActualizarEnvioMaster(req, res);
});
/************************************************************ */
/********* Ruta para actualizar envios admin   ***************************** */
/***************************************************************** */
const ActualizarEnvioAdmin = require("../modulos/transacciones/actualizarEnvioAdmin");
route.post("/actualizarEnviarAdmin",VerifyTokens, async (req, res) => {
  await ActualizarEnvioAdmin(req, res);
});

/************************************************************ */
/********* Ruta para cancelar envios   ***************************** */
/***************************************************************** */
const CancelarEnvio = require("../modulos/transacciones/cancelarEnvio");
route.post("/cancelarEnviar",VerifyTokens, async (req, res) => {
  await CancelarEnvio(req, res);
});


/************************************************************ */
/********* Ruta para obtener envios cancelados   ***************************** */
/***************************************************************** */
const ObtenerEnviosCancelados = require("../modulos/transacciones/obtenerEnviosCancelados");
route.get("/obtenerEnviosCancelados/:id",VerifyTokens, async (req, res) => {
  await ObtenerEnviosCancelados(req, res);
});


/************************************************************ */
/********* Ruta para verificar envio para recibir   ***************************** */
/***************************************************************** */
const VerificarEnvios = require("../modulos/transacciones/recibirVerificar");
route.post("/verificarEnvio",VerifyTokens, async (req, res) => {
  await VerificarEnvios(req, res);
});

/************************************************************ */
/********* Ruta para realizar pago del envio   ***************************** */
/***************************************************************** */
const Recibir = require("../modulos/transacciones/recibir");
route.post("/recibir",VerifyTokens, async (req, res) => {
  await Recibir(req, res);
});


































/********************************************************************* */
/**************** FLUGO DE DINERO ******************************* */
/********************************************************************* */

/************************************************************ */
/********* Obtener todas las recargas   ****************************************** */
/***************************************************************** */
const ObtenerTodasLasRecargas = require("../modulos/flujoDeDinero/obtenerRecargasTodas");
route.get("/todas_las_recargas",VerifyTokens, async (req, res) => {
  await ObtenerTodasLasRecargas(req, res);
});

/************************************************************ */
/********* Filtrar recargas master   ****************************************** */
/***************************************************************** */
const FiltrarRecargasMaster = require("../modulos/flujoDeDinero/filtrarRecargasMaster");
route.post("/filtrar_recargas_master",VerifyTokens, async (req, res) => {
  await FiltrarRecargasMaster(req, res);
});
/************************************************************ */
/********* Filtrar recargas Admin   ****************************************** */
/***************************************************************** */
const FiltrarRecargasAdmin = require("../modulos/flujoDeDinero/filtrarRecargasAdmin");
route.post("/filtrar_recargas_admin",VerifyTokens, async (req, res) => {
  await FiltrarRecargasAdmin(req, res);
});
/************************************************************ */
/********* Filtrar recargas caja Admin   ****************************************** */
/***************************************************************** */
const FiltrarRecargasCajaAmin = require("../modulos/flujoDeDinero/filtrarRecargasCajaAmin");
route.post("/filtrar_recargas_caja_admin",VerifyTokens, async (req, res) => {
  await FiltrarRecargasCajaAmin(req, res);
});
/************************************************************ */
/********* Filtrar recompensas caja Admin   ****************************************** */
/***************************************************************** */
const FiltrarRecompensasCajaAdmin = require("../modulos/flujoDeDinero/filtrarRecompensasCajaAdmin");
route.post("/filtrar_recompensas_caja_admin",VerifyTokens, async (req, res) => {
  await FiltrarRecompensasCajaAdmin(req, res);
});
/************************************************************ */
/********* Filtrar recargas caja master   ****************************************** */
/***************************************************************** */
const FiltrarRecargasCajaMaster = require("../modulos/flujoDeDinero/filtrarRecargasCajaMaster");
route.post("/filtrar_recargas_caja_master",VerifyTokens, async (req, res) => {
  await FiltrarRecargasCajaMaster(req, res);
});
/************************************************************ */
/********* Filtrar interes a saldo caja Admin   ****************************************** */
/***************************************************************** */
const FiltrarInteresASaldoCajaAdmin = require("../modulos/flujoDeDinero/filtrarInteresASaldoCajaAdmin");
route.post("/filtrar_interes_a_saldo_caja_admin",VerifyTokens, async (req, res) => {
  await FiltrarInteresASaldoCajaAdmin(req, res);
});

/************************************************************ */
/********* Filtrar interes a saldo caja master   ****************************************** */
/***************************************************************** */
const FiltrarInteresASaldoCajaMaster = require("../modulos/flujoDeDinero/filtrarInteresASaldoCajaMaster");
route.post("/filtrar_interes_a_saldo_caja_master",VerifyTokens, async (req, res) => {
  await FiltrarInteresASaldoCajaMaster(req, res);
});

/************************************************************ */
/********* Filtrar de caja a master caja master ****************************************** */
/***************************************************************** */
const FiltrarDeCajaAMasterCajaMaster = require("../modulos/flujoDeDinero/filtrarDeCajaAMasterCajaMaster");
route.post("/filtrar_de_caja_a_master_caja_master",VerifyTokens, async (req, res) => {
  await FiltrarDeCajaAMasterCajaMaster(req, res);
});

/************************************************************ */
/********* Filtrar iva a saldo caja admin  ****************************************** */
/***************************************************************** */
const filtrarIvaASaldoAdmin = require("../modulos/flujoDeDinero/filtrarIvaASaldoCajaAdmin");
route.post("/filtrar_iva_a_saldo_caja_admin",VerifyTokens, async (req, res) => {
  await filtrarIvaASaldoAdmin(req, res);
});
/************************************************************ */
/********* Obtener todas las recompensas   ****************************************** */
/***************************************************************** */
const ObtenerTodasLasRecompensas = require("../modulos/flujoDeDinero/obtenerTodasLasRecompensas");
route.get("/obtener_todas_las_recompensas",VerifyTokens, async (req, res) => {
  await ObtenerTodasLasRecompensas(req, res);
});


/************************************************************ */
/********* Obtener las recompensas por Id   ****************************************** */
/***************************************************************** */
const ObtenerRecompensasId = require("../modulos/flujoDeDinero/obtenerTodasLasRecompensas");
route.get("/obtener_recompensas_por_id/:id",VerifyTokens, async (req, res) => {
  await ObtenerRecompensasId(req, res);
});


/************************************************************ */
/********* Filtrar recompensas master   ****************************************** */
/***************************************************************** */
const FiltrarRecompensasMaster = require("../modulos/flujoDeDinero/filtrarRecompensasMaster");
route.post("/filtrar_recompensas_master",VerifyTokens, async (req, res) => {
  await FiltrarRecompensasMaster(req, res);
});

/************************************************************ */
/********* Filtrar recompensas admin   ****************************************** */
/***************************************************************** */
const FiltrarRecompensasAdmin = require("../modulos/flujoDeDinero/filtrarRecompensasAdmin");
route.post("/filtrar_recompensas_admin",VerifyTokens, async (req, res) => {
  await FiltrarRecompensasAdmin(req, res);
});



/************************************************************ */
/********* Obtener todas las recompensas   ****************************************** */
/***************************************************************** */
const ObtenerTodosLosInteresesASaldo = require("../modulos/flujoDeDinero/obtenerTodosInteresASaldo");
route.get("/todos_los_intereses_a_saldo",VerifyTokens, async (req, res) => {
  await ObtenerTodosLosInteresesASaldo(req, res);
});


/************************************************************ */
/********* Filtrar intereses a saldo admin  ****************************************** */
/***************************************************************** */
const FiltrarInteresesASaldoAdmin = require("../modulos/flujoDeDinero/filtrarInteresesASaldoAdmin");
route.post("/filtrar_intereses_a_saldo_admin",VerifyTokens, async (req, res) => {
  await FiltrarInteresesASaldoAdmin(req, res);
});

/************************************************************ */
/********* Filtrar intereses a saldo master  ****************************************** */
/***************************************************************** */
const FiltrarInteresesASaldoMaster = require("../modulos/flujoDeDinero/filtrarInteresesASaldoMaster");
route.post("/filtrar_intereses_a_saldo_master",VerifyTokens, async (req, res) => {
  await FiltrarInteresesASaldoMaster(req, res);
});

/************************************************************ */
/********* Obtener las recompensas por Id   ****************************************** */
/***************************************************************** */
const ObtenerInteresesASaldoId = require("../modulos/flujoDeDinero/obtenerInteresASaldoId");
route.get("/intereses_a_saldo_por_id/:id",VerifyTokens, async (req, res) => {
  await ObtenerInteresesASaldoId(req, res);
});

/************************************************************ */
/********* Filtrar de caja a master master  ****************************************** */
/***************************************************************** */
const FiltrarDeCajaAMasterMaster = require("../modulos/flujoDeDinero/filtrarDeCajaAMasterMaster");
route.post("/filtrar_de_caja_a_master",VerifyTokens, async (req, res) => {
  await FiltrarDeCajaAMasterMaster(req, res);
});

/************************************************************ */
/********* Filtrar de caja a master master  ****************************************** */
/***************************************************************** */
const FiltrarDeCajaAMasterAdmin = require("../modulos/flujoDeDinero/filtrarDeCajaAMasterAdmin");
route.post("/filtrar_de_caja_a_admin",VerifyTokens, async (req, res) => {
  await FiltrarDeCajaAMasterAdmin(req, res);
});

/************************************************************ */
/********* Obtener las movimientos de caja a master --- id caja   ****************************************** */
/***************************************************************** */
const ObtenerDeCajaAMasterIdCaja = require("../modulos/flujoDeDinero/obtenerDeCajaAMasterIdCaja");
route.get("/obtener_de_caja_a_master_id_caja/:id",VerifyTokens,VerifyTokens, async (req, res) => {
  await ObtenerDeCajaAMasterIdCaja(req, res);
});


/************************************************************ */
/********* Obtener las movimientos de caja a master --- id caja   ****************************************** */
/***************************************************************** */
const ObtenerDeCajaAMasterIdMaster = require("../modulos/flujoDeDinero/obtenerDeCajaAMasterIdMaster");
route.get("/obtener_de_caja_a_master_id_master/:id",VerifyTokens, async (req, res) => {
  await ObtenerDeCajaAMasterIdMaster(req, res);
});



/************************************************************ */
/********* Obtener los movimientos de caja a master --- id caja   ****************************************** */
/***************************************************************** */
const ObtenerDeCajaAMasterTodo = require("../modulos/flujoDeDinero/obtenerDeCajaAMasterTodo");
route.get("/obtener_de_caja_a_master_todo",VerifyTokens, async (req, res) => {
  await ObtenerDeCajaAMasterTodo(req, res);
});


/***********************  RECETEAR CONTRASENA  **********************************  */
const ConfirmNumber = require("../modulos/recetPassword/confirmCode");
route.post("/confirmNumber",VerifyTokens, async (req, res) => {
  await ConfirmNumber(req, res);
});

const RecetearPasswords = require("../modulos/recetPassword/recetearPasswords");
route.post("/recetPass",VerifyTokens, async (req, res) => {
  await RecetearPasswords(req, res);
});
const RecetearPasswordCaja = require("../modulos/recetPassword/recetPasswordCaja");
route.post("/recetPassCaja",VerifyTokens, async (req, res) => {
  await RecetearPasswordCaja(req, res);
});

const RecetPasswordMaster = require("../modulos/recetPassword/recetPasswordMaster");
route.post("/recetPasswordMaster",VerifyTokens, async (req, res) => {
  await RecetPasswordMaster(req, res);
});
/***********************  FIN DE RECETEAR CONTRASENA  **********************************  */

/************ VERIFICAR TOKEN ***************************/
const RenoverToken = require("../modulos/login/renoverToken");
route.post("/renover_token",async (req, res) => { 
  await RenoverToken(req, res);
});
/*
const VerificatTCaja = require("../modulos/verificarToken/verificarTokenCaja");
route.post("/verificar_token_new",async (req, res) => {
  await VerificatTCaja(req, res);
});
*/
/************ FIN DE VERIFICAR TOKEN ***************************/
//exportar rutas

module.exports = route;

