import { PlaceOrderInputDto } from './place-order.dto'
import PlaceOrderUseCase from './place-order.usecase'

const mockDate = new Date(2000, 1, 1)

describe('PlaceOrderUsecase uni test', () => {
    describe('validateProduct methods', () => {
        // @ts-expect-error - no params in constructor
        const placeOrderUsecase = new PlaceOrderUseCase()

        it('should throw an error when products are not valid', async () => {
            const input: PlaceOrderInputDto = { clientId: '0', products: [] }

            await expect(placeOrderUsecase['validateProducts'](input)).rejects.toThrowError(
                new Error('No products selected')
            )
        })

        it('should throw an error when products are out of stock', async () => {
            const mockProductFacade = {
                checkStock: jest.fn(( { productId }: { productId: string } ) => {
                    return Promise.resolve({
                        productId,
                        stock: productId === '1' ? 0 : 1
                    })
                })
            }

            // @ts-expect-error
            placeOrderUsecase['_productFacade'] = mockProductFacade

            let input: PlaceOrderInputDto = {
                clientId: '0',
                products: [{productId: '1'}]
            }

            await expect(placeOrderUsecase['validateProducts'](input)).rejects.toThrowError(
                new Error('Product 1 is not available in stock')
            )

            input = {
                clientId: '0',
                products: [{productId: '0'}, {productId: '1'}],
            }

            await expect(placeOrderUsecase['validateProducts'](input)).rejects.toThrowError(
                new Error('Product 1 is not available in stock')
            )
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3)

            input = {
                clientId: '0',
                products: [{productId: '0'}, {productId: '1'}, {productId: '2'}],
            }

            await expect(placeOrderUsecase['validateProducts'](input)).rejects.toThrowError(
                new Error('Product 1 is not available in stock')
            )
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5)
        })
    })

    describe('getProductTotal method', () => {
        beforeAll(() => {
            jest.useFakeTimers('modern')
            jest.setSystemTime(mockDate)
        })

        afterAll(() => {
            jest.useRealTimers()
        })

        // @ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase();

        it('should throw erro when product is no found',async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(null)
            }

            // @ts-expect-error
            placeOrderUseCase['_catalogFacade'] = mockCatalogFacade;

          await expect(placeOrderUseCase['getProduct']('0')).rejects.toThrowError(
                new Error('Product not found')
            )
        })
    })

    describe('execute method', () => {
        it('should return an order with status pending', async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null)
            }

            // @ts-expect-error - no params in constructor
            const placeOrderUsecase = new PlaceOrderUseCase()
            // @ts-expect-error
            placeOrderUsecase['_clientFacade'] = mockClientFacade;

            const input: PlaceOrderInputDto = { clientId: '0', products: [] }

            await expect(placeOrderUsecase.execute(input)).rejects.toThrowError(
                new Error('Client not found')
            )
        })

        it('should throw new error when products are not valid', async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true)
            }
            // @ts-expect-error - no params in constructor
            const placeOrderUsecase = new PlaceOrderUseCase()

            const mockValidateProducts = jest
            // @ts-expect-error
            .spyOn(placeOrderUsecase, 'validateProducts')
            // @ts-expect-error
            .mockRejectedValue(new Error('No products selected'));

            // @ts-expect-error
            placeOrderUsecase['_clientFacade'] = mockClientFacade;

            const input: PlaceOrderInputDto = { clientId: '0', products: [] }

            await expect(placeOrderUsecase.execute(input)).rejects.toThrowError(
                new Error('No products selected')
            )
            expect(mockValidateProducts).toHaveBeenCalledTimes(1)
        })
    })
})