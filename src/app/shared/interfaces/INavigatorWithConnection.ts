export interface NavigatorWithConnection extends Navigator {
  connection?: {
    effectiveType?: string;
    type?: string;
    downlink?: number;
    rtt?: number;
  };
}
