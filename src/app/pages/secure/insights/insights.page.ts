import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { isWithinInterval } from 'date-fns';
import { BaseChartDirective } from 'ng2-charts';
import { GlobalService } from 'src/app/providers/global.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { InvestimentosService } from 'src/app/services/investimentos.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.page.html',
  styleUrls: ['./insights.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InsightsPage implements OnInit {

  // @ViewChild(BaseChartDirective) chart: ElementRef;//BaseChartDirective | undefined
  @ViewChild('gBarra') chart: ElementRef | undefined;

  labels = [];
  dados = [];
  bar: any;
  total = 0;

  public bar_chart_option: ChartConfiguration['options'] = {
    font: {
      family: 'Inter'
    },
    animation: {
      easing: 'easeInOutElastic',
      delay: 25
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          borderColor: this.helperService.getColorVariable('medium'),
          color: this.helperService.getColorVariable('medium'), 
          borderWidth:0.3,
          borderDashOffset:0.1,
          lineWidth:0.3
        },
        ticks: {
          color: this.helperService.getColorVariable('tertiary'),
          font: {
            family: 'Inter',
            weight: '100'
          }
        }
      },
      y: {
        position: 'right',
        grid: {
          borderColor: this.helperService.getColorVariable('medium'),
          color: this.helperService.getColorVariable('medium'),
          borderWidth:0.3,
          borderDashOffset:0.1,
          lineWidth:0.3
        },
        ticks: {
          color: this.helperService.getColorVariable('tertiary'),
          font: {
            family: 'Inter',
            weight: '100'
          },
          callback: function (value, index, ticks) {
            return '$' + value;
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: this.helperService.getColorVariable('dark'),
        bodyColor: this.helperService.getColorVariable('primary'),
        titleColor: this.helperService.getColorVariable('tertiary'),
        titleFont: {
          size: 14,
          weight: 'normal'
        },
        bodyFont: {
          size: 16,
          weight: 'bold'
        },
      
        padding: 12,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 3,
        usePointStyle: true,
        callbacks: {
          // Add currency format to tooltip
          label: function (context) {
            var label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  };

  public bar_chart_data: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  public bar_chart_type: ChartType = 'bar';

  content_loaded: boolean = false;

  constructor(
    private helperService: HelperService, private invSvc: InvestimentosService,
    private navCtrl: NavController, private gs: GlobalService, private platform: Platform
  ) { }

  ngOnInit() {

    // Create bar chart
    // this.createBarChart();

    this.platform.ready().then(() => {

      this.invSvc.meusInvestimentos().subscribe((d) => {
        //console.log(d);
        let labels = null;
        let dados2 = null;
        this.dados = JSON.parse(d.data).FILTERS;
        console.log(this.dados);
        this.total =0;   
        JSON.parse(d.data).FILTERS.forEach((i) => {
          if (i.VALOR_NEGOCIACAO !== '0' && i.VALOR_NEGOCIACAO !== 0 && i.VALOR_NEGOCIACAO) {
            if (!dados2) {
              labels = [];
              dados2 = [];
            }
            labels.push(i.DESCR);
            dados2.push(parseFloat(i.VALOR_NEGOCIACAO));
            this.total += parseFloat(i.VALOR_NEGOCIACAO);
          }
        });
       setTimeout(() => {
          this.createBarChart(labels, dados2);
        }, 2000);
      }, null, null);

    });


  }

  ionViewDidEnter() {
    this.ngOnInit();
    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);

  }

  ionViewDidLeave(){
    this.bar.destroy();
  }

  // Create bar chart
  createBarChart(labels?, dados?) {

    this.generateColorArray(labels?.length);
    this.bar = new Chart(this.chart.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,//['S1asd', 'S2qwet', 'S3asd', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers in millions',
          data: dados,//[2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: this.colorArray,//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: this.colorArray,//'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 0,
        }]
      },
      options: {
        font: {
          family: 'Inter'
        },
        animation: {
         easing: 'easeInOutElastic',
          delay: 25
        },
        layout:{
          padding:{
            bottom:10
          },
        },
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            grid: {
              borderColor: this.helperService.getColorVariable('medium'),
              color: this.helperService.getColorVariable('medium'),
              borderWidth:0.3,
              borderDashOffset:0.1,
              lineWidth:0.3,
            },
            ticks: {
              color: this.helperService.getColorVariable('tertiary'),
              font: {
                family: 'Inter',
                weight: '100'
              },
              maxRotation: 90,
              minRotation: 90,
            }
          },
          y: {
            position: 'right',
            grid: {
              borderColor: this.helperService.getColorVariable('medium'),
              color: this.helperService.getColorVariable('medium'),
              borderWidth:0.3,
              borderDashOffset:0.1,
              lineWidth:0.3,
            },
            ticks: {
              color: this.helperService.getColorVariable('tertiary'),
              font: {
                family: 'Inter',
                weight: '100'
              },
              callback: function (value, index, ticks) {
                return '$' + value;
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: this.helperService.getColorVariable('dark'),
            bodyColor: this.helperService.getColorVariable('primary'),
            titleColor: this.helperService.getColorVariable('tertiary'),
            titleFont: {
              size: 14,
              weight: 'normal'
            },
            bodyFont: {
              size: 16,
              weight: 'bold'
            },
            padding: 12,
            boxWidth: 10,
            boxHeight: 10,
            boxPadding: 3,
            usePointStyle: true,
            callbacks: {
              // Add currency format to tooltip
              label: function (context) {
                var label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  //label += context.parsed.y;
                  label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                return label;
              }
            }
          }
        }
      }
    });
  }

  detalhes(item) {
    this.navCtrl.navigateForward('/insights/detail', { queryParams: { d: item } });
  }

  colorArray = [];
  generateColorArray(num) {
    this.colorArray = [];
    //for (let i = 0; i < num; i++) {
    //  this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    //}

    

    let cores=[];
  //  cores.push('#9370DB');
  //  cores.push('#A020F0');
  //  cores.push('#8A2BE2');
  //  cores.push('#9400D3');
  //  cores.push('#9932CC');
  //  cores.push('#BA55D3');
  //  cores.push('#DA70D6');
  //  cores.push('#00FF00');
  //  cores.push('#DDA0DD');
  //  cores.push('#EE82EE');
  //  cores.push('#FF00FF');
  //  cores.push('#D02090');

  cores.push('#00FFFF');
  cores.push('#00CED1');
  cores.push('#40E0D0');
  cores.push('#48D1CC');
  cores.push('#20B2AA');
  cores.push('#008B8B');
  cores.push('#008080');
  cores.push('#7FFFD4');
  cores.push('#66CDAA');
  cores.push('#5F9EA0');
  cores.push('#FF00FF');
  cores.push('#D02090');

    this.colorArray = cores.slice(0,num);


  }
}
