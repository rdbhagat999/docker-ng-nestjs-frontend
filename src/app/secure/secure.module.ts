import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SecureComponent } from './secure.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { RolesComponent } from './roles/roles.component';
import { CreateRoleComponent } from './roles/create-role/create-role.component';
import { UpdateRoleComponent } from './roles/update-role/update-role.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { UpdateOrderComponent } from './orders/update-order/update-order.component';

const routes: Routes = [
  { path: '', component: SecureComponent,
    children: [
      { path: '', redirectTo: '/main/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, },
      { path: 'profile', component: ProfileComponent },
      { path: 'users',
        children: [
          { path: '', component: UsersComponent, pathMatch: 'full' },
          { path: 'create', component: CreateUserComponent },
          { path: ':id/edit', component: UpdateUserComponent },
        ]
      },
      { path: 'roles',
        children: [
          { path: '', component: RolesComponent, pathMatch: 'full' },
          { path: 'create', component: CreateRoleComponent },
          { path: ':id/edit', component: UpdateRoleComponent },
        ]
      },
      { path: 'products',
        children: [
          { path: '', component: ProductsComponent, pathMatch: 'full' },
          { path: 'create', component: CreateProductComponent },
          { path: ':id/edit', component: UpdateProductComponent },
        ]
      },
      { path: 'orders',
        children: [
          { path: '', component: OrdersComponent, pathMatch: 'full' },
          { path: 'create', component: CreateOrderComponent },
          { path: ':id/edit', component: UpdateOrderComponent },
        ]
      },
    ],
  },
];

@NgModule({
  declarations: [
    NavComponent,
    SidebarComponent,
    SecureComponent,
    ProfileComponent,
    DashboardComponent,
    UsersComponent,
    ProductsComponent,
    OrdersComponent,
    CreateUserComponent,
    UpdateUserComponent,
    RolesComponent,
    CreateRoleComponent,
    UpdateRoleComponent,
    CreateProductComponent,
    UpdateProductComponent,
    CreateOrderComponent,
    UpdateOrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SecureModule { }
