import {
  Card,
  Header,
  IconContainer,
  NavigationLink,
  Title,
  Value,
} from './styles';
import type { StatisticCardProps } from './types';


export const StatisticCard = ({
  title,
  value,
  icon,
  navigationLink,
  'data-testid': dataTestId = 'statistic-card',
}: StatisticCardProps) => {
  return (
    <Card data-testid={dataTestId}>
      <Header>
        <Title>{title}</Title>

        <IconContainer aria-hidden="true">
          {icon}
        </IconContainer>
      </Header>

      <Value>{value}</Value>

      {navigationLink && (
        <NavigationLink to={navigationLink}>
          View details
        </NavigationLink>
      )}
    </Card>
  );
};