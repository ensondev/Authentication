import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: 'auth', 
        canActivate:[publicGuard],  
        loadChildren: () => import('./auth/features/shell/auth.routes')
    },
    {  path: 'home',
        canActivate:[privateGuard],
        loadComponent: () => import('./pages/home/home').then(m => m.Home)},
    { path: 'manage-users', loadComponent: () => import('./pages/manage-users/manage-users').then(m => m.ManageUsers)},
    { path: '**', redirectTo: 'home'}
];
