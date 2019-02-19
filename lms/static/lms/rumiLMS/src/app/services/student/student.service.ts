import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
 })

export class StudentService {
  
constructor(private localStorage: window.localStorage) { 
	
}

getAllStudents(){
	 return JSON.parse(this.localStorage.getItem('student_list'));
 }

 getStudentbyID(student_id){
 	all_students = JSON.parse(this.localStorage.getItem('student_list'));
	return all_students.findIndex(student => student.id==student_id);
 }

 addNewStudent(new_student_data){
 	let students = this.getAllStudents();
	updated_student_list = students.push(new_student_data);
	this.localStorage.setItem('student_list', JSON.stringify(updated_student_list));

}

updateStudent(student_id, updated_student_data){
	 let updated_student = this.localStorage.setItem('student'+student_id, updated_student_data);
}

deleteStudent(student_key){
	this.localStorage.removeItem(student_key);
}


}
