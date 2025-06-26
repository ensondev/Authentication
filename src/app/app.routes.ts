import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    // Public routes
    { path: 'auth', canActivate:[publicGuard],  loadChildren: () => import('./auth/features/shell/auth.routes') },


    // Private routes
    { path: 'sign-up', canActivate:[privateGuard], loadComponent: () => import('../app/auth/features/sign-up/sign-up') },
    { path: 'home', canActivate:[privateGuard],loadComponent: () => import('./pages/home/home').then(m => m.Home) },
    { path: 'donates', canActivate:[privateGuard], loadComponent: () => import('./pages/donates/donates').then(m => m.Donates)},
    { path: 'donor', canActivate:[privateGuard], loadComponent: () => import('./pages/donor/donor').then(m => m.Donor)},
    { path: 'beneficiaries', canActivate:[privateGuard], loadComponent: () => import('./pages/beneficiaries/beneficiaries').then(m => m.Beneficiaries)},
    { path: 'inventory-register-product', canActivate:[privateGuard], loadComponent: () => import('./pages/inventory-register-product/inventory-register-product').then(m => m.InventoryRegisterProduct)},
    { path: 'inventory-insert-product', canActivate:[privateGuard], loadComponent: () => import('./pages/inventory-insert-product/inventory-insert-product').then(m => m.InventoryInsertProduct)},
    { path: 'inventory-sale-product', canActivate:[privateGuard], loadComponent: () => import('./pages/inventory-sale-product/inventory-sale-product').then(m => m.InventorySaleProduct)},
    { path: 'warehouse-inventory', canActivate:[privateGuard], loadComponent: () => import('./pages/warehouse-inventory/warehouse-inventory').then(m => m.WarehouseInventory)},
    { path: 'sales-made', canActivate:[privateGuard], loadComponent: () => import('./pages/sales-made/sales-made').then(m => m.SalesMade)},
    { path: 'cash-system', canActivate:[privateGuard], loadComponent: () => import('./pages/cash-system/cash-system').then(m => m.CashSystem)},
    { path: 'manage-users', canActivate:[privateGuard], loadComponent: () => import('./pages/manage-users/manage-users').then(m => m.ManageUsers)},
    { path: '**', redirectTo: 'home'}
];
