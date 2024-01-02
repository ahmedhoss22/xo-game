import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { OrderDto } from './dtos/order-dto';
import { OrderService } from './order.service';
import { AuthAdminGuard ,AuthGuard} from 'src/auth/local-auth/auth.guard';
import { UpdateOrderDto } from './dtos/update-order-dto';
import mongoose from 'mongoose';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}
  
    @Post('/')
    @UseGuards(AuthGuard)
    async addOrder(@Body() data: OrderDto,@Req() req) {
      await this.orderService.addOrder({...data,user:req.user._id});
      return { message: 'Order Added' };
    }
  
    @Get('/all')
    @UseGuards(AuthAdminGuard)
    async getAllOrders() {
      let orders = await this.orderService.getOrders();
      return orders;
    }
  
    @Post('/update')
    @UseGuards(AuthAdminGuard)
    async updateOrder(@Body() data: UpdateOrderDto) {
      await this.orderService.updateOrder(data);
      return { message: 'Updated !!' };
    }
  
    @Delete('/:id')
    @UseGuards(AuthAdminGuard)
    async deleteOrder(@Param('id') id: mongoose.Types.ObjectId) {
      await this.orderService.deleteOrder(id);
      return { message: 'Order Deleted !!' };
    }
  
    @Get('/:id')
    @UseGuards(AuthAdminGuard)
    async getOneOrder(@Param('id') id: mongoose.Types.ObjectId) {
      let order = await this.orderService.getOrder(id);
      return order;
    }
  }
