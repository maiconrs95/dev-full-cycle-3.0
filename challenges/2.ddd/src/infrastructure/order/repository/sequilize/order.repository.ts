import Order from "../../../../domain/checkout/entity/order";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository.interface'
import OrderItem from '../../../../domain/checkout/entity/order_item';
export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{ model: OrderItemModel }],
            }
        );
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items,
            }, {
            where:
            {
                id: entity.id
            }
        });
    }

    async find(id: string): Promise<Order> {
        const entity = await OrderModel.findOne({ where: { id } })
        return new Order(entity.id, entity.customer_id, entity
            .items
            .map(item => new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
            ))
        )
    }

    async findAll(): Promise<Order[]> {
        const entities = await OrderModel.findAll();
        return entities.map((entity) =>
            new Order(entity.id, entity.customer_id, entity
                .items
                .map(item => new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.product_id,
                    item.quantity
                ))
            )
        );
    }
}
