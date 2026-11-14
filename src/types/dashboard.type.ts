export interface UserGrowth {
  totalUsers: number;
  dau: number | null;
  mau: number | null;
  weeklyRetentionRate: number | null;
}

export interface PlatformMetrics {
  totalTransactionsCount: number;
  dailyTransactionsCount: number;
  grossMerchandiseVolume: number;
}

export interface AiClassifierPerformance {
  accuracyPercentage: number | null;
  processedReceiptsCount: number | null;
  ocrSuccessRate: number | null;
}

export interface SystemHealth {
  status: string | null;
  cpuUsagePercentage: number | null;
  memoryUsagePercentage: number | null;
  apiLatencyMs: number | null;
}

export interface OperationsDashboard {
  userGrowth: UserGrowth;
  platformMetrics: PlatformMetrics;
  aiClassifierPerformance: AiClassifierPerformance | null;
  systemHealth: SystemHealth | null;
}
