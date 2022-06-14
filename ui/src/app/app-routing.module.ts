import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRepositoryComponent } from './app-repository/app-repository.component';
import { AppsComponent } from './apps/apps.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MqttCloudConnectorComponent } from './mqtt-cloud-connector/mqtt-cloud-connector.component';
import { OpcuaMqttConnectorComponent } from './opcua-mqtt-connector/opcua-mqtt-connector.component';
import { SettingsComponent } from './settings/settings.component';
import { SystemComponent } from './system/system.component';
import { UsersComponent } from './users/users.component';




const routes: Routes = [

  { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
  { path: 'Dashboard', component: DashboardComponent},
  { path: 'Apps', component: AppsComponent},
  { path: 'App-Repository', component: AppRepositoryComponent},
  { path: 'Users', component: UsersComponent},
  { path: 'System', component: SystemComponent},
  { path: 'Settings', component: SettingsComponent},
  { path: 'mqtt-cloud-connector', component: MqttCloudConnectorComponent},
  { path: 'opcua-mqtt-connector', component: OpcuaMqttConnectorComponent},
  { path: '**', redirectTo: 'Dashboard'},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
