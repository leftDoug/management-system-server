import request from 'supertest';

import app from '../app.js';
import { sequelize } from '../db/config.js';
import { server } from '../index.js';

import { Area } from '../models/Area';
import { User } from '../models/User';
import { createViews } from '../db/views.js';
import { createFunctions } from '../db/functions.js';

const api = request(app);
const initialArea = { name: 'RRHH' };
const initialUsers = [
  {
    name: 'Osmani Lopez',
    occupation: 'Especialista Principal',
    email: 'esprrhh@fevex.cu',
    idArea: 1,
    username: 'esprrhh',
    password: '12345678',
    idRole: 1
  },
  {
    name: 'Begoña Vega',
    occupation: 'Informatica',
    email: 'informatica@fevex.cu',
    idArea: 1,
    username: 'informatica',
    password: 'informatica',
    idRole: 3
  }
];

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.query(
    `
    TRUNCATE TABLE areas RESTART IDENTITY CASCADE;
    `
  );
  await Area.create(initialArea);

  await createViews();
  await createFunctions();
});

beforeEach(async () => {
  await sequelize.query(
    `
    TRUNCATE TABLE users RESTART IDENTITY CASCADE;
    `
  );

  await api.post('/api/auth/register').send(initialUsers[0]);
  await api.post('/api/auth/register').send(initialUsers[1]);
});

describe('GET /users', () => {
  test('debe devolver los usuarios', async () => {
    const response = await api.get(`/api/auth/users`);

    expect(response.body.arg).toHaveLength(initialUsers.length);
  });
});

describe('GET /users/:id', () => {
  test('debe devolver el usuario', async () => {
    const user = await User.findOne({
      where: { username: initialUsers[0].username }
    });
    const response = await api.get(`/api/auth/users/${user.id}`);

    expect(response.body.arg).toHaveProperty('name', initialUsers[0].name);
  });

  test('debe dar error 404', async () => {
    const response = await api.get(`/api/auth/users/1`);
    // XXX mirar si arreglar el mensaje de error
    expect(response.body.msg).toBe(
      'Usuario no encontrado. ID de Usuario no válido.'
    );
  });
});

describe('GET /users/:id/info', () => {
  test('debe devolver la info del usuario', async () => {
    const user = await User.findOne({
      where: { username: initialUsers[0].username }
    });
    const response = await api.get(`/api/auth/users/${user.id}/info`);

    expect(response.body.arg.area).not.toBeUndefined();
  });
});

describe('GET /workers', () => {
  test('debe devolver los trabajadores', async () => {
    const response = await api.get('/api/auth/workers');

    expect(response.body.arg.length).toBe(initialUsers.length);
  });
});

describe('POST /register', () => {
  test('debe crear un usuario', async () => {
    const response = await api.post('/api/auth/register').send({
      name: 'John Doe',
      occupation: 'Director RRHH',
      email: 'dir.rrhh@fevex.cu',
      idArea: 1,
      username: 'dirrrhh',
      password: '12345678',
      idRole: 1
    });

    expect(response.statusCode).toBe(201);
  });

  test('debe dar error de nombre de usuario en uso', async () => {
    const response = await api.post('/api/auth/register').send({
      name: 'Karla Mendez',
      occupation: 'Especialista Principal',
      email: 'esprrhh@fevex.cu',
      idArea: 1,
      username: 'esprrhh',
      password: '12345678',
      idRole: 1
    });

    expect(response.body).toEqual({
      ok: false,
      msg: 'Este nombre de usuario ya está en uso.'
    });
  });

  test('debe dar error de correo en uso', async () => {
    const response = await api.post('/api/auth/register').send({
      name: 'Karla Mendez',
      occupation: 'Especialista Principal',
      email: 'esprrhh@fevex.cu',
      idArea: 1,
      username: 'especialista',
      password: '12345678',
      idRole: 1
    });

    expect(response.body).toEqual({
      ok: false,
      msg: 'Este correo ya está en uso.'
    });
  });

  test('debe dar error de trabajador existente', async () => {
    const response = await api.post('/api/auth/register').send({
      name: 'Osmani Lopez',
      occupation: 'Especialista Principal',
      email: 'especialista2@fevex.cu',
      idArea: 1,
      username: 'especialista',
      password: 'especialista',
      idRole: 1
    });

    expect(response.body).toEqual({
      ok: false,
      msg: 'Este trabajador ya tiene un Usuario creado.'
    });
  });
});

describe('PATCH /users/:id/update', () => {
  test('debe actualizar un usuario', async () => {
    const user = await User.findOne({
      where: { username: initialUsers[0].username }
    });
    const response = await api.patch(`/api/auth/users/${user.id}/update`).send({
      name: 'Carlitos Brown',
      occupation: 'Custodio',
      email: 'boberia@fevex.cu',
      idArea: 1,
      username: 'custodio',
      oldPassword: '12345678',
      newPassword: 'custodio',
      idRole: 1
    });

    expect(response.body.msg).toBe('Usuario actualizado.');
  });

  test('debe dar error de nombre de usuario en uso', async () => {
    const user = await User.findOne({
      where: { username: initialUsers[1].username }
    });
    const response = await api.patch(`/api/auth/users/${user.id}/update`).send({
      name: initialUsers[1].name,
      occupation: initialUsers[1].occupation,
      email: initialUsers[1].email,
      idArea: initialUsers[1].idArea,
      username: initialUsers[0].username,
      oldPassword: initialUsers[1].password,
      newPassword: initialUsers[1].password,
      idRole: initialUsers[1].idRole
    });

    expect(response.body).toEqual({
      ok: false,
      msg: 'Este nombre de usuario ya está en uso.'
    });
  });

  test('debe dar error de correo en uso', async () => {
    const user = await User.findOne({
      where: { username: initialUsers[1].username }
    });
    const response = await api.patch(`/api/auth/users/${user.id}/update`).send({
      name: initialUsers[1].name,
      occupation: initialUsers[1].occupation,
      email: initialUsers[0].email,
      idArea: initialUsers[1].idArea,
      username: initialUsers[1].username,
      oldPassword: initialUsers[1].password,
      newPassword: initialUsers[1].password,
      idRole: initialUsers[1].idRole
    });

    expect(response.body).toEqual({
      ok: false,
      msg: 'Este correo ya está en uso.'
    });
  });

  test('debe dar error de trabajador existente', async () => {
    const user = await User.findOne({
      where: { username: initialUsers[1].username }
    });
    const response = await api.patch(`/api/auth/users/${user.id}/update`).send({
      name: initialUsers[0].name,
      occupation: initialUsers[0].occupation,
      email: initialUsers[1].email,
      idArea: initialUsers[0].idArea,
      username: initialUsers[1].username,
      oldPassword: initialUsers[1].password,
      newPassword: initialUsers[1].password,
      idRole: initialUsers[1].idRole
    });

    expect(response.body).toEqual({
      ok: false,
      msg: 'Este trabajador ya tiene un Usuario creado.'
    });
  });
});

describe('POST /login', () => {
  test('debe hacer login correctamente', async () => {
    const response = await api.post('/api/auth/login').send({
      username: initialUsers[0].username,
      password: initialUsers[0].password
    });

    expect(response.body.ok).toBe(true);
  });

  test('debe devolver un token de acceso', async () => {
    const response = await api.post('/api/auth/login').send({
      username: initialUsers[0].username,
      password: initialUsers[0].password
    });

    expect(response.body.token).not.toBeUndefined();
  });

  test('debe dar error de usuario', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({ username: 'esprrhh2', password: '12345678' });

    expect(response.body).toEqual({ ok: false, msg: 'Usuario incorrecto' });
  });

  test('debe dar error de contraseña', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({ username: 'esprrhh', password: '123456789' });

    expect(response.body).toEqual({ ok: false, msg: 'Contraseña incorrecta' });
  });
});

afterAll(() => {
  server.close();
  sequelize.close();
});
