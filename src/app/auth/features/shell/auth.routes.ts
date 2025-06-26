import { Routes } from "@angular/router";

export default
[
    { path: '', redirectTo: 'log-in', pathMatch: 'full' },
    { path: 'log-in', loadComponent: () => import('../log-in/log-in') },
    /* { path: 'sign-up', loadComponent: () => import('../sign-up/sign-up') }, */
    /* { path: '**', redirectTo: 'log-in'} */
]as Routes;