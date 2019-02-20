import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './modules/routing/app-routing.module';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentListComponent,
    StudentComponent,
    ClassListComponent,
    ClassComponent,
    NewStudentComponent,
    NewClassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StudentApiService,
    ClassApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
