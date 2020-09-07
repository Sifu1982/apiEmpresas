const router = require('express').Router();
const { getById, getAll, create, update, remove } = require('../../models/departamento')

// CONSEGUIR TODOS LOS DEPARTAMENTOS
router.get('/', async (req, res) => {
    try {
        const departamentos = await getAll();
        res.json(departamentos);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// CREAR UN DEPARTAMENTO
router.post('/', async (req, res) => {
    try {
        const result = await create(req.body);
        // console.log(result);
        if (result['affectedRows'] === 1) {
            const nuevoDepartamento = await getById(result['insertid']);
            res.status(201).json({ success: 'Se ha insertado un nuevo departamento', departamento: nuevoDepartamento });
        } else {
            res.status(422).json({ error: 'No se ha podido insertar el departamento' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});


// EDITAR UN DEPARTAMENTO
router.put('/', async (req, res) => {
    // res.json(req.body);
    try {
        const result = await update(req.body);
        if (result['affectedRows'] === 1) {
            res.json({ success: 'Se ha editado el departamento' });
        } else {
            res.status(422).json({ error: 'No se ha podido actualizar el departamento' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// BORRAR UN DEPARTAMENTO
router.delete('/', async (req, res) => {
    // res.json(req.body);
    try {
        const result = await remove(req.body.id);
        if (result['affectedRows'] === 1) {
            res.json({ succes: 'Se ha borrado el departamento' });
        } else {
            res.status(422).json({ error: 'No se ha borrado el departamento. Compruebe el Id' });
        }
    } catch{
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;