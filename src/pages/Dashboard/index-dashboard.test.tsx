import { Dashboard } from '.';
import { render , screen} from '../../test-utils';
import { MemoryRouter } from 'react-router-dom';
describe('Dashboard', () => {
  it('renders dashboard statistic cards', () => {
  render(
  <MemoryRouter>
    <Dashboard />
    </MemoryRouter>
    );

    const titleEl=screen.getByTestId('header-title');
    const link1El =screen.getByTestId('statistic-card-1-link');
    expect(titleEl).toBeVisible();
       expect(
      titleEl
    ).toHaveTextContent('Dashboard');
        expect(link1El).toBeVisible();
  });
});
