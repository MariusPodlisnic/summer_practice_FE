import { Header } from '../../components/Header';
import { StatisticCard } from '../../components/StatisticCard';
import { ROUTE_PATHS } from '../../constants/routes';

import { useDashboardStatistics } from './hooks/useDashboardStatistics';
import {
  DashboardContent,
  StatisticsGrid,
} from './styles';

/**
 * Renders the main dashboard page.
 */
export const Dashboard = () => {
  const {
    statistics,
    isLoading,
    errorMessage,
  } = useDashboardStatistics();

  const totalOwnersValue = isLoading
    ? '...'
    : statistics.totalOwners ?? '—';

  const totalCarsValue = isLoading
    ? '...'
    : statistics.totalCars ?? '—';

  return (
    <DashboardContent data-testid="dashboard-page">
      <Header
        title="Dashboard"
        description="Overview of the car insurance application."
      />

      {errorMessage && (
        <p role="alert">{errorMessage}</p>
      )}

      <StatisticsGrid>
        <StatisticCard
          title="Total Owners"
          value={totalOwnersValue}
          icon={<span>👤</span>}
          navigationLink={ROUTE_PATHS.OWNERS}
          data-testid="total-owners-card"
        />

        <StatisticCard
          title="Total Cars"
          value={totalCarsValue}
          icon={<span>🚗</span>}
          navigationLink={ROUTE_PATHS.CARS}
          data-testid="total-cars-card"
        />

        <StatisticCard
          title="Insured Cars"
          value="—"
          icon={<span>🛡️</span>}
          data-testid="insured-cars-card"
        />

        <StatisticCard
          title="Uninsured Cars"
          value="—"
          icon={<span>⚠️</span>}
          data-testid="uninsured-cars-card"
        />
      </StatisticsGrid>
    </DashboardContent>
  );
};