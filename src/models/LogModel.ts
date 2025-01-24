export class LogModel {
  logCode: string;
  logDate: string | null;
  logDetails: string;
  logImage: string;
  logFields: string[];
  logCrops: string[];
  logStaff: string[];

  constructor(
    logCode: string,
    logDate: string | null,
    logDetails: string,
    logImage: string,
    logFields: string[],
    logCrops: string[],
    logStaff: string[]
  ) {
    this.logCode = logCode;
    this.logDate = logDate;
    this.logDetails = logDetails;
    this.logImage = logImage;
    this.logFields = logFields;
    this.logCrops = logCrops;
    this.logStaff = logStaff;
  }
}
