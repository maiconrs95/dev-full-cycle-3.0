import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('product create', () => {
        it("should create a product", async () => {
            const productA = await request(app)
                .post("/product")
                .send({
                    type: "a",
                    name: "product a",
                    price: 100
                });

            expect(productA.status).toBe(200);
            expect(productA.body.name).toBe("product a");
            expect(productA.body.price).toBe(100);

            const productB = await request(app)
                .post("/product")
                .send({
                    type: "b",
                    name: "product b",
                    price: 100
                });

            expect(productB.status).toBe(200);
            expect(productB.body.name).toBe("product b");
            expect(productB.body.price).toBe(200);
        });

        it("should not create a product", async () => {
            const response = await request(app)
                .post("/product")
                .send({
                    name: "product a",
                    price: 100
                });
            expect(response.status).toBe(500);
        });
    });

    describe('producr list', () => {
        it("should list all products", async () => {
            const response = await request(app)
                .post("/product")
                .send({
                    type: "a",
                    name: "product a",
                    price: 100
                });

            expect(response.status).toBe(200);
            const response2 = await request(app)
                .post("/product")
                .send({
                    type: "b",
                    name: "product b",
                    price: 150
                });
            expect(response2.status).toBe(200);

            const listResponse = await request(app).get("/product").send();

            expect(listResponse.status).toBe(200);
            expect(listResponse.body.products.length).toBe(2);

            const productA = listResponse.body.products[0];
            expect(productA.name).toBe("product a");
            expect(productA.price).toBe(100);

            const productB = listResponse.body.products[1];
            expect(productB.name).toBe("product b");
            expect(productB.price).toBe(300);

            const listResponseXML = await request(app)
                .get("/product")
                .set("Accept", "application/xml")
                .send();

            expect(listResponseXML.status).toBe(200);
            expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
            expect(listResponseXML.text).toContain(`<products>`);
            expect(listResponseXML.text).toContain(`<product>`);
            expect(listResponseXML.text).toContain(`<name>product a</name>`);
            expect(listResponseXML.text).toContain(`<price>100</price>`);
            expect(listResponseXML.text).toContain(`</product>`);

            expect(listResponseXML.text).toContain(`<name>product b</name>`);
            expect(listResponseXML.text).toContain(`<price>300</price>`);

            expect(listResponseXML.text).toContain(`</products>`);
        });
    });

    describe('product find', () => {
        it('should find a product by id', async () => {
            const productA = await request(app)
                .post("/product")
                .send({
                    type: "a",
                    name: "product a",
                    price: 100
                });

            const response = await request(app)
                .get("/product")
                .send({
                    id: productA.body.id,
                });

            expect(response.status).toBe(200);
            expect(response.body.id).toBe(response.body.id);
            expect(response.body.name).toBe("product a");
            expect(response.body.price).toBe(100);
        });
    });

    describe('product update', () => {
        it('should update a product by id', async () => {
            const productA = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "product a",
                price: 100
            });

        expect(productA.status).toBe(200);
        expect(productA.body.name).toBe("product a");
        expect(productA.body.price).toBe(100);

        const productUpdated = await request(app)
            .put("/product")
            .send({
                id: productA.body.id,
                name: "product a updated",
                price: 300
            });

        expect(productUpdated.status).toBe(200);
        expect(productUpdated.body.name).toBe("product a updated");
        expect(productUpdated.body.price).toBe(300);
        })
    })
});
