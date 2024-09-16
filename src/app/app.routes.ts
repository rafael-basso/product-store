import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { CreateComponent } from './features/create/create.component';

export const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'criar-produto',
        // component: CreateComponent
        loadComponent: () => import('./features/create/create.component').then((m) => m.CreateComponent)
    }
];
