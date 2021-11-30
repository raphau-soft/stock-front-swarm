export class ExcelData{
    Endpoint: String;
    ApiTime: number;
    ApplicationTime: number;
    DatabaseTime: number;
    NumberOfRequests: number;
    SemaphoreWaitingTime: number;

    constructor(endpoint, apiTime, applicationTime, databaseTime, numberOfRequests, semaphoreWaitingTime){
        this.Endpoint = endpoint;
        this.ApiTime = apiTime;
        this.ApplicationTime = applicationTime;
        this.DatabaseTime = databaseTime;
        this.NumberOfRequests = numberOfRequests;
        this.SemaphoreWaitingTime = semaphoreWaitingTime;
    }

}