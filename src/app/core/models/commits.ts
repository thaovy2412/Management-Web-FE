export interface DataReport {
  commitid:  string;
  date:      string;
  status:    string;
  zap_baseline: string;
  zap_quickscan: string;
  sonarqube: string;
  trivy:     string;
  gitleaks:  string;
}

export interface Tool{
  name: string;
  path: string;
  status: string;
}
