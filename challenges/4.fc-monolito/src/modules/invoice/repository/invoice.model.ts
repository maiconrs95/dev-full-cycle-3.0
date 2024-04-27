import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

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
  createdAt: Date

  @Column({ allowNull: false })
  updatedAt: Date
}