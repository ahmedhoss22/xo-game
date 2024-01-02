import { OrderDto } from './dtos/order-dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateOrderDto } from './dtos/update-order-dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private Order: Model<Order>) {}

  addOrder(data: OrderDto): Promise<Order> {
    let newOrder = new this.Order(data);
    return newOrder.save();
  }

  getOrders(): Promise<Order[]> {
    return this.Order.find().populate('user').populate('product').exec();
  }

  getOrder(id: mongoose.Types.ObjectId): Promise<Order> {
    return this.Order.findById(id).populate('user').populate('product');
  }

  updateOrder(data: UpdateOrderDto): Promise<Order> {
    return this.Order.findByIdAndUpdate(data._id, data);
  }

  deleteOrder(id: mongoose.Types.ObjectId): Promise<Order> {
    return this.Order.findByIdAndDelete(id);
  }
}
