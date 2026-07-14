import { Header } from '../../components/Header';

export const Dashboard = () => {
  return (
    <div data-testid="dashboard-page">
      <Header
        title="Dashboard"
        description="Overview of the car insurance application."
      />
    </div>
  );
};