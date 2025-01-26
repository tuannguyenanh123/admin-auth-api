import { MenuItemOption } from 'src/modules/menu.item.options/entities/menu.item.option.entity';
import { MenuItem } from 'src/modules/menu.items/entities/menu.item.entity';
import { Menu } from 'src/modules/menus/entities/menu.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDetailDocument = HydratedDocument<OrderDetail>;

@Schema({ timestamps: true })
export class OrderDetail {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Order.name })
  order: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Menu.name })
  menu: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MenuItem.name })
  menuItem: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MenuItemOption.name })
  menuItemOption: mongoose.Schema.Types.ObjectId;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
