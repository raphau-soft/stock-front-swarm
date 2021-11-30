import { Component, OnInit } from '@angular/core';
import { Test } from '../dto/test'
import { CpuData } from '../dto/cpuData'
import { TestStock } from '../dto/testStock';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UserService } from '../_services/user.service';
import { jsPDF } from 'jspdf';
import { ExcelData } from '../dto/excelData';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { timestamp } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { ExcelCPUData } from '../dto/excelCPUData'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chartTestStock: TestStock;
  dataset: Test[];
  excelData: ExcelData[];
  excelCPUData: ExcelCPUData[];
  excelAVCPUData: ExcelCPUData[];
  testStocks: TestStock[];
  data: Test[];
  cpuDataStock: CpuData[];
  cpuDataS: CpuData[];
  cpuDataGenerator: CpuData[];
  cpuDataG: CpuData[];

  names: string[] = [];
  name: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getTest().subscribe(
      data => {
        this.data = data.tests;
        this.cpuDataGenerator = data.cpuData;
        console.log(this.cpuDataGenerator);
        this.data.forEach(element => {
          if (!(this.names.indexOf(element.name) > -1)) {
            this.names.push(element.name);
          }
        });
      }
    )
    this.userService.getStockTest().subscribe(
      data => {
        this.testStocks = data.tests;
        this.cpuDataStock = data.cpuData;
        console.log(this.cpuDataStock);
      },
      err => {
        console.log(err);
      }
    )
  }
  lineChartData: ChartDataSets[] = [];
  lineChartData2: ChartDataSets[] = [];
  lineChartData3: ChartDataSets[] = [];
  lineChartData4: ChartDataSets[] = [];
  lineChartData5: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  lineChartLabels2: Label[] = [];
  lineChartLabels3: Label[] = [];
  lineChartLabels4: Label[] = [];
  lineChartLabels5: Label[] = [];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [];
  lineChartColors1: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'bar';
  lineChartType1 = 'line';


  captureScreen() {  
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  

    var chart1=document.getElementById("chart1") as HTMLCanvasElement;
    var data1=chart1.toDataURL("image/png");

    var chart2=document.getElementById("chart2") as HTMLCanvasElement;
    var data2=chart2.toDataURL("image/png");

    var chart3=document.getElementById("chart3") as HTMLCanvasElement;
    var data3=chart3.toDataURL("image/png");

    var chart4=document.getElementById("chart4") as HTMLCanvasElement;
    var data4=chart4.toDataURL("image/png");

    var chart5=document.getElementById("chart5") as HTMLCanvasElement;
    var data5=chart5.toDataURL("image/png");

    let width1 = 208;
    let height1 = width1 * chart1.offsetHeight / chart1.offsetWidth;
    let width2 = 150;
    let height2 = width2 * chart2.offsetHeight / chart2.offsetWidth;
    let width3 = 58;
    let height3 = width3 * chart3.offsetHeight / chart3.offsetWidth;
    let width4 = 105;
    let height4 = width4 * chart4.offsetHeight / chart4.offsetWidth;
    let width5 = 105;
    let height5 = width5 * chart5.offsetHeight / chart5.offsetWidth;

    pdf.addImage(data1, 'PNG', 0, 0, width1, height1);
    pdf.addImage(data2, 'PNG', 0, height1, width2, height2);
    pdf.addImage(data3, 'PNG', width2, height1, width3, height3);
    pdf.addImage(data4, 'PNG', 0, height1 + height2, width4, height4);
    pdf.addImage(data5, 'PNG', width4, height1 + height2, width5, height5);
    pdf.save(this.name + ".pdf"); // Generated PDF    
  }  

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  // public exportExcel(): void {
  //   this.excelData = [];
  //   for(let i = 0; i < this.dataset.length; i++){
  //     this.excelData.push(new ExcelData(i + 1, this.dataset[i].endpoint.endpoint, this.dataset[i].apiTime, this.dataset[i].applicationTime, this.dataset[i].databaseTime, this.dataset[i].numberOfRequests, 0));
  //   }
  //   this.excelData.push(new ExcelData(this.dataset.length + 1, "transaction", 0, this.chartTestStock.applicationTime, this.chartTestStock.databaseTime, 0, this.chartTestStock.semaphoreWaitTime));

  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.excelData);
  //   const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  //   this.saveExcelFile(excelBuffer, this.name);
  // }

  // private saveExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], {type: this.fileType});
  //   FileSaver.saveAs(data, fileName + this.fileExtension);
  // }

  public exportExcel() {
    this.excelData = [];
    for(let i = 0; i < this.dataset.length; i++){
      this.excelData.push(new ExcelData(this.dataset[i].endpoint.endpoint, this.dataset[i].apiTime, this.dataset[i].applicationTime, this.dataset[i].databaseTime, this.dataset[i].numberOfRequests, 0));
    }
    this.excelData.push(new ExcelData("transaction", 0, this.chartTestStock.applicationTime, this.chartTestStock.databaseTime, 0, this.chartTestStock.semaphoreWaitTime));

    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(this.excelData[0]);
    let csv = this.excelData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, this.name + " Time.csv");

    this.excelCPUData = [];
    for(let i = 0; i < this.cpuDataG.length; i++){
      this.excelCPUData.push(new ExcelCPUData(this.cpuDataG[i].timestamp, this.cpuDataG[i].cpuUsage));
    }

    const replacer1 = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header1 = Object.keys(this.excelCPUData[0]);
    let csv1 = this.excelCPUData.map(row => header1.map(fieldName => JSON.stringify(row[fieldName], replacer1)).join(','));
    csv1.unshift(header1.join(','));
    let csvArray1 = csv1.join('\r\n');

    var blob = new Blob([csvArray1], {type: 'text/csv' })
    saveAs(blob, this.name + " GenCPU.csv");

    // count average
    this.excelCPUData = [];
    for(let i = 0; i < this.cpuDataS.length; i++){
      this.excelCPUData.push(new ExcelCPUData(this.cpuDataS[i].timestamp, this.cpuDataS[i].cpuUsage));
    }

    const replacer2 = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header2 = Object.keys(this.excelCPUData[0]);
    let csv2 = this.excelCPUData.map(row => header2.map(fieldName => JSON.stringify(row[fieldName], replacer2)).join(','));
    csv2.unshift(header2.join(','));
    let csvArray2 = csv2.join('\r\n');

    var blob = new Blob([csvArray2], {type: 'text/csv' })
    saveAs(blob, this.name + " StoCPU.csv");

    const replacer3 = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header3 = Object.keys(this.excelAVCPUData[0]);
    let csv3 = this.excelAVCPUData.map(row => header3.map(fieldName => JSON.stringify(row[fieldName], replacer3)).join(','));
    csv3.unshift(header3.join(','));
    let csvArray3 = csv3.join('\r\n');

    var blob = new Blob([csvArray3], {type: 'text/csv' })
    saveAs(blob, this.name + " StoCPUAverage.csv");
}
  
  refreshChart(name: string) {
    this.name = name;
    this.dataset = [];
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].name == name) {
        this.dataset.push(this.data[i]);
      }
    }
    this.lineChartData = [];
    this.lineChartData2 = [];
    for (var i = 0; i < this.dataset.length; i++) {
      this.lineChartData.push(
        { data: [this.dataset[i].apiTime, this.dataset[i].applicationTime, this.dataset[i].databaseTime], label: '' + this.dataset[i].endpoint.endpoint }
      )
      this.lineChartData2.push(
        { data: [this.dataset[i].numberOfRequests], label: '' + this.dataset[i].endpoint.endpoint }
      )
    }
    this.lineChartLabels = ['Api time (ms)', 'App time (ms)', 'DB time (ms)'];
    this.lineChartLabels2 = ['Number of requests'];
    this.lineChartLabels3 = ['Application time (ms)', 'Database time (ms)', 'Semaphore waiting time (ms)'];
    
    var testStocksDataSet = this.testStocks.filter(
      test => test.name === this.name
    );

    this.chartTestStock = new TestStock();
    this.chartTestStock.name = this.name;
    this.chartTestStock.databaseTime = 0;
    this.chartTestStock.applicationTime = 0;
    this.chartTestStock.semaphoreWaitTime = 0;
    for (let test of testStocksDataSet) {
      this.chartTestStock.databaseTime += test.databaseTime;
      this.chartTestStock.applicationTime += test.applicationTime;
      this.chartTestStock.semaphoreWaitTime += test.semaphoreWaitTime;
    }
    this.chartTestStock.databaseTime = Math.round(this.chartTestStock.databaseTime
       / testStocksDataSet.length);
    this.chartTestStock.applicationTime = Math.round(this.chartTestStock.applicationTime
       / testStocksDataSet.length);
    this.chartTestStock.semaphoreWaitTime = Math.round(this.chartTestStock.semaphoreWaitTime
       / testStocksDataSet.length);
    this.lineChartData3 = [];
    this.lineChartData3.push(
      { data: [this.chartTestStock.applicationTime, this.chartTestStock.databaseTime, this.chartTestStock.semaphoreWaitTime], label: 'Transaction'}
    )

    this.lineChartData4 = [];
    this.cpuDataG = this.cpuDataGenerator.filter(
      test => test.name === this.name
    );

    var temp2 = [];
    this.lineChartLabels4 = [];
    for(let i = 0; i < this.cpuDataG.length; i++){
      temp2.push(this.cpuDataG[i].cpuUsage)
      var date = new Date(this.cpuDataG[i].timestamp);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      this.lineChartLabels4.push(formattedTime + '')
    }
    
    this.lineChartData4.push(
      {data: temp2, label: 'Generator CPU usage'}
    )

    console.log(this.excelAVCPUData)
    this.lineChartData5 = [];
    this.cpuDataS = this.cpuDataStock.filter(
      test => test.name === this.name
    );
    var stime = this.cpuDataS[0].timestamp;
    var sCpuUsage = 0;
    var averageCount = 0;
    this.excelAVCPUData = [];
    for(let i = 0; i < this.cpuDataS.length; i++){
      if(this.cpuDataS[i].timestamp - stime >= 30000 || i == this.cpuDataS.length - 1){
        var cpu = sCpuUsage/(averageCount);
        stime += 30000;
        sCpuUsage = 0;
        averageCount = 0;
        this.excelAVCPUData.push(new ExcelCPUData(stime, cpu));
      } else {
        sCpuUsage += this.cpuDataS[i].cpuUsage;
        averageCount++;
      }
    }
    var temp1 = [];
    this.lineChartLabels5 = [];
    for(let i = 0; i < this.excelAVCPUData.length; i++){
      temp1.push(this.excelAVCPUData[i].CpuUsage)
      var date = new Date(this.excelAVCPUData[i].Timestamp);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      this.lineChartLabels5.push(formattedTime + '')
    }
    
    this.lineChartData5.push(
      {data: temp1, label: 'Stock CPU usage'}
    )
    

  }
}
