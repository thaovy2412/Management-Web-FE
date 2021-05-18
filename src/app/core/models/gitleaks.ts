export interface GitleaksReport {
  line: string;
  lineNumber: number;
  offender: string;
  offenderEntropy?: number;
  commit: string;
  repo: string;
  repoURL: string;
  leakURL: string;
  rule: string;
  commitMessage: string;
  author: string;
  email: string;
  file: string;
  date: Date;
  tags: string;
}
