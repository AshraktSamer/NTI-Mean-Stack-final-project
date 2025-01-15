import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CustomLayoutComponentComponent } from './components/custom-layout/custom-layout';
import { MainLayoutComponentComponent } from './components/main-layout/main-layout';
import { ProductsComponent } from './components/products/products.component';
import { AboutComponent } from './components/about/about.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RegisterComponent } from './components/register/register.component';
import { PolicyComponent } from './components/policy/policy.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guards';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UpdateProductComponent } from './components/updateDeleteProduct/update-product.component';
import { AdminGuard } from './guards/adminGaurd';

export const routes: Routes = [
    {path:'' , component : MainLayoutComponentComponent , children:[

        {path:'home' , component: HomeComponent},
        {path:'about' , component: AboutComponent},
        {path:'products' , component: ProductsComponent},
        {path:'policy' , component: PolicyComponent},
        {path:'product/add' , component: AddProductComponent , canActivate:[ AdminGuard]},
        {path:'Product/update' , component: UpdateProductComponent , canActivate:[ AdminGuard]},



        {path:'' , redirectTo: 'home' , pathMatch :'full'}, //default path
        
    ]},


    {path:'' , component : CustomLayoutComponentComponent , children:[


     {path: 'login' , component: LoginComponent},   
     {path: 'logout' , component: LoginComponent},
     {path: 'checkout' , component: CheckoutComponent , canActivate:[ authGuard]},


     {path: 'register' , component: RegisterComponent},

]},


    {path:'**' , component: NotFoundComponent},










];