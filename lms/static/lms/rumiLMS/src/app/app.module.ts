import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentComponent } from './components/student/student.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { ClassComponent } from './components/class/class.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentListComponent,
    StudentComponent,
    ClassListComponent,
    ClassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
