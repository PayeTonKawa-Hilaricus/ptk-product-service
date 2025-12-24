import { JwtStrategy } from './jwt.strategy';
import { Test, TestingModule } from '@nestjs/testing';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();
    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('validate renvoie le payload', async () => {
    const payload = { sub: 'u1', email: 'e@e.com', role: 'ADMIN' };
    expect(await strategy.validate(payload)).toEqual({
      userId: 'u1',
      email: 'e@e.com',
      role: 'ADMIN',
    });
  });
});
