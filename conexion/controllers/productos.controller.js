
import { getConnection } from "../database/conexion.js";
import sql from 'mssql'

export const getProductos= async (req, res) => {
    
    const pool = await getConnection()
    const result = await pool.request().query("select * from Productos")
    res.json(result.recordset)
}

export const getProducto= async (req, res) => {
    console.log(req.params.id)

    const pool = await getConnection()
    const result = await pool.request()

    .input("id", sql.Int, req.params.id)
    .query("select * from Productos where codigo_producto = @id");
    console.log(result)

    if (result.recordset.length === 0) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.json(result.recordset[0])
}

export const createProducto = async (req, res) => {
    console.log(req.body)

    const { producto, precio, unidades, descripcion } = req.body; 

    const pool = await getConnection();
    try {
        const result = await pool.request()
            .input('producto', sql.VarChar, producto) 
            .input('precio', sql.VarChar, precio)
            .input('unidades', sql.VarChar, unidades)
            .input('descripcion', sql.VarChar, descripcion)
            .query("INSERT INTO Productos (producto, precio, unidades, descripcion) VALUES (@producto, @precio, @unidades, @descripcion)");
        
        console.log(result);

        res.json({
            producto: producto,
            precio: precio,
            unidades: unidades,
            descripcion: descripcion,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}


export const updateProducto = async (req, res) => {
    const { producto, precio, unidades, descripcion} = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .input("producto", sql.VarChar, producto)
            .input("precio", sql.VarChar, precio)
            .input("unidades", sql.VarChar, unidades)
            .input("descripcion", sql.VarChar, descripcion)
            .query("UPDATE productos SET producto = @producto, precio = @precio, unidades = @unidades, descripcion = @descripcion WHERE codigo_producto = @id");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteProducto= async(req, res) => {

    const pool = await getConnection()
    const result =  await pool.request()
        .input("id", sql.Int, req.params.id)
        .query("delete from Productos where codigo_producto = @id");

    console.log(result)

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.json({message: "Producto eliminado"})
}