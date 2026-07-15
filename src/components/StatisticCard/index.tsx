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
        <Title data-testid={`${dataTestId}-title`}>{title}</Title>

      <IconContainer aria-hidden="true" data-testid={`${dataTestId}-icon-container`}>
          {icon}
        </IconContainer>
      </Header>

      <Value data-testid={`${dataTestId}-value`}>{value}</Value>

      {navigationLink && (
        <NavigationLink to={navigationLink} data-testid={`${dataTestId}-link`}>
          View details
        </NavigationLink>
      )}
    </Card>
  );
};