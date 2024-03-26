import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import UpdateProductUseCase from "../../../usecase/product/update/update.product.usecase";
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ProductPresenter from "../presenters/product.presenter";

export const productRoute = express.Router();

productRoute.get("/", async (req, res: Response) => {
    try {
        if (req.body.id) {
            const usecase = new FindProductUseCase(new ProductRepository());
            const output = await usecase.execute(req.body);

            return res.send(output);
        }

        const usecase = new ListProductUseCase(new ProductRepository());
        const output = await usecase.execute();

        return res.format({
            json: async () => res.send(output),
            xml: async () => res.send(ProductPresenter.listXML(output)),
        });
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});

productRoute.post("/", async (req: Request, res: Response) => {
    try {
        const usecase = new CreateProductUseCase(new ProductRepository());
        const productDto = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price
        };

        const output = await usecase.execute(productDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.put("/", async (req: Request, res: Response) => {
    const usecase = new UpdateProductUseCase(new ProductRepository());
    try {
        const productDto = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price
        };

        const output = await usecase.execute(productDto);

        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});