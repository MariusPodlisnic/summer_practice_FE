import { Header } from '../../components/Header';
import { StatisticCard } from '../../components/StatisticCard';
import { SummaryCard } from '../../components/SummaryCard';
import { ROUTE_PATHS } from '../../constants/routes';

import { useCarsByCategory } from './hooks/useCarsByCategory';
import { useDashboardStatistics } from './hooks/useDashboardStatistics';
import { useOwnersByLicenseCategory } from './hooks/useOwnersByLicenseCategory';
import {
  DashboardContent,
  StatisticsGrid,
  SummaryGrid,
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

  const {
    items: carsByCategoryItems,
    isLoading: isLoadingCarsByCategory,
    errorMessage: carsByCategoryError,
  } = useCarsByCategory();
  const {
    items: ownersByLicenseCategoryItems,
    isLoading: isLoadingOwnersByLicenseCategory,
    errorMessage: ownersByLicenseCategoryError,
  } = useOwnersByLicenseCategory();
  const totalOwnersValue = isLoading
    ? '...'
    : statistics.totalOwners ?? '—';

  const totalCarsValue = isLoading
    ? '...'
    : statistics.totalCars ?? '—';

  const displayedCategoryItems = isLoadingCarsByCategory
    ? carsByCategoryItems.map((item) => ({
        ...item,
        value: '...',
      }))
    : carsByCategoryItems;
  const displayedOwnerCategoryItems =
    isLoadingOwnersByLicenseCategory
    ? ownersByLicenseCategoryItems.map((item) => ({
        ...item,
        value: '...',
      }))
    : ownersByLicenseCategoryItems;

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

      {carsByCategoryError && (
        <p role="alert">{carsByCategoryError}</p>
      )}

      {ownersByLicenseCategoryError && (
        <p role="alert">
    {ownersByLicenseCategoryError}
        </p>
      )}

      <SummaryGrid>
        <SummaryCard
          title="Cars by Category"
          icon={<span>🚘</span>}
          items={displayedCategoryItems}
          navigationLink={ROUTE_PATHS.CARS}
          data-testid="cars-by-category-card"

          
        />
        <SummaryCard
          title="Owners by Driver's Licence Category"
          icon={<span>🪪</span>}
          items={displayedOwnerCategoryItems}
          navigationLink={ROUTE_PATHS.OWNERS}
          data-testid="owners-by-license-category-card"
        />
      </SummaryGrid>
    </DashboardContent>
  );
};