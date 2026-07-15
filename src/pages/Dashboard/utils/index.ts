import {
  Car,
  IdCard,
  ShieldCheck,
  ShieldOff,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { ROUTE_PATHS } from '../../../constants/routes';

export interface DashboardCardDetails {
  title: string;
  icon: LucideIcon;
  navigationLink?: string;
}

export const getStatisticCardDetails = (
  type: number
): DashboardCardDetails => {
  switch (type) {
    case 1:
      return {
        title: 'Total Owners',
        icon: Users,
        navigationLink: ROUTE_PATHS.OWNERS,
      };

    case 2:
      return {
        title: 'Total Cars',
        icon: Car,
        navigationLink: ROUTE_PATHS.CARS,
      };

    case 3:
      return {
        title: 'Insured Cars',
        icon: ShieldCheck,
      };

    case 4:
      return {
        title: 'Uninsured Cars',
        icon: ShieldOff,
      };

    default:
      return {
        title: 'Unknown statistic',
        icon: Car,
      };
  }
};

export const getSummaryCardDetails = (
  type: number
): DashboardCardDetails => {
  switch (type) {
    case 1:
      return {
        title: 'Cars by Category',
        icon: Car,
        navigationLink: ROUTE_PATHS.CARS,
      };

    case 2:
      return {
        title: "Owners by Driver's Licence Category",
        icon: IdCard,
        navigationLink: ROUTE_PATHS.OWNERS,
      };

    default:
      return {
        title: 'Unknown summary',
        icon: Car,
      };
  }
};