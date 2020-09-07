const router = require('express').Router();

const apiDepartamentosRouter = require('./api/departamentos');
const apiEmpleadosRouter = require('./api/empleados');

/**
 * 
 *  GESTIÓN DE RUTAS
 * 
 */

router.use('/departamentos', apiDepartamentosRouter);
router.use('/empleados', apiEmpleadosRouter);

module.exports = router;