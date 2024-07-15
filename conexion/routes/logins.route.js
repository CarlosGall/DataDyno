import { Router } from "express";
import { logins  } from "../controllers/logins.controller.js";

const router = Router();

router.post("/logins", logins);

export default router;