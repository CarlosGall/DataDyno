
import { getConnection } from "../database/conexion.js";
import sql from 'mssql'

export const getClientes= async (req, res) => {
    
    const pool = await getConnection()
    const result = await pool.request().query("select * from cliente")
    res.json(result.recordset)
}

export const getCliente= async (req, res) => {
    console.log(req.params.id)

    const pool = await getConnection()
    const result = await pool.request()

    .input("id", sql.Int, req.params.id)
    .query("select * from cliente where id_cliente = @id");
    console.log(result)

    if (result.recordset.length === 0) {
        return res.status(404).json({ message: "Cliente no encontrado" });
    }

    return res.json(result.recordset[0])

}

export const createCliente = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('cedula', sql.VarChar, req.body.cedula)
            .input('nombre', sql.VarChar, req.body.nombre)
            .input('apellido', sql.VarChar, req.body.apellido)
            .input('telefono', sql.VarChar, req.body.telefono)
            .input('correo', sql.VarChar, req.body.correo)
            .query("INSERT INTO cliente (cedula, nombre, apellido, telefono, correo) VALUES (@cedula, @nombre, @apellido, @telefono, @correo); SELECT SCOPE_IDENTITY() AS id_cliente");

        console.log(result);

        res.json({
            cedula: req.body.cedula,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            correo: req.body.correo
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}



export const updateCliente = async (req, res) => {
    const { cedula, nombre, apellido,telefono,correo} = req.body;

    try {
        const pool = await getConnection()
        
        const result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .input("cedula", sql.VarChar, cedula)
            .input("nombre", sql.VarChar, nombre)
            .input("apellido", sql.VarChar, apellido)
            .input("telefono", sql.VarChar, telefono)
            .input("correo", sql.VarChar, correo)
            .query("UPDATE cliente SET cedula = @cedula, nombre = @nombre, apellido = @apellido, telefono = @telefono, correo = @correo where id_cliente = @id")

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" })
        }

        res.json({
            updatedProduct: {
                cedula: req.body.cedula,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                telefono: req.body.telefono,
                correo: req.body.correo
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" })
    }
}

export const deleteCliente= async(req, res) => {

    const pool = await getConnection()
    const result =  await pool.request()
        .input("id", sql.Int, req.params.id)
        .query("delete from cliente where id_cliente = @id");

    console.log(result)

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Cliente no encontrado" });
    }

    return res.json({message: "Cliente eliminado"})
}