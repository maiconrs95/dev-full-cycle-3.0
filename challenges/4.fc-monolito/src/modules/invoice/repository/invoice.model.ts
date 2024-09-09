import { Column, Model, PrimaryKey, Table, DataType } from "sequelize-typescript";

interface ProductData {
    id: string;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

@Table({
    tableName: 'invoice',
    timestamps: false
})
export class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string

    @Column({ allowNull: false })
    name: string

    @Column({ allowNull: false })
    document: string

    @Column({ allowNull: false })
    street: string

    @Column({ allowNull: false })
    number: string

    @Column({ allowNull: true })
    complement: string

    @Column({ allowNull: false })
    city: string

    @Column({ allowNull: false })
    state: string

    @Column({ allowNull: false })
    zipcode: string


    @Column({ allowNull: true, type: DataType.JSON })
    items: ProductData[];

    @Column({ allowNull: false })
    createdAt: Date

    @Column({ allowNull: false })
    updatedAt: Date
}