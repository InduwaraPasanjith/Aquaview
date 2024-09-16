import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { PlantFormComponent } from './components/plant-form/plant-form.component';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { LoginComponent } from './components/login/login.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import {HomeComponent} from './components/home/home.component'
import {WaterQualityFormComponent} from  './components/water-quality-form/water-quality-form.component'
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: 'employees',
    component: EmployeeListComponent,
  },
  {
    path: 'plants',
    component: PlantListComponent,
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent,
  },
  {
    path: 'create-employee',
    component: EmployeeFormComponent,
  },
  {
    path: 'employee/:id',
    component: EmployeeFormComponent,
  },
  {
    path: 'plant-list',
    component: PlantListComponent,
  },
  {
    path: 'create-plant',
    component: PlantFormComponent,
  },
  {
    path: 'plant/:id',
    component: PlantFormComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'google-login',
    component: GoogleLoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'report',
    component: WaterQualityFormComponent,
  },
  {
    path: 'resetPassword',
    component : ResetPasswordComponent
  }
];
