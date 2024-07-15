
import { getConnection } from "../database/conexion.js";
import sql from 'mssql'

export const getPedidos= async (req, res) => {
    
    const pool = await getConnection()
    const result = await pool.request().query("select * from Pedidos")
    res.json(result.recordset)
}

export const getPedido= async (req, res) => {
    console.log(req.params.id)

    const pool = await getConnection()
    const result = await pool.request()

    .input("id", sql.Int, req.params.id)
    .query("select * from Pedidos where codigo_pedido = @id");
    console.log(result)

    if (result.recordset.length === 0) {
        return res.status(404).json({ message: "Pedido no encontrado" });
    }

    return res.json(result.recordset[0])
}

export const createPedido = async (req, res) => {
    const { codigo_proveedor, id_empleado, codigo_producto, precio, unidades, total } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('codigo_proveedor', sql.VarChar, codigo_proveedor)
            .input('id_empleado', sql.VarChar, id_empleado)
            .input('codigo_producto', sql.VarChar, codigo_producto)
            .input('precio', sql.VarChar, precio)
            .input('unidades', sql.VarChar, unidades)
            .input('total', sql.VarChar, total)
            .query("INSERT INTO pedidos (codigo_proveedor, id_empleado, codigo_producto, precio, unidades, total) VALUES (@codigo_proveedor, @id_empleado, @codigo_producto, @precio, @unidades, @total)");
            

        console.log(result);

        if (result.rowsAffected[0] > 0) {
            res.status(201).json({
                success: true,
                message: "Pedido registrado correctamente",
                data: {
                    codigo_proveedor,
                    id_empleado,
                    codigo_producto,
                    precio,
                    unidades,
                    total
                }
            });
        } else {
            res.status(400).json({ success: false, message: "No se pudo registrar el pedido" });
        }
    } catch (error) {
        console.error('Error al registrar el pedido:', error);
        res.status(500).json({ success: false, message: "Error interno del servidor", error });
    }
};


export const updatePedido = async (req, res) => {
    const { codigo_proveedor, id_empleado, codigo_producto, fecha, precio, unidades, total } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .input("codigo_proveedor", sql.VarChar, codigo_proveedor)
            .input("id_empleado", sql.VarChar, id_empleado)
            .input("codigo_producto", sql.VarChar, codigo_producto)
            .input("fecha", sql.VarChar, fecha)
            .input("precio", sql.VarChar, precio)
            .input("unidades", sql.VarChar, unidades)
            .input("total", sql.VarChar, total)
            .query("UPDATE pedidos SET codigo_proveedor = @codigo_proveedor, id_empleado = @id_empleado, codigo_producto = @codigo_producto, fecha = @fecha, precio = @precio, unidades = @unidades, total = @total WHERE codigo_pedido = @id");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        res.json({ message: "Pedido actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deletePedido= async(req, res) => {

    const pool = await getConnection()
    const result =  await pool.request()
        .input("id", sql.Int, req.params.id)
        .query("delete from Pedidos where codigo_pedido = @id");

    console.log(result)

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Pedido no encontrado" });
    }

    return res.json({message: "Pedido eliminado"})
}