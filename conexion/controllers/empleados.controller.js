
import { getConnection } from "../database/conexion.js";
import sql from 'mssql'

export const getEmpleados= async (req, res) => {
    
    const pool = await getConnection()
    const result = await pool.request().query("select * from empleado")
    res.json(result.recordset)
}

export const getEmpleado= async (req, res) => {
    console.log(req.params.id)

    const pool = await getConnection()
    const result = await pool.request()

    .input("id", sql.Int, req.params.id)
    .query("select * from empleado where id_empleado = @id");
    console.log(result)

    if (result.recordset.length === 0) {
        return res.status(404).json({ message: "Empleado no encontrado" });
    }

    return res.json(result.recordset[0])

}

export const createEmpleado= async (req, res) => {
    console.log(req.body)

    const pool = await getConnection()
    const result = await pool

    pool.request()
    .input('cargo', sql.Int, req.body.cargo)
    .input('cedula', sql.Int, req.body.cedula)
    .input('nombre', sql.VarChar, req.body.nombre)
    .input('apellido', sql.VarChar, req.body.apellido)
    .input('telefono', sql.VarChar, req.body.telefono)
    .input('direccion', sql.VarChar, req.body.direccion)
    .input('correo', sql.VarChar, req.body.correo_corp)
    .query("insert into empleado (cargo, cedula, nombre, apellido, telefono, direccion, correo_corp) values (@cargo, @cedula, @nombre, @apellido, @telefono, @direccion, @correo ); SELECT SCOPE_IDENTITY() AS id_empleado")

    console.log(result)

    res.json({
    cargo: req.body.cargo,
    cedula: req.body.cedula,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    correo: req.body.correo_corp})
}


export const updateEmpleado = async (req, res) => {
    const { cargo, cedula, nombre, apellido, telefono, direccion, correo } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .input("cargo", sql.Int, cargo)
            .input("cedula", sql.VarChar, cedula)
            .input("nombre", sql.VarChar, nombre)
            .input("apellido", sql.VarChar, apellido)
            .input("telefono", sql.VarChar, telefono)
            .input("direccion", sql.VarChar, direccion)
            .input("correo_corp", sql.VarChar, correo)
            .query("UPDATE empleado SET cargo = @cargo, cedula = @cedula, nombre = @nombre, apellido=@apellido, telefono=@telefono, direccion=@direccion, correo_corp=@correo_corp WHERE id_empleado = @id");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        res.json({ message: "Empleado actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteEmpleado= async(req, res) => {

    const pool = await getConnection()
    const result =  await pool.request()
        .input("id", sql.Int, req.params.id)
        .query("delete from empleado where id_empleado = @id");

    console.log(result)

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Empleado no encontrado" });
    }

    return res.json({message: "Empleado eliminado"})
}