import { Router } from "express";
import * as admin from "../controllers/admin.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/requireRole.js";

const router = Router();

router.use(requireAuth, requireRole("admin"));

router.get('/stats', admin.stats);
router.get('/users', admin.users);
router.post('/users', admin.createUser);
router.patch('/users/:id/role', admin.updateRole);

export default router;