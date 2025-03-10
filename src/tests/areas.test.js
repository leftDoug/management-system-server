import request from 'supertest';

import app from '../app';
import { server } from '../index';
import { sequelize } from '../db/config';
import { Area } from '../models/Area';

const api = request(app);
const initialData = [
  { name: 'economia' },
  { name: 'contabilidad' },
  { name: 'transporte' }
];

beforeEach(async () => {
  await Area.sync({ force: true });
  await Area.create(initialData[0]);
  await Area.create(initialData[1]);
  await Area.create(initialData[2]);
});

describe('GET /areas', () => {
  const path = '/api/areas';
  test('debe devolver todas las areas', async () => {
    const response = await api.get(path);

    expect(response.statusCode).toBe(200);
    expect(response.body.arg).toBeInstanceOf(Array);
  });

  test('debe haber 3 areas', async () => {
    const response = await api.get(path);

    expect(response.body.arg).toHaveLength(initialData.length);
  });
});

describe('GET /areas/:id', () => {
  test('debe devolver el area de economia', async () => {
    const all = await api.get('/api/areas');
    const area = all.body.arg.find((item) => item.name === 'economia');
    const response = await api.get(`/api/areas/${area.id}`);

    expect(response.body.arg).toHaveProperty('name', 'economia');
  });
});

describe('POST /areas', () => {
  test('debe crear el area', async () => {
    const response = await api.post('/api/areas').send({ name: 'rrhh' });
    const area = await Area.findOne({ where: { name: 'rrhh' } });

    expect(response.statusCode).toBe(201);
    expect(area.id).toBe(4);
  });
});

afterAll(() => {
  server.close();
  sequelize.close();
});
