import { Header } from '../../components/Header';
import { StatisticCard } from '../../components/StatisticCard';
import { SummaryCard } from '../../components/SummaryCard';
import { ROUTE_PATHS } from '../../constants/routes';

import { useDashboardData } from './hooks/useDashboardData';
import {
  DashboardContent,
  StatisticsGrid,
  SummaryGrid,
} from './styles';


export const Dashboard = () => {
  const {
    data,
    isLoading,
    errorMessage,
  } = useDashboardData();

  const totalOwners = isLoading
    ? '...'
    : data.totalOwners;

  const totalCars = isLoading
    ? '...'
    : data.totalCars;

  const categoryItems = isLoading
    ? [
        {
          label: 'Loading categories...',
          value: '...',
        },
      ]
    : data.carsByCategory;

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
          value={totalOwners}
          icon={<span>👤</span>}
          navigationLink={ROUTE_PATHS.OWNERS}
          data-testid="total-owners-card"
        />

        <StatisticCard
          title="Total Cars"
          value={totalCars}
          icon={<span>🚗</span>}
          navigationLink={ROUTE_PATHS.CARS}
          data-testid="total-cars-card"
        />
      </StatisticsGrid>

      <SummaryGrid>
        <SummaryCard
          title="Cars by emission category"
          icon={<span>🚘</span>}
          items={categoryItems}
          navigationLink={ROUTE_PATHS.CARS}
          data-testid="cars-summary-card"
        />
      </SummaryGrid>
    </DashboardContent>
  );
};