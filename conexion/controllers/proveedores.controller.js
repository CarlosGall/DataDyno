
import { getConnection } from "../database/conexion.js";
import sql from 'mssql'

export const getProveedores= async (req, res) => {
    
    const pool = await getConnection()
    const result = await pool.request().query("select * from Proveedores")
    res.json(result.recordset)
}

export const getProveedor = async (req, res) => {
    try {
        console.log('Proveedor ID:', req.params.id);

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT * FROM Proveedores WHERE codigo_proveedor = @id');

        console.log('Query Result:', result);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener el proveedor:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createProveedor= async (req, res) => {
    console.log(req.body)

    const pool = await getConnection()
    const result = await pool

    pool.request()
    .input('nit', sql.VarChar, req.body.nit)
    .input('razon_social', sql.VarChar, req.body.razon_social)
    .input('area', sql.VarChar, req.body.area)
    .input('telefono', sql.VarChar, req.body.telefono)
    .input('correo', sql.VarChar, req.body.correo)
    .query("insert into proveedores (nit, razon_social, area, telefono, correo) values (@nit, @razon_social, @area, @telefono, @correo)")
    console.log(result)

    res.json({
        nit: req.body.nit,
        razon_social: req.body.razon_social,
        area: req.body.area,
        telefono: req.body.telefono,
        correo: req.body.correo,})
}


export const updateProveedor = async (req, res) => {
    const { nit, razon_social, area, telefono, correo } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .input("nit", sql.VarChar, nit)
            .input("razon_social", sql.VarChar, razon_social)
            .input("area", sql.VarChar, area)
            .input("telefono", sql.VarChar, telefono)
            .input("correo", sql.VarChar, correo)
            .query("UPDATE proveedores SET nit = @nit, razon_social = @razon_social, area = @area, telefono = @telefono, correo = @correo WHERE codigo_proveedor = @id");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        res.json({ message: "Proveedor actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteProveedor= async(req, res) => {

    const pool = await getConnection()
    const result =  await pool.request()
        .input("id", sql.Int, req.params.id)
        .query("delete from Proveedores where codigo_proveedor = @id");

    console.log(result)

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    return res.json({message: "Proveedor eliminado"})
}