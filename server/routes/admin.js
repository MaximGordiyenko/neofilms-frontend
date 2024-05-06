import express from 'express';

import { signIn } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/admin/login', signIn);

export default router;
