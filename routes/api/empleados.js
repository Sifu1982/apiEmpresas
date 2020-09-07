const router = require('express').Router();
const { getAll, getById, create, update, remove } = require('../../models/empleado');
const { check, validationResult } = require('express-validator');


// CONSEGUIR TODOS LOS EMPLEADOS
router.get('/', async (req, res) => {
    try {
        const empleados = await getAll();
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// CREAR UN EMPLEADO
router.post('/',
    check('dni', 'DNI erróneo: formato no válido ó la letra del NIF no se corresponde con un DNI válido').custom(dni => {
        return nif(dni);
    }),
    async (req, res) => {
        try {

            req.body.fecha_inc = new Date();

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({ errors: errors.array() })
            }

            const result = await create(req.body);
            if (result['affectedRows'] === 1) {
                const nuevoEmpleado = await getById(result['insertId']);
                res.status(201).json({ success: 'Se ha insertado un nuevo empleado', empleado: nuevoEmpleado });
            } else {
                res.status(422).json({ error: 'No se ha podido insertar el empleado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

// EDITAR UN EMPLEADO
router.put('/', async (req, res) => {
    // res.json(req.body);
    try {
        const result = await update(req.body);
        if (result['affectedRows'] === 1) {
            res.json({ success: 'Se ha editado el empleado' });
        } else {
            res.status(422).json({ error: 'No se ha podido actualizar el empleado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// BORRAR UN EMPLEADO
router.delete('/', async (req, res) => {
    try {
        const result = await remove(req.body.id);
        if (result['affectedRows'] === 1) {
            res.json({ succes: 'Se ha borrado el empleado' });
        } else {
            res.status(422).json({ error: 'No se ha borrado el empleado. Compruebe el Id' });
        }
    } catch{
        res.status(500).json({ error: error.message });
    }
});


// HELPERS

//Función de validación del DNI
function nif(dni) {
    var numero
    var letr
    var letra
    var expresion_regular_dni

    expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

    if (expresion_regular_dni.test(dni) == true) {
        numero = dni.substr(0, dni.length - 1);
        letr = dni.substr(dni.length - 1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero + 1);
        if (letra != letr.toUpperCase()) {
            // 'Dni erróneo, la letra del NIF no se corresponde'
            console.log(1);
            return false;
        } else {
            // 'Dni correcto'
            return true;
        }
    } else {
        console.log(2);
        // 'Dni erróneo, formato no válido'
        return false;
    }
}



module.exports = router;