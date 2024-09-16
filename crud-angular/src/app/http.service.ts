import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee } from './interfaces/employee';
import { IWaterQuality } from './interfaces/waterQuality';
import { IPlant } from './interfaces/plant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = 'http://localhost:5280';
  http = inject(HttpClient);
  constructor() {}

  getAllEmployee() {
    console.log('getAllEmployee', localStorage.getItem('token'));
    return this.http.get<IEmployee[]>(this.apiUrl + '/api/Employee');
  }

  getAllPlant() {
    //console.log('getAllPlant', localStorage.getItem('token'));
    return this.http.get<IPlant[]>(this.apiUrl + '/api/plant');
  }

  createEmployee(employee: IEmployee) {
    return this.http.post(this.apiUrl + '/api/Employee', employee);
  }

  createPlant(plant: IPlant) {
    return this.http.post(this.apiUrl + '/api/plant', plant);
  }

  /*checkWaterQuality(employee: IWaterQuality) {
    return this.http.post(this.apiUrl + '/api/waterQuality/predict', employee);
  }*/

  checkWaterQuality(data: IWaterQuality): Observable<any> {
    return this.http.post(this.apiUrl + '/api/waterQuality/predict', data);
  }

  getEmployee(employeeId: number) {
    return this.http.get<IEmployee>(
      this.apiUrl + '/api/Employee/' + employeeId
    );
  }

  getPlant(pnatId: number) {
    return this.http.get<IPlant>(
      this.apiUrl + '/api/plant/' + pnatId
    );
  }

  updateEmployee(employeeId: number, employee: IEmployee) {
    return this.http.put<IEmployee>(
      this.apiUrl + '/api/Employee/' + employeeId,
      employee
    );
  }
  updatePlant(plantId: number, employee: IPlant) {
    return this.http.put<IPlant>(
      this.apiUrl + '/api/plant/' + plantId,
      employee
    );
  }


  deleteEmployee(employeeId: number) {
    return this.http.delete(this.apiUrl + '/api/Employee/' + employeeId);
  }

  deletePlant(plantId: number) {
    return this.http.delete(this.apiUrl + '/api/plant/' + plantId);
  }

  login(email: string, password: string) {
    debugger;
    return this.http.post<{ token: string }>(this.apiUrl + '/api/Auth/login', {
      email: email,
      password: password,
    });
  }

  resetPassword(currentPassword: string, newpassword: string) {
    debugger;
    return this.http.post(this.apiUrl + '/api/Auth/resetPassword', {
      currentPassword: currentPassword,
      newpassword: newpassword
    });
  }

  googleLogin(idToken: string) {
    return this.http.post<{ token: string }>(
      this.apiUrl + '/api/Auth/google-login',
      {
        idToken: idToken,
      }
    );
  }
}
