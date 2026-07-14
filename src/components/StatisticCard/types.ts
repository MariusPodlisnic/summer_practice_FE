import type { ReactNode } from 'react';

export interface StatisticCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  navigationLink?: string;
  'data-testid'?: string;
}