import {Module} from "@nestjs/common"
import {PaypalContrller} from "./paypal.controlller"
import {PaypalService} from "./paypal.service"
import {MongooseModule} from "@nestjs/mongoose"
import {Users, UsersSchema} from "src/users/users.schema"
import {Paypal, PaypalSchema} from "./paypal.schema"

@Module({
  controllers: [PaypalContrller],
  providers: [PaypalService],
  imports: [
    MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}]),
    MongooseModule.forFeature([{name: Paypal.name, schema: PaypalSchema}]),
  ],
})
export class PaypalModule {}
