import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPlant } from '../../interfaces/plant';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeeFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);

  employeeForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    nic: ['', [Validators.required]],
    address: ['', [Validators.required]],
    plant: [this.formBuilder.control<IPlant | null>(null, Validators.required)],
    userType: ['', Validators.required], // Add userType control
  });

  employeeId!: number;
  isEdit = false;
  plants: IPlant[] = [];

  userTypes = [
    { value: 'admin', viewValue: 'Admin User' },
    { value: 'normal', viewValue: 'Normal User' }
  ];

  ngOnInit() {
    this.fetchStations();
    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.isEdit = true;
      this.httpService.getEmployee(this.employeeId).subscribe((result) => {
        console.log(result);
        this.employeeForm.patchValue(result);
        this.employeeForm.controls.email.disable();
      });
    }
  }

  fetchStations() {
    this.httpService.getAllPlant().subscribe((data) => {
      this.plants = data;
      console.log(this.plants);
    });
  }

  save() {
    console.log(this.employeeForm.value);
    const employee: IEmployee = {
      name: this.employeeForm.value.name!,
      phone: this.employeeForm.value.phone!,
      email: this.employeeForm.value.email!,
      nic: this.employeeForm.value.nic!,
      address: this.employeeForm.value.address!,
      plant: this.employeeForm.value.plant!,
      userType: this.employeeForm.value.userType!, // Include userType in the employee object
    };
    if (this.isEdit) {
      this.httpService.updateEmployee(this.employeeId, employee).subscribe(() => {
        console.log('success');
        this.toaster.success('Record updated successfully.');
        this.router.navigateByUrl('/employee-list');
      });
    } else {
      this.httpService.createEmployee(employee).subscribe(() => {
        console.log('success');
        this.toaster.success('Record added successfully.');
        this.router.navigateByUrl('/employee-list');
      });
    }
  }
}
