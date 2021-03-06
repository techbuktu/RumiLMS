import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './modules/routing/app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpInterceptorsModule } from './modules/http-interceptors/http-interceptors.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentComponent } from './components/student/student.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { ClassComponent } from './components/class/class.component';

//Import app's API Services
import { StudentApiService } from './services/student/student-api.service';
import { ClassApiService } from './services/class/class-api.service';
import { NewStudentComponent } from './components/new-student/new-student.component';
import { NewClassComponent } from './components/new-class/new-class.component';
//Import Angular Material-based UI components
import { RumiNavComponent } from './modules/material/schematics/rumi-nav/rumi-nav.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';


//import { HttpInterceptorProviders } from './modules/http-interceptors/index';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentListComponent,
    StudentComponent,
    ClassListComponent,
    ClassComponent,
    NewStudentComponent,
    NewClassComponent,
    RumiNavComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpInterceptorsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  providers: [
    //HttpInterceptorProviders,
    StudentApiService,
    ClassApiService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
