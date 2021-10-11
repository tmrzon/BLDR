// import { Component, OnInit } from '@angular/core';

import { Component, ViewChild, OnInit, Input } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  colors: String[];
};

// @Component({
//   selector: 'app-chart-columns',
//   templateUrl: './chart-columns.component.html',
//   styleUrls: ['./chart-columns.component.scss']
// })
// export class ChartColumnsComponent implements OnInit {

//   constructor() { }

// ngOnInit(): void {
// }

// }

@Component({
  selector: "app-chart-columns",
  templateUrl: './chart-columns.component.html',
  styleUrls: ['./chart-columns.component.scss']
})
export class ChartColumnsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() displayArr: number[];

  constructor() {

  }
  ngOnInit(): void {
    let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let thisMonth = new Date().getMonth();
    let categories = [];
    for (let i = 0; i < 12; i++) {
      categories.push(months[thisMonth]);
      if (thisMonth == 0)
        thisMonth = 11;
      else
        thisMonth--;
    }

    this.chartOptions = {
      series: [
        {
          name: "yearUsers",
          // data: this.displayArr.map(item => item)
          data: this.displayArr
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      colors: ['#FBCD4F', '#D69E02', '#F0BE36', '#FFF3D1'],
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: categories,
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "";
          }
        }
      },
      title: {
        text: "i",
        // floating: 0,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }
}
