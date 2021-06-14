export interface Vulnerability {
  VulnerabilityID: string;
  PkgName: string;
  InstalledVersion: string;
  FixedVersion: string;
  Layer: Layer;
  PrimaryURL: string;
  Title: string;
  Description: string;
  Severity: string;
  References: string[];
}

export interface Layer {
  DiffID: string;
}

export interface TrivyReport {
  Target: string;
  Type: string;
  Vulnerabilities: Vulnerability[];
  Summary?: Total;
}

export interface Total {
  total: number;
  unknown: number;
  low: number;
  medium: number;
  high: number;
  critical: number;
}

export interface TrivyExcel {
  Target: string;
  Type: string;
  PkgName: string;
  VulnerabilityID: string;
  Severity: string;
  InstalledVersion: string;
  FixedVersion: string;
  Title: string;
}
