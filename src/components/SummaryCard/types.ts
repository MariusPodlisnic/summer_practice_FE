import type { ReactNode } from 'react';

export interface SummaryCardItem {
  label: string;
  value: string | number;
}

export interface SummaryCardProps {
  title: string;
  icon: ReactNode;
  items: SummaryCardItem[];
  navigationLink?: string;
  'data-testid'?: string;
}