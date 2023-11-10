import {Controller} from "@nestjs/common"
import { PaypalService } from "./paypal.service"

@Controller()
export class PaypalContrller{
    constructor(private readonly paypalService :PaypalService){}

    
}