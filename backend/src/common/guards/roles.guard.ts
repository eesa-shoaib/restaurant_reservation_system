import { ROLE_KEY } from "../decorators/roles.decorator";
import { Reflector } from "@nestjs/core";
import { Injectable, CanActivate, ForbiddenException, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!requiredRoles.includes(user.role)) throw new ForbiddenException("Insufficient role");
    return true;
  }
}
