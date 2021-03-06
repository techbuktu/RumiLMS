import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import all components from /app/components for use in routing requests
import { HomeComponent } from '../../components/home/home.component';
import { StudentListComponent } from '../../components/student-list/student-list.component';
import { StudentComponent } from '../../components/student/student.component';
import { ClassListComponent } from '../../components/class-list/class-list.component';
import { ClassComponent } from '../../components/class/class.component';
import { NewStudentComponent } from '../../components/new-student/new-student.component';
import { NewClassComponent } from '../../components/new-class/new-class.component';

const routes: Routes = [
	{
	   path: '',
           component: HomeComponent
	},
	{
		path: 'classes',
		component: ClassListComponent
	},
	{
	   path: 'students',
	   component: StudentListComponent
	 },

	 {
		 path: 'students/new-student',
		 component: NewStudentComponent
	 },

	 {
		 path: 'classes/new-class',
		 component: NewClassComponent
	 },
	{
	   path: 'students/:studentUrl',
	   component: StudentComponent
	},
	{
		path: 'classes/:classUrl',
		component: ClassComponent
	},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppRoutingModule { }
