import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { getProduct } from './shared/resolvers/get-product.resolve';
import { getProducts } from './shared/resolvers/get-products.resolve';

export const routes: Routes = [
    {
        path: '',
        resolve: {
            products: getProduct
        },
        component: ListComponent
    },
    {
        path: 'criar-produto',
        // component: CreateComponent
        loadComponent: () => import('./features/create/create.component').then((m) => m.CreateComponent)
    },
    {
        path: 'editar-produto/:id',
        resolve: {
            product: getProducts
        },
        loadComponent: () => import('./features/edit/edit.component').then(m => m.EditComponent)
    }
];
