
import { Users } from 'lucide-react';
import { StatisticCard } from '.';
import { render , screen} from '../../test-utils';

describe('Dashboard', () => {
  it('renders dashboard statistic cards', () => {
    const BASE_VALUES = {title:'Total Cars',value:40,icon:<Users/>};
  render(
    <StatisticCard title={BASE_VALUES.title} value={BASE_VALUES.value} icon={BASE_VALUES.icon}    />
    );

    const titleEl=screen.getByTestId('statistic-card-title');
    const valueEl=screen.getByTestId('statistic-card-value');
    const iconEl=screen.getByTestId('statistic-card-icon-container');
    expect(titleEl).toBeVisible();
    expect(valueEl).toBeVisible();
    expect(iconEl).toBeVisible();
    expect(
      titleEl
    ).toHaveTextContent(BASE_VALUES.title);
  });
});
