import { AdminGuard } from './admin.guard';
import { ExecutionContext } from '@nestjs/common';

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    guard = new AdminGuard();
  });

  it('devrait être défini', () => {
    expect(guard).toBeDefined();
  });

  it('devrait retourner TRUE si le user est ADMIN', () => {
    // On simule un contexte avec un utilisateur ADMIN
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { role: 'ADMIN' },
        }),
      }),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(context)).toBe(true);
  });

  it('devrait retourner FALSE si le user n\'est pas ADMIN', () => {
    // On simule un contexte avec un utilisateur USER lambda
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { role: 'USER' },
        }),
      }),
    } as unknown as ExecutionContext;

    // CORRECTION ICI : On attend que le guard réponde "FALSE" (Accès refusé)
    // Au lieu d'attendre une erreur.
    expect(guard.canActivate(context)).toBe(false);
  });
});