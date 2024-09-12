// const { Router } = require('express');
// const {
// 	create,
// 	getAll,
// 	getById,
// 	remove,
// 	update,
// } = require('../controllers/role.controller');

import { Router } from 'express';

import {
	getAll,
	getById,
	create,
	update,
	remove,
} from '../controllers/role.controller.js';

const router = Router();

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: getAll
 *     description: Returns a list of roles
 *     responses:
 *       200:
 *         description: A JSON array of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: getById
 *     description: Returns a role by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A JSON object of a role
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: create
 *     description: Creates a new role
 *     requestBody:
 *       description: Role name
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created role
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.post('/', create);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: update
 *     description: Updates a role
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Role data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated role
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.put('/:id', update);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: remove
 *     description: Deletes a role
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Role deleted
 */
router.delete('/:id', remove);

export default router;

// module.exports = router;
