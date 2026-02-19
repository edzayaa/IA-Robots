import type { FastifyReply, FastifyRequest } from "fastify";
import { ok } from "#shared/http/response-mapper.js";
import type { GetProductsUseCase } from "../application/use-cases/get-products.usecase.js";
import type { GetProductByHandleUseCase } from "../application/use-cases/get-product-by-handle.usecase.js";
import type { PredictiveSearchUseCase } from "../application/use-cases/predictive-search.usecase.js";

export class ProductsController {
    constructor(
        private readonly getProductsUseCase: GetProductsUseCase,
        private readonly getProductByHandleUseCase: GetProductByHandleUseCase,
        private readonly predictiveSearchUseCase: PredictiveSearchUseCase
    ) {}

    async getProducts(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const products = await this.getProductsUseCase.execute();
        reply.send(ok(products));
    }

    async getProductByHandle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const { handle } = request.params as { handle: string };
        const product = await this.getProductByHandleUseCase.execute(handle);
        reply.send(ok(product));
    }

    async predictiveSearch(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const { query } = request.query as { query: string };
        const results = await this.predictiveSearchUseCase.execute(query);
        reply.send(ok(results));
    }
}