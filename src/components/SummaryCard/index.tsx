import {
  Card,
  CardHeader,
  IconContainer,
  ItemLabel,
  ItemValue,
  NavigationLink,
  SummaryItem,
  SummaryList,
  Title,
} from './styles';
import type { SummaryCardProps } from './types';

/**
 * Displays a group of related dashboard statistics.
 */
export const SummaryCard = ({
  title,
  icon,
  items,
  navigationLink,
  'data-testid': dataTestId = 'summary-card',
}: SummaryCardProps) => {
  return (
    <Card data-testid={dataTestId}>
      <CardHeader>
        <Title>{title}</Title>

        <IconContainer aria-hidden="true">
          {icon}
        </IconContainer>
      </CardHeader>

      <SummaryList>
        {items.map((item, index) => (
          <SummaryItem
            key={`${item.label}-${index}`}
            data-testid={`${dataTestId}-item-${index}`}
          >
            <ItemLabel>{item.label}</ItemLabel>
            <ItemValue>{item.value}</ItemValue>
          </SummaryItem>
        ))}
      </SummaryList>

      {navigationLink && (
        <NavigationLink to={navigationLink}>
          View details
        </NavigationLink>
      )}
    </Card>
  );
};