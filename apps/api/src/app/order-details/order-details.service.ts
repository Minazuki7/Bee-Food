import { Order } from "@fd-wereact/schemas";
import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateOrderDetailInput } from "./dto/create-order-detail.input";
import { UpdateOrderDetailInput } from "./dto/update-order-detail.input";
import { OrderDetail, OrderDetailDocument } from "@fd-wereact/schemas";
import { StockService } from "../stock/stock.service";
import { ItemsService } from "../items/items.service";
import { MenusService } from "../menus/menus.service";

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectModel(OrderDetail.name)
    private orderDetailModel: Model<OrderDetailDocument>,
    private stockService: StockService,
    private itemsService: ItemsService,
    private menusService: MenusService
  ) {}
  async create(
    createOrderDetailInput: CreateOrderDetailInput,
    orderId: Order
  ): Promise<OrderDetail> {
    const itemsMenus = await this.menusService.itemsInMenu(
      createOrderDetailInput.menus
    );

    const items = [
      ...itemsMenus,
      ...(createOrderDetailInput.items ? createOrderDetailInput.items : []),
    ];

    if (!items.length) {
      throw new NotFoundException({ message: "order is empty" });
    }
    await Promise.all([...items.map((items) => this.checkStock(items))]);
    const prices =
      (await this.getPriceItem(
        createOrderDetailInput.items ? createOrderDetailInput.items : []
      )) +
      (await this.getPriceMenu(
        createOrderDetailInput.menus ? createOrderDetailInput.menus : []
      ));

    const createdOrderDetail = await this.orderDetailModel.create({
      ...createOrderDetailInput,
      order: orderId,
      originalPrice: prices,
      totalPrice: prices,
    });

    await this.updateAllItemsStock(items);

    return createdOrderDetail;
  }

  async updateStock(item: string) {
    const stock = await this.stockService.findItem(item);

    await this.itemsService.updateCount(stock.id, item);
  }

  async getPriceItem(items: string[]) {
    return await this.itemsService.itemPrice(items);
  }
  async getPriceMenu(menus: string[]) {
    return await this.menusService.menuPrice(menus);
  }
  async updateAllItemsStock(items: string[]) {
    const findDuplicates = (arr) =>
      arr.filter((item, index) => arr.indexOf(item) != index);
    const itemList = await this.itemsService.findMany(items);
    const duplicatedElements = findDuplicates(items);
    const duplicatedItems = duplicatedElements
      .map((id) => itemList.filter((item) => item._id.toString() === id))
      .flat();

    for (const item of [...itemList, ...duplicatedItems]) {
      await this.updateStock(item);
    }
  }

  async checkStock(item: string) {
    const stock = await this.stockService.findItem(item);
    return this.itemsService.checkStock(stock.id, item);
  }

  async findAll() {
    return this.orderDetailModel.find().exec();
  }

  async findOne(id: string) {
    return this.orderDetailModel.findById(id).exec();
  }

  async update(id: string, updateOrderDetailInput: UpdateOrderDetailInput) {
    return this.orderDetailModel
      .findByIdAndUpdate(id, updateOrderDetailInput)
      .exec();
  }

  remove(id: string) {
    return this.orderDetailModel.findByIdAndRemove(id).exec();
  }

  async findAllByOrder(order: string) {
    return await this.orderDetailModel.find({ order }).exec();
  }

  async findItems(item: string) {
    return await this.orderDetailModel.find({ item }).exec();
  }

  async findByOrder(order: string) {
    const orderdetail = await this.orderDetailModel
      .findOne({ order })
      .populate({ path: "order", populate: { path: "client branch" } });
    return orderdetail;
  }
}
