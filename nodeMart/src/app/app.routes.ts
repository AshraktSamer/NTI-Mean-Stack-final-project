import { Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { AboutComponent } from './shared/components/about/about.component';
import { PolicyComponent } from './shared/components/policy/policy.component';
import { AddProductComponent } from './admin/components/add-product/add-product.component';
import { CartComponent } from './user/components/cart/cart.component';
import { CheckoutComponent } from './user/components/checkout/checkout.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component';
import { ProfileComponent } from './user/components/profile/profile.component';
import { SharedLayoutComponent } from './shared/components/shared-layout/shared-layout.component';
import { adminGuard } from './admin/gaurds/admin.guard';
import { userGuard } from './user/guards/user.guard';
import { NotAuthorizedComponent } from './shared/components/not-authorized/not-authorized.component';
import { guestGuard } from './shared/guards/guest.guard';

export const routes: Routes = [
    {
        path: '',
        component: SharedLayoutComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'notAuthorized', component: NotAuthorizedComponent },
            { path: 'about', component: AboutComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'policy', component: PolicyComponent },
            { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
            { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
        ]

    },


    {
        path: 'user',
        component: UserLayoutComponent,
        children: [
            { path: 'profile', component: ProfileComponent, canActivate: [userGuard] },
            { path: 'cart', component: CartComponent, canActivate: [userGuard] },
            { path: 'Checkout', component: CheckoutComponent, canActivate: [userGuard] },
        ]
    },

    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [

            {
                path: 'products',
                children: [
                    { path: 'add', component: AddProductComponent, canActivate: [adminGuard] },
                                ]
            }

        ]
    },


    { path: '**', component: NotFoundComponent },










];