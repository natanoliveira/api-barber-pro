import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthAdminGuard implements CanActivate {
    // Trabalhar o funilamento de perfis
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        if (request['user']?.role === 'admin') {
            Logger.log('User is admin', 'AuthAdminGuard');
            return true;
        }

        return false;
    }
}