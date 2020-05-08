import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { DeviceHistoryComponent } from './device-history/device-history.component';


const routes: Routes = [
  { path: '', component:DashboardComponent, canActivate: [AuthGuard]},
  // { path: '**', component:DashboardComponent, canActivate: [AuthGuard]},
  {path:'login' , component:LoginComponent},
  {path:'dashboard' , component:DashboardComponent , canActivate: [AuthGuard]},
  {path:'history' , component:HistoryComponent , canActivate: [AuthGuard]},
  {path:'settings' , component:SettingsComponent , canActivate: [AuthGuard]},
  {path:'device-history' , component:DeviceHistoryComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
