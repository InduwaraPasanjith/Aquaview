import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../http.service';
import { IWaterQuality } from '../../interfaces/waterQuality';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-water-quality-form',
  standalone: true,
  imports: [
    MatInputModule, 
    MatButtonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    CommonModule  // Add CommonModule to imports array
  ],
  templateUrl: './water-quality-form.component.html',
  styleUrls: ['./water-quality-form.component.css'],
})
export class WaterQualityFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);

  // Variable to store the prediction response
  predictionResult: any = {};

  employeeForm = this.formBuilder.group({
    TSS: [0, [Validators.required]],
    Chlorine: [0, [Validators.required]],
    pH: [0, [Validators.required]],
    COD: [0, []],
    temperature: [0, [Validators.required]],
  });

  save() {
    const employee: IWaterQuality = {
      TSS: this.employeeForm.value.TSS,
      Chlorine: this.employeeForm.value.Chlorine,
      pH: this.employeeForm.value.pH,
      COD: this.employeeForm.value.COD,
      temperature: this.employeeForm.value.temperature,
    };

    this.httpService.checkWaterQuality(employee).subscribe(
      (response: any) => {
        // Store the entire response object
        this.predictionResult = response;
        this.toaster.success('Predict successfully.');
      },
      (error) => {
        this.toaster.error('Error occurred while adding the record.');
        console.error(error);
      }
    );
  }

  // Helper method to get the keys of an object (used in the template)
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
