import { PlaceOrderInputDto } from './place-order.dto'
import PlaceOrderUseCase from './place-order.usecase'

describe('PlaceOrderUsecase uni test', () => {
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