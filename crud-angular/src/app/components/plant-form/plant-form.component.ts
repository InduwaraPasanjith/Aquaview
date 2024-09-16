
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
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPlant } from '../../interfaces/plant';


@Component({
  selector: 'app-plant-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './plant-form.component.html',
  styleUrl: './plant-form.component.css'
})
export class PlantFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster=inject(ToastrService);
  plant = this.formBuilder.group({
    name: ['', [Validators.required]],
    address: ['', [Validators.required]],
  });
  employeeId!: number;
  isEdit = false;
  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.isEdit = true;
      this.httpService.getPlant(this.employeeId).subscribe((result) => {
        console.log(result);
        this.plant.patchValue(result);
      });
    }
  }

  save() {
    console.log(this.plant.value);
    const plant: IPlant= {
      name: this.plant.value.name!,
      address: this.plant.value.address!,
    };
    if (this.isEdit) {
      this.httpService
        .updatePlant(this.employeeId, plant)
        .subscribe(() => {
          console.log('success');
          this.toaster.success("Record updated sucessfully.");
          this.router.navigateByUrl('/plant-list');
        });
    } else {
      this.httpService.createPlant(plant).subscribe(() => {
        console.log('success');
        this.toaster.success("Record added sucessfully.");
        this.router.navigateByUrl('/plant-list');
      });
    }
  }

}
