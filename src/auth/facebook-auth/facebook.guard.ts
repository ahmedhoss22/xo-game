import { AuthGuard } from "@nestjs/passport";
import {ExecutionContext , Injectable} from "@nestjs/common"

@Injectable()
export class FacebookAuthGuard extends AuthGuard("facebook"){
    async canActivate (context :ExecutionContext){
        const activate = (await super.canActivate(context)) as boolean
        
        if (!activate) {
            throw new Error('Facebook authentication failed');
          }

        const request = context.switchToHttp().getRequest()
        await super.logIn(request)
        return activate;
    }
}