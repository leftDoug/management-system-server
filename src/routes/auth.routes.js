import { Router } from 'express';

import { validateJWT } from '../middlewares/validate-jwt.js';

import {
  getAllUsers,
  getAllWorkers,
  getById,
  getInfo,
  login,
  register,
  tokenRenewal,
  update
} from '../controllers/auth.controller.js';
import { findByPk } from '../middlewares/findByPk.js';

const router = Router();

// register user
router.post('/register', findByPk, register);

// login
router.post('/login', login);

// renew token
router.get('/renew', validateJWT, tokenRenewal);

router.get('/users', getAllUsers);

router.get('/users/:id', findByPk, getById);

router.get('/users/:id/info', findByPk, getInfo);

router.get('/workers', getAllWorkers);

router.patch('/users/:id/update', findByPk, update);

export default router;
