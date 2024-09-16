import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Store the 5 charts
  public codChart: any;
  public tssChart: any;
  public chlorineChart: any;
  public phChart: any;
  public temperatureChart: any;

  // Temporary/mock data for testing
  public dates = ['2024/08/10', '2024/08/11', '2024/08/12', '2024/08/13', '2024/08/14', '2024/08/15', '2024/08/16'];
  public cod = [110, 120, 130, 140, 150, 160, 170];
  public tss = [46, 60, 38, 50, 44, 48, 60];
  public chlorine = [0.08, 0.10, 0.09, 0.07, 0.11, 0.12, 0.10];
  public ph = [7.2, 7.5, 7.6, 7.8, 7.7, 7.6, 7.9];
  public temperature = [26.1, 27.1, 28.1, 28.9, 29.0, 29.2, 30.0];

  constructor() {}

  ngOnInit(): void {
    // Load each chart
    this.loadCodChart();
    this.loadTssChart();
    this.loadChlorineChart();
    this.loadPhChart();
    this.loadTemperatureChart();
  }

  // Method to create COD chart
  loadCodChart(): void {
    this.codChart = new Chart('codCanvas', {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            label: 'COD (mg/l)',
            data: this.cod,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'COD (mg/l)'
            }
          }
        }
      }
    });
  }

  // Method to create TSS chart
  loadTssChart(): void {
    this.tssChart = new Chart('tssCanvas', {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            label: 'TSS (mg/l)',
            data: this.tss,
            borderColor: '#ffcc00',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'TSS (mg/l)'
            }
          }
        }
      }
    });
  }

  // Method to create Chlorine chart
  loadChlorineChart(): void {
    this.chlorineChart = new Chart('chlorineCanvas', {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            label: 'Chlorine (mg/l)',
            data: this.chlorine,
            borderColor: '#ff0000',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Chlorine (mg/l)'
            }
          }
        }
      }
    });
  }

  // Method to create pH chart
  loadPhChart(): void {
    this.phChart = new Chart('phCanvas', {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            label: 'pH',
            data: this.ph,
            borderColor: '#0000ff',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'pH'
            }
          }
        }
      }
    });
  }

  // Method to create Temperature chart
  loadTemperatureChart(): void {
    this.temperatureChart = new Chart('temperatureCanvas', {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: this.temperature,
            borderColor: '#ff6600',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Temperature (°C)'
            }
          }
        }
      }
    });
  }
}
