// FICHERO DE QUERYES DE DEPARTAMENTOS

// Conseguir todos los departamentos
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM departamentos', (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

// Crear un departamento
const create = ({ nombre, ciudad }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO departamentos (nombre, ciudad) values(?,?)', [nombre, ciudad], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

// Conseguir un departamento por Id
const getById = (pDepartamentoId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM departamentos WHERE id = ?', [pDepartamentoId], (err, rows) => {
            if (err) return reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
}

// Actualizar los datos de un departamento
const update = ({ nombre, ciudad, id }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE departamentos SET nombre=?, ciudad=? WHERE id=?', [nombre, ciudad, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}

// Borrar un departamento
const remove = (pDepartamentoId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM departamentos WHERE id=?', [pDepartamentoId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    remove
}