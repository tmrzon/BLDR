
import { Component, ViewChild, OnInit, Input } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { DisplayArr } from '../../CLASSES/statistics';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  // title: ApexTitleSubtitle;
  colors: String[];
};

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss']
})
export class ChartPieComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @Input() displayArr:DisplayArr[];
  @Input() title:string;
  // seriesArr = [];
  // labelsArr = [];
  public chartOptions: Partial<ChartOptions>;
  ngOnInit(): void {
    this.chartOptions = {
      //series: [44, 55, 13, 43, 22],
      series: this.displayArr.map(item => item.amount),
      // fill: {
      //   colors: ['#1A73E8', '#B32824']
      // },
      colors: ['#FBCD4F', '#D69E02', '#F0BE36', '#FFF3D1'],
      chart: {
        width: 450,
        type: "pie"
      },
//      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      labels: this.displayArr.map(item => item.title),
      // title: {
      //   text: this.title
      // },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

  }
  constructor() {
//     this.chartOptions = {
//       //series: [44, 55, 13, 43, 22],
//       series: this.displayArr.map(item => item[1]),
//       chart: {
//         width: 380,
//         type: "pie"
//       },
// //      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
//       labels: this.displayArr.map(item => item[0]),
//       responsive: [
//         {
//           breakpoint: 480,
//           options: {
//             chart: {
//               width: 200
//             },
//             legend: {
//               position: "bottom"
//             }
//           }
//         }
//       ]
//     };
  }
}

