import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

// On définit à quoi ressemble l'utilisateur dans la requête
interface RequestUser {
  role?: string;
}

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<{ user?: RequestUser }>(); // On type la requête
    const user = request.user;

    // On vérifie que user existe et que son rôle est ADMIN
    return user?.role === 'ADMIN';
  }
}
