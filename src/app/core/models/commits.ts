export interface DataReport {
  commitid: string;
  repo: string;
  date: Date;
  status: string;
  zap_baseline: string;
  zap_quickscan: string;
  sonarqube: string;
  trivy: string;
  gitleaks: string;
}

export interface Tool {
  name: string;
  param: string;
  status: string;
}
