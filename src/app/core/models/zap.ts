export interface ZapReportOverView {
  name: string;
  riskLevel: string;
  riskCode: string;
  numberInstances: string;
}

export interface ZapReportSummary {
  riskLevel: string;
  numberAlerts: string;
}

export interface ZapReportDetail {
  OWASPZAPReport: OWASPZAPReport;
}

export interface OWASPZAPReport {
  $: OWASPZAPReportClass;
  site: SiteElement[];
}

export interface OWASPZAPReportClass {
  version: string;
  generated: string;
}

export interface SiteElement {
  $: Site;
  alerts: Alert[];
}

export interface Site {
  name: string;
  host: string;
  port: string;
  ssl: string;
}

export interface Alert {
  alertitem: Alertitem[];
}

export interface Alertitem {
  pluginid: string[];
  alertRef: string[];
  alert: string[];
  name: string[];
  riskcode: string[];
  confidence: string[];
  riskdesc: string[];
  desc: string[];
  instances: AlertitemInstance[];
  count: string[];
  solution: string[];
  reference: string[];
  cweid: string[];
  wascid: string[];
  sourceid: string[];
  otherinfo?: string[];
}

export interface AlertitemInstance {
  instance: InstanceInstance[];
}

export interface InstanceInstance {
  uri: string[];
  method: Method[];
  param?: string[];
  evidence?: string[];
  attack?: string[];
}

export enum Method {
  Get = 'GET',
}

export interface ZapQuickScanExcel {
  Alert: string;
  RiskLevel: string;
  Instance: string;
}
