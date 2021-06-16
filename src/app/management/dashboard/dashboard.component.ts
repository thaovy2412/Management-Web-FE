import { Component, OnInit } from '@angular/core';
import {
  faCheckCircle,
  faSpinner,
  faExclamationCircle,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';
import { ReportService } from 'src/app/core/services/report.service';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
import { DataChart } from 'src/app/core/models/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  faPass = faCheckCircle;
  faFail = faExclamationCircle;
  faRun = faSpinner;
  faTotal = faTasks;
  pass: number = 0;
  fail: number = 0;
  running: number = 0;
  total: number = 0;
  dataChart: DataChart[] = [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartColors: Array<any> = [
    {
      backgroundColor: ['#dc3545', '#28a745', '#007bff'],
    },
  ];
  public pieChartLabels: Label[] = ['Fail', 'Pass', 'Running'];
  public pieChartData: SingleDataSet = [300, 500, 200];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor(private reportService: ReportService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            userCallback: function (label, index, labels) {
              if (Math.floor(label) === label) {
                return label;
              }
            },
          },
        },
      ],
    },
  };

  public barChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Fail',
      backgroundColor: '#dc3545',
      hoverBackgroundColor: '#c82333',
    },
    {
      data: [],
      label: 'Pass',
      backgroundColor: '#28a745',
      hoverBackgroundColor: '#218838',
    },
  ];

  ngOnInit(): void {
    this.reportService.fetchDataReport().subscribe({
      next: (result) => {
        console.log(result);
        result.forEach((item) => {
          if (item.status === 'pass') {
            this.pass++;
          }
          if (item.status === 'running') {
            this.running++;
          }
          if (item.status === 'fail') {
            this.fail++;
          }
        });
        this.total = this.pass + this.fail + this.running;
        this.pieChartData = [this.fail, this.pass, this.running];
        this.pieChartOptions = {
          responsive: true,
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                const x =
                  (+data['datasets'][0]['data'][tooltipItem['index']] /
                    this.total) *
                  100;
                let result;
                if (x % 1 === 0) {
                  result = x;
                } else {
                  result = x.toFixed(2);
                }
                return (
                  data['labels'][tooltipItem['index']] + ': ' + result + '%'
                );
              },
            },
          },
        };
      },
    });
    this.reportService.chart().subscribe({
      next: (result) => {
        console.log(result);

        result.forEach((date) => {
          const d = new Date(date.date).toLocaleDateString();
          this.barChartLabels.push(d);
          this.barChartData[0].data.push(date.fail);
          this.barChartData[1].data.push(date.pass);
        });
      },
    });
  }
}
