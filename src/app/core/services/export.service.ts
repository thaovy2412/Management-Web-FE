import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor() {}
  public exportAsExcelFile(
    summary: any[],
    gitleaks: any[],
    trivy: any[],
    zapbaseline: any[],
    zapquickscan: any[],
    excelFileName: string
  ): void {
    const wsSummary: XLSX.WorkSheet = XLSX.utils.json_to_sheet(summary);
    const wsGitleaks: XLSX.WorkSheet = XLSX.utils.json_to_sheet(gitleaks);
    const wsTrivy: XLSX.WorkSheet = XLSX.utils.json_to_sheet(trivy);
    const wsZapBaseline: XLSX.WorkSheet = XLSX.utils.json_to_sheet(zapbaseline);
    const wsZapQuickscan: XLSX.WorkSheet =
      XLSX.utils.json_to_sheet(zapquickscan);
    const workbook: XLSX.WorkBook = {
      Sheets: {
        Summary: wsSummary,
        Gitleaks: wsGitleaks,
        Trivy: wsTrivy,
        ZapBaseline: wsZapBaseline,
        ZapQuickscan: wsZapQuickscan,
      },
      SheetNames: [
        'Summary',
        'Gitleaks',
        'Trivy',
        'ZapBaseline',
        'ZapQuickscan',
      ],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export' + EXCEL_EXTENSION);
  }
}
