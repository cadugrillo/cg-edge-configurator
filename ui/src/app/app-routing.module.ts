import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRepositoryComponent } from './app-repository/app-repository.component';
import { AppsComponent } from './apps/apps.component';
import { AuthGuardService } from './auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MqttCloudConnectorComponent } from './mqtt-cloud-connector/mqtt-cloud-connector.component';
import { OpcuaMqttConnectorComponent } from './opcua-mqtt-connector/opcua-mqtt-connector.component';
import { SettingsComponent } from './settings/settings.component';
import { SystemComponent } from './system/system.component';
import { UsersComponent } from './users/users.component';




const routes: Routes = [

  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent},
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: 'Apps', component: AppsComponent, canActivate: [AuthGuardService]},
  { path: 'App-Repository', component: AppRepositoryComponent, canActivate: [AuthGuardService]},
  { path: 'Users', component: UsersComponent, canActivate: [AuthGuardService]},
  { path: 'System', component: SystemComponent, canActivate: [AuthGuardService]},
  { path: 'Settings', component: SettingsComponent, canActivate: [AuthGuardService]},
  { path: 'mqtt-cloud-connector', component: MqttCloudConnectorComponent, canActivate: [AuthGuardService]},
  { path: 'opcua-mqtt-connector', component: OpcuaMqttConnectorComponent, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: 'Login'},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
