import { Routes } from '@angular/router';
import { MainLayoutComponentComponent } from './shared/components/main-layout/main-layout';
import { UpdateProductComponent } from './admin/components/update-product/update-product.component';
import { DeleteProductComponent } from './admin/components/delete-product/delete-product.component';
import { HomeComponent } from './shared/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { AboutComponent } from './shared/components/about/about.component';
import { PolicyComponent } from './shared/components/policy/policy.component';
import { AddProductComponent } from './admin/components/add-product/add-product.component';
import { AdminGuard } from './admin/gaurds/adminGaurd';
import { CartComponent } from './user/components/cart/cart.component';
import { authGuard } from './user/guards/auth.guards';
import { CheckoutComponent } from './user/components/checkout/checkout.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component';
import { ProfileComponent } from './user/components/profile/profile.component';

export const routes: Routes = [
    {path:'' , component : MainLayoutComponentComponent , children:[

        {path:'home' , component: HomeComponent},
        {path:'about' , component: AboutComponent},
        {path:'products' , component: ProductsComponent},
        {path:'policy' , component: PolicyComponent},
        {path: 'login' , component: LoginComponent},   
        {path: 'logout' , component: LoginComponent},
        {path: 'register' , component: RegisterComponent},
        {path:'' , redirectTo: 'home' , pathMatch :'full'}, 
        
    ]},


    {path:'' , component : UserLayoutComponent , children:[
        {path: 'profile' , component: ProfileComponent , canActivate:[ authGuard]},
        {path: 'cart' , component: CartComponent , canActivate:[ authGuard]},
        {path: 'Checkout' , component: CheckoutComponent , canActivate:[ authGuard]},
    ]},

    {path:'' , component : AdminLayoutComponent , children:[

        {
            path: 'products',
            children: [
              { path: 'add', component: AddProductComponent, canActivate: [AdminGuard] },
              { path: 'update', component: UpdateProductComponent, canActivate: [AdminGuard] },
              { path: 'delete', component: DeleteProductComponent, canActivate: [AdminGuard] }
            ]
          }
        
    ]},


    {path:'**' , component: NotFoundComponent},










];