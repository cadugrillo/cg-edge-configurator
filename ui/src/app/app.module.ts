import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppsComponent } from './apps/apps.component';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './token.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CgEdgeConfigService } from './cg-edge-config.service';
import { Menu1Item1Component } from './menu1-item1/menu1-item1.component'
import { Menu1Item1Side1Component } from './menu1-item1-side1/menu1-item1-side1.component'
import { MqttCloudConnectorComponent } from './mqtt-cloud-connector/mqtt-cloud-connector.component';
import { OpcuaMqttConnectorComponent } from './opcua-mqtt-connector/opcua-mqtt-connector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { MessagePopupComponent } from './message-popup/message-popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRepositoryComponent } from './app-repository/app-repository.component';
import { UsersComponent } from './users/users.component';
import { SystemComponent } from './system/system.component';
import { SettingsComponent } from './settings/settings.component';
import { CgEdgeContainersService } from './cg-edge-containers.service';
import { CgEdgeSystemService } from './cg-edge-system.service';
import { WaitPopupComponent } from './wait-popup/wait-popup.component';
import { SysRestartPopupComponent } from './sys-restart-popup/sys-restart-popup.component';
import { SysShutdownPopupComponent } from './sys-shutdown-popup/sys-shutdown-popup.component';
import { CgEdgeUsersService } from './cg-edge-users.service';

@NgModule({
  declarations: [
    AppComponent,
    AppsComponent,
    Menu1Item1Component,
    Menu1Item1Side1Component,
    MqttCloudConnectorComponent,
    OpcuaMqttConnectorComponent,
    MessagePopupComponent,
    DashboardComponent,
    AppRepositoryComponent,
    UsersComponent,
    SystemComponent,
    SettingsComponent,
    WaitPopupComponent,
    SysRestartPopupComponent,
    SysShutdownPopupComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [CgEdgeConfigService, CgEdgeContainersService, CgEdgeSystemService, CgEdgeUsersService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
