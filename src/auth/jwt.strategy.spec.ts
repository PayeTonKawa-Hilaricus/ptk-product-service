import { JwtStrategy } from './jwt.strategy';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        // On doit fournir un faux ConfigService car le constructeur de JwtStrategy l'utilise
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => 'testSecret'), // On simule la méthode .get()
          },
        },
      ],
    }).compile();
    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('validate renvoie le payload', () => {
    const payload = { sub: 'u1', email: 'e@e.com', role: 'ADMIN' };

    expect(strategy.validate(payload)).toEqual({
      userId: 'u1',
      email: 'e@e.com',
      role: 'ADMIN',
    });
  });
});
