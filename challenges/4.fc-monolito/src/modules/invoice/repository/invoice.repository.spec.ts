import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "./invoice.model"

describe("Invoice Repository test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([InvoiceModel])

    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })
})