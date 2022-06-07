import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MqttCloudConnectorComponent } from './mqtt-cloud-connector/mqtt-cloud-connector.component';




const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'mcc-config', component: MqttCloudConnectorComponent},
  { path: '**', redirectTo: 'home'},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
