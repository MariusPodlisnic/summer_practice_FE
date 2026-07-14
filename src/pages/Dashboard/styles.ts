import styled from 'styled-components';

export const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const StatisticsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(220px, 1fr)
  );
  gap: 24px;
`;

export const SummaryGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(300px, 1fr)
  );
  gap: 24px;
`;