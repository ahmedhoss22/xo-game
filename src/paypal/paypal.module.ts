import { Module } from "@nestjs/common";
import { PaypalContrller } from "./paypal.controlller";
import { PaypalService } from "./paypal.service";

@Module({
    controllers:[PaypalContrller],
    providers:[PaypalService]
})
export class PaypalModule{}