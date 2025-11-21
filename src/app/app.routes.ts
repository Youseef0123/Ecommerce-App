import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';

import { HomeComponent } from './features/home/home.component';
import { NotfoundComponent } from './features/notfound/notfound.component';

import { authGuard } from './core/guard/auth-guard';
import { isloggedGuard } from './core/guard/islogged-guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isloggedGuard],
    title: 'Auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./core/auth/forgotpassword/forgotpassword.component').then(
            (c) => c.ForgotpasswordComponent
          ),
        title: 'Forgot Password',
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    title: 'Blank',
    children: [
      { path: 'home', component: HomeComponent, title: 'Home' },
      {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart.component').then((c) => c.CartComponent),
        title: 'Cart',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then((c) => c.ProductsComponent),
        title: 'Products',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/details/details.component').then((c) => c.DetailsComponent),
        title: 'Details',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then((c) => c.BrandsComponent),
        title: 'Brands',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then((c) => c.CheckoutComponent),
        title: 'Checkout',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders.component').then((c) => c.AllordersComponent),
        title: 'All Orders',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then((c) => c.CategoriesComponent),
        title: 'Categories',
      },

      {
        path: 'wishlist',
        loadComponent: () =>
          import('./features/wishlist/wishlist.component').then((c) => c.WishlistComponent),
        title: 'Wishlist',
      },
      {
        path: '**',
        component: NotfoundComponent,
        title: 'NotFound',
      },
    ],
  },
];
