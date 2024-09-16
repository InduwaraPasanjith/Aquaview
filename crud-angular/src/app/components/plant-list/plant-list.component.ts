import { Component, inject } from '@angular/core';
import { HttpService } from '../../http.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPlant } from '../../interfaces/plant';

@Component({
  selector: 'app-plant-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './plant-list.component.html',
  styleUrl: './plant-list.component.css'
})
export class PlantListComponent {
  router = inject(Router);
  plantList: IPlant[] = [];
  httpService = inject(HttpService);
  toaster = inject(ToastrService);
  displayedColumns: string[] = [
    'id',
    'name',
    'address',
    'action',
  ];
  ngOnInit() {
    this.getPlantFromServer();
  }

  getPlantFromServer() {
    debugger
    this.httpService.getAllPlant().subscribe((result) => {
      this.plantList = result;
      console.log(this.plantList);
    });
  }

  edit(id: number) {
    debugger
    console.log(id);
    this.router.navigateByUrl('/plant/' + id);
  }
  delete(id: number) {
    this.httpService.deletePlant(id).subscribe(() => {
      console.log('deleted');
      // this.employeeList=this.employeeList.filter(x=>x.id!=id);
      this.getPlantFromServer();
      this.toaster.success('Record deleted sucessfully');
    });
  }

}
