
import { getConnection } from "../database/conexion.js";
import sql from 'mssql'

export const getCargos= async (req, res) => {
    
    const pool = await getConnection()
    const result = await pool.request().query("select * from cargo")
    res.json(result.recordset)
}

export const getCargo= async (req, res) => {
    console.log(req.params.id)

    const pool = await getConnection()
    const result = await pool.request()

    .input("id", sql.Int, req.params.id)
    .query("select * from cargo where id_cargo = @id");
    console.log(result)

    if (result.recordset.length === 0) {
        return res.status(404).json({ message: "Cargo no encontrado" });
    }

    return res.json(result.recordset[0])
}

export const createCargo= async (req, res) => {
    console.log(req.body)

    const pool = await getConnection()
    const result = await pool

    pool.request()
    .input('nombre', sql.VarChar, req.body.nombre_cargo)
    .input('area', sql.VarChar, req.body.area)
    .input('descripcion', sql.VarChar, req.body.descripcion)
    .query("insert into cargo (nombre_cargo, area, descripcion) values (@nombre, @area, @descripcion)")
    console.log(result)

    res.json({
    nombre_cargo: req.body.nombre,
    area: req.body.area,
    descripcion: req.body.descripcion})
}


export const updateCargo = async (req, res) => {
    const { nombre_cargo, area, descripcion } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .input("nombre", sql.VarChar, nombre_cargo)
            .input("area", sql.VarChar, area)
            .input("descripcion", sql.VarChar, descripcion)
            .query("UPDATE cargo SET nombre_cargo = @nombre, area = @area, descripcion = @descripcion WHERE id_cargo = @id");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Cargo no encontrado" });
        }

        res.json({ message: "Cargo actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteCargo= async(req, res) => {

    const pool = await getConnection()
    const result =  await pool.request()
        .input("id", sql.Int, req.params.id)
        .query("delete from cargo where id_cargo = @id");

    console.log(result)

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Cargo no encontrado" });
    }

    return res.json({message: "Cargo eliminado"})
}