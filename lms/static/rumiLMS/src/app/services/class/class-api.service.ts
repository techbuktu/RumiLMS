import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassApiService {
  ApiUrl:string = 'http://localhost:8000/api/classes/';

  constructor( private Http: HttpClient) { }

  getAllClasses(){
    return this.Http.get(this.ApiUrl);
  }

  getClassbyUrl(class_url){
    return this.Http.get(this.ApiUrl + class_url);
  }

  getClassbyFullUrl(full_url:string){
    return this.Http.get(full_url);
  }

  addNewClass(class_data){
    return this.Http.post(this.ApiUrl, class_data);
  }

  updateClass(class_url, updated_class_data){
    return this.Http.put(this.ApiUrl + class_url + '/', updated_class_data);
  }

  deleteClass(class_url){
    return this.Http.delete(this.ApiUrl + class_url);
  }

}
