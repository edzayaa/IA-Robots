import type { FastifyPluginAsync } from "fastify";
import type { GetProductsUseCase } from "../application/use-cases/get-products.usecase.js";
import type { GetProductByHandleUseCase } from "../application/use-cases/get-product-by-handle.usecase.js";
import type { PredictiveSearchUseCase } from "../application/use-cases/predictive-search.usecase.js";

import { ProductsController } from "./products.controller.js";
import { getProductByHandleParamsSchema, predictiveSearchQuerySchema } from "./products.schema.js";

export const productsRoutes: FastifyPluginAsync = async (fastify) => {
    const { 
        getProductsUseCase, 
        getProductByHandleUseCase,
        predictiveSearchUseCase

    } = fastify.diContainer.cradle as {
        getProductsUseCase: GetProductsUseCase;
        getProductByHandleUseCase: GetProductByHandleUseCase;
        predictiveSearchUseCase: PredictiveSearchUseCase;
    };
    const productsController = new ProductsController(
        getProductsUseCase, 
        getProductByHandleUseCase, 
        predictiveSearchUseCase
    );

    fastify.get('/products', async (request, reply) => {
        await productsController.getProducts(request, reply);
    });

    fastify.get('/products/:handle', { schema: { params: getProductByHandleParamsSchema } }, async (request, reply) => {
        await productsController.getProductByHandle(request, reply);
    });

    fastify.get('/predictive-search', { schema: { querystring: predictiveSearchQuerySchema } }, async (request, reply) => {
        await productsController.predictiveSearch(request, reply);
    });
}