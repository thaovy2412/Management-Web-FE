export interface Vulnerability {
  VulnerabilityID:  string;
  PkgName:          string;
  InstalledVersion: string;
  FixedVersion:     string;
  Layer:            Layer;
  PrimaryURL:       string;
  Title:            string;
  Description:      string;
  Severity:         string;
  References:       string[];
}

export interface Layer {
  DiffID: string;
}

export interface TrivyReport{
  Target: string;
  Type: string;
  Vulnerabilities: Vulnerability[];
  Total?: number;
}
