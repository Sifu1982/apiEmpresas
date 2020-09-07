// FICHERO DE QUERYES DE EMPLEADO

//Conseguir todos los empleados
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM empleados', (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

//Conseguir un empleado por id
const getById = (pEmpleadoId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM empleados WHERE id=?', [pEmpleadoId], (err, rows) => {
            if (err) return reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
}

//Crear un empleado
const create = ({ nombre, dni, sexo, fecha_nac, salario, cargo }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO empleados (nombre, dni, sexo, fecha_nac, salario, cargo) VALUES (?,?,?,?,?,?)', [nombre, dni, sexo, fecha_nac, salario, cargo], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

// Actualizar los datos de un empleado
const update = ({ nombre, dni, sexo, fecha_nac, salario, cargo, id }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE empleados SET nombre=?, dni=?, sexo=?, fecha_nac=?, salario=?, cargo=? WHERE id=?', [nombre, dni, sexo, fecha_nac, salario, cargo, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}

// Borrar un empleado
const remove = (pEmpleadoId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM empleados WHERE id=?', [pEmpleadoId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}