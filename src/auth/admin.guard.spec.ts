import { AdminGuard } from './admin.guard';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    guard = new AdminGuard();
  });

  it('devrait être défini', () => {
    expect(guard).toBeDefined();
  });

  it('devrait retourner TRUE si user est ADMIN', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'ADMIN' } }),
      }),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(context)).toBe(true);
  });

  it("devrait lancer une ERREUR si user n'est pas ADMIN", () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'USER' } }),
      }),
    } as unknown as ExecutionContext;

    // On enveloppe l'appel dans une fonction () => ... pour que Jest attrape l'erreur
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });
});
