import { Router } from "express";
import { getPedidos, getPedido, createPedido, updatePedido, deletePedido } from "../controllers/pedidos.controller.js";

const router = Router()

router.get('/pedidos', getPedidos);

router.get('/pedidos/:id', getPedido);

router.post('/pedidos',createPedido);

router.put('/pedidos/:id', updatePedido);

router.delete('/pedidos/:id', deletePedido);

export default router