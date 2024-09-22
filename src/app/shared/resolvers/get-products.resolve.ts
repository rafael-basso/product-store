import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ProductsService } from "../services/products.service";

export const getProducts = (route: ActivatedRouteSnapshot) => {
    const productService = inject(ProductsService);
    return productService.get(route.paramMap.get('id') as string);
}