import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ItemTransaction} from '../../../models/transaction/item-transaction';
import {ChartData, ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-item-transaction-graph',
  templateUrl: './item-transaction-graph.component.html',
  styleUrls: ['./item-transaction-graph.component.scss']
})
export class ItemTransactionGraphComponent implements OnInit, OnChanges {

  @Input() transactions: ItemTransaction[];

  prices: number[];
  dates: any[];

  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions: (ChartOptions & { annotation: any });
  lineChartLegend: boolean;
  lineChartType: ChartType;

  graphReady: boolean;

  constructor() {
    this.transactions = [];
    this.prices = [];
    this.dates = [];

    this.graphReady = false;
  }

  preprocessData(): void {
    this.transactions.forEach(transaction => {
      this.prices.push(transaction.price);
      const d = new Date(transaction.createdAt);
      this.dates.push(d.getDate() + '.' + d.getMonth() + '.' + d.getFullYear());
    });
  }

  initGraph(): void {
    this.preprocessData();
    console.log(this.prices);
    console.log(this.dates);
    this.lineChartData = [
      {
        data: this.prices, label: 'Prices',
      }
    ];
    this.lineChartLabels = this.dates;
    this.lineChartOptions = {
      responsive: true,
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        xAxes: [{}],
        yAxes: [
          {
            id: 'y-axis-0',
            position: 'left',
          },
          {
            id: 'y-axis-1',
            position: 'right',
            gridLines: {
              color: 'rgba(255,0,0,0.3)',
            },
            ticks: {
              fontColor: 'red',
            }
          }
        ]
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              enabled: true,
              fontColor: 'orange',
              content: 'LineAnno'
            }
          },
        ],
      },
    };
    this.lineChartLegend = true;
    this.lineChartType = 'line';
    this.graphReady = true;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.transactions);
    this.graphReady = false;
    this.initGraph();
  }
}
