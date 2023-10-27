import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, ɵɵsetComponentScope } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GlobalService } from 'src/app/providers/global.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { InvestimentosService } from 'src/app/services/investimentos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardPage implements OnInit {

  // @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChild("gBarra") chart: ElementRef | undefined;

  @ViewChild("pieChart") pieChart: ElementRef | undefined;

  pie: any;
  bar: any;

  video = false;

  mensagens = [];

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
          color: this.helperService.getColorVariable('medium')
        },
        ticks: {
          color: this.helperService.getColorVariable('tertiary'),
          font: {
            family: 'Inter',
            weight: '500'
          }
        }
      },
      y: {
        position: 'right',
        grid: {
          borderColor: this.helperService.getColorVariable('medium'),
          color: this.helperService.getColorVariable('medium')
        },
        ticks: {
          color: this.helperService.getColorVariable('tertiary'),
          font: {
            family: 'Inter',
            weight: '500'
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
  };

  public bar_chart_data: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  public bar_chart_type: ChartType = 'bar';

  content_loaded: boolean = false;

  indicadores = [];

  total = 0;

  constructor(
    private gs: GlobalService, private ds: DashboardService,
    private platform: Platform, private helperService: HelperService,
    private invSvc: InvestimentosService
  ) {
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.ds.indicadores().subscribe((v) => {
        console.log(v);
        if (v.status === 200) {
          //console.log(JSON.parse(v.data.replace(/\t/g, '').replace(/\r/g, '').replace(/\n/g, '')));
          this.indicadores = JSON.parse(v.data.replace(/\t/g, '').replace(/\r/g, '').replace(/\n/g, '')).list;
          console.log(this.indicadores);
        }
      });

      this.invSvc.meusInvestimentos_grafico().subscribe((d) => { //this.invSvc.orcamentos().subscribe((d) => {
        console.log(JSON.parse(d.data));
        let labels = null;
        let dados = null;
        this.total = 0;
        JSON.parse(d.data).FILTERS.forEach((i) => {
          if (i.VALOR_NEGOCIACAO !== '0' && i.VALOR_NEGOCIACAO !== 0 && i.VALOR_NEGOCIACAO) {
            if (!dados) {
              labels = [];
              dados = [];
            }
            labels.push(i.DESCR);
            dados.push(parseFloat(i.VALOR_NEGOCIACAO));
            this.total += parseFloat(i.VALOR_NEGOCIACAO);
          }
        }
        );
        // JSON.parse(d.data).FILTERS.forEach((i) => {
        //   if (i.VALOR !== '0' && i.VALOR !== 0 && i.VALOR) {
        //     if (!dados) {
        //       labels = [];
        //       dados = [];
        //     }
        //     labels.push(i.DESCR);
        //     dados.push(parseInt(i.VALOR?.replace('.', ',')));
        //     this.total += parseFloat(i.VALOR);
        //   }
        // });

        setTimeout(() => {
          this.createBarChart2(labels, dados);
          //this.createPieChart(labels, dados);
        }, 1000);
        console.log(labels);
        console.log(dados);

        //console.log('aqui');
      });

      //RENTABILIDADE
      this.invSvc.rentabilidade_grafico().subscribe((d) => { //this.invSvc.orcamentos().subscribe((d) => {
        console.log(JSON.parse(d.data));
        let labels = null;
        let dados = null;
        this.total = 0;
        JSON.parse(d.data).FILTERS.forEach((i) => {
          if (i.VALOR_NEGOCIACAO !== '0' && i.VALOR_NEGOCIACAO !== 0 && i.VALOR_NEGOCIACAO) {
            if (!dados) {
              labels = [];
              dados = [];
            }
            labels.push(i.DESCR);
            dados.push(parseFloat(i.VALOR_NEGOCIACAO));
            this.total += parseFloat(i.VALOR_NEGOCIACAO);
          }
        });
        // JSON.parse(d.data).FILTERS.forEach((i) => {
        //   if (i.VALOR !== '0' && i.VALOR !== 0 && i.VALOR) {
        //     if (!dados) {
        //       labels = [];
        //       dados = [];
        //     }
        //     labels.push(i.DESCR);
        //     dados.push(parseInt(i.VALOR?.replace('.', ',')));
        //     this.total += parseFloat(i.VALOR);
        //   }
        // });

        setTimeout(() => {
          this.createPieChart(labels, dados);
        }, 1000);
        console.log(labels);
        console.log(dados);

        //console.log('aqui');
      });
      //RENTABILIDADE

      this.ds.mensagens().subscribe((r) => {
        // console.log(r);
        if (r.status === 200) {
          this.mensagens = JSON.parse(r.data).FILTERS;
          console.log(this.mensagens);
        }
      });

    });

    //this.createBarChart();
  }

  ionViewDidEnter() {
    this.ngOnInit();
    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 10);

    //setTimeout(() => {
    //this.createBarChart(123);
    //}, 5000);

    // this.platform.ready().then(() => {
    //   setTimeout(() => {
    //   this.createPieChart(['a','b','c','d'],[10,20,30,40]);
    //   }, 1000);
    // });

  }

  // Create bar chart
  createBarChart(labels?, dados?) {

    let helperService = this.helperService;

    // Random array of numbers
    let rand_numbers;
    if (!dados) {
      rand_numbers = [...Array(12)].map(e => Math.random() * 100 | 0);
    } else {
      rand_numbers = dados;
    }
    //console.log(dados);
    //console.log(labels);
    // Set labels
    if (!labels) {
      this.bar_chart_data.labels = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    } else {
      this.bar_chart_data.labels = labels;//['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    }


    // Set datasets
    this.bar_chart_data.datasets = [
      {
        data: rand_numbers,
        backgroundColor: function (context) {

          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }

          // Create gradient
          return helperService.createGradientChart(ctx, 'primary', 'primary');
        },
        barThickness: 10,
        borderRadius: 4,
        borderColor: helperService.getColorVariable('primary'),
        hoverBackgroundColor: helperService.getColorVariable('primary'),
        pointStyle: 'circle',
      }
    ];
  }


  mudaVideo() {
    this.video = !this.video;
  }

  createBarChart2(labels?, dados?) {
    this.generateColorArray(labels?.length);
    this.bar = new Chart(this.chart.nativeElement, {
      type: 'line',
      data: {
        labels: labels,//['S1asd', 'S2qwet', 'S3asd', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers in millions',
          data: dados,//[2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          //backgroundColor: this.colorArray,//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: '#000000',// array should have same number of elements as number of dataset
          //borderWidth: 1,
          tension: 0.1,
          borderWidth:2,
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
              },
            },
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

  createPieChart(labels?, dados?) {
    this.generateColorArray(labels?.length);
    this.pie = new Chart(this.pieChart.nativeElement, {
      type: 'doughnut',
      //type: 'line',
      data: {
        labels: labels,//['S1asd', 'S2qwet', 'S3asd', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers in millions',
          data: dados,//[2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: this.colorArray,//'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: this.colorArray,//'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          hoverOffset: 4,
          //radius:'90%',
          //cutout:'90%'

        }]
      },
      options:{
        radius:'70%',
          cutout:'90%'
      }

    });
  }

  ionViewDidLeave() {
    this.pie.destroy();
    this.bar.destroy();
  }

  colorArray = [];
  generateColorArray(num) {
    this.colorArray = [];
    // for (let i = 0; i < num; i++) {
    //   this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    // }

    let cores = [];
    //cores.push('#9370DB');
    //cores.push('#A020F0');
    //cores.push('#8A2BE2');
    //cores.push('#9400D3');
    //cores.push('#9932CC');
    //cores.push('#BA55D3');
    //cores.push('#DA70D6');
    //cores.push('#00FF00');
    //cores.push('#DDA0DD');
    //cores.push('#EE82EE');
    //cores.push('#FF00FF');
    //cores.push('#D02090');

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

    cores.push('#9370DB');
    cores.push('#A020F0');
    cores.push('#8A2BE2');
    cores.push('#9400D3');

    this.colorArray = cores.slice(0, num);
  }

}
