import { Header } from '../../components/Header';
import { StatisticCard } from '../../components/StatisticCard';
import { SummaryCard } from '../../components/SummaryCard';

import { dashboardMockData } from './mocks';
import {
  DashboardContent,
  StatisticsGrid,
  SummaryGrid,
} from './styles';
import {
  getStatisticCardDetails,
  getSummaryCardDetails,
} from './utils';

/**
 * Renders the Dashboard using mocked data.
 */
export const Dashboard = () => {
  return (
    <DashboardContent data-testid="dashboard-page">
      <Header
        title="Dashboard"
        description="Overview of the car insurance application."
      />

      { <StatisticsGrid>
        {dashboardMockData.carsOwners.map((item) => {
          const details = getStatisticCardDetails(
            item.itemType
          );

          const Icon = details.icon;

          return (
            <StatisticCard
              key={item.itemType}
              title={details.title}
              value={item.value}
              icon={
                <Icon
                  size={24}
                  aria-hidden="true"
                />
              }
              navigationLink={details.navigationLink}
              data-testid={`statistic-card-${item.itemType}`}
            />
          );
        })}
      </StatisticsGrid> }

       <SummaryGrid>
        {dashboardMockData.categories.map((category) => {
          const details = getSummaryCardDetails(
            category.itemType
          );

          const Icon = details.icon;

          return (
            <SummaryCard
              key={category.itemType}
              title={details.title}
              icon={
                <Icon
                  size={24}
                  aria-hidden="true"
                />
              }
              items={category.items}
              navigationLink={details.navigationLink}
              data-testid={`summary-card-${category.itemType}`}
            />
          );
        })}
      </SummaryGrid> 
    </DashboardContent>
  );
};