export interface ZapBaselineReport {
  '@version': string;
  '@generated': string;
  site: Site[];
}

export interface Site {
  '@name': string;
  '@host': string;
  '@port': string;
  '@ssl': string;
  alerts: Alert[];
}

export interface Alert {
  pluginid: string;
  alertRef: string;
  alert: string;
  name: string;
  riskcode: string;
  confidence: string;
  riskdesc: string;
  desc: string;
  instances: Instance[];
  count: string;
  solution: string;
  reference: string;
  cweid: string;
  wascid: string;
  sourceid: string;
  otherinfo?: string;
}

export interface Instance {
  uri: string;
  method: string;
  evidence?: string;
  param?: string;
}

export interface ZapBaselineExcel {
  Alert: string;
  RiskLevel: string;
  Instance: string;
}
