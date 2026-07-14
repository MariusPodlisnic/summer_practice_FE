import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background.card};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 16px;
  font-weight: 600;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary[50]};
  color: ${({ theme }) => theme.colors.primary[500]};
`;

export const Value = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 32px;
  font-weight: 700;
`;

export const NavigationLink = styled(Link)`
  width: fit-content;
  color: ${({ theme }) => theme.colors.primary[500]};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.border.strong};
    outline-offset: 2px;
  }
`;