import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    // On compile l'application entière (comme en prod)
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    // On ferme l'app après les tests pour libérer les ports
    await app.close();
  });

  // Test réel : on appelle la route GET /products
  it('/products (GET) should return 200', () => {
    return request(app.getHttpServer()).get('/products').expect(200); // On attend un succès (OK), même si la liste est vide []
  });
});
