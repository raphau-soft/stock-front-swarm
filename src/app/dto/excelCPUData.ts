export class ExcelCPUData{
    Timestamp: number;
    CpuUsage:number;

    constructor(Timestamp, CpuUsage){
        this.Timestamp = Timestamp;
        this.CpuUsage = CpuUsage;
    }

}