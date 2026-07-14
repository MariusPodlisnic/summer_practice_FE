import { useEffect, useState } from 'react';

import { getCarCategories } from '../../../api/cars/getCarCategories';
import { getCars } from '../../../api/cars/getCars';
import type { CarCategory } from '../../../api/cars/types';
import { getOwners } from '../../../api/owners/getOwners';

interface CategoryStatistic {
  label: string;
  value: number;
}

interface DashboardData {
  totalOwners: number;
  totalCars: number;
  carsByCategory: CategoryStatistic[];
}

const EMPTY_DASHBOARD_DATA: DashboardData = {
  totalOwners: 0,
  totalCars: 0,
  carsByCategory: [],
};

const CAR_CATEGORIES: CarCategory[] = [
  'EURO3',
  'EURO4',
  'EURO5',
  'EURO6',
  'HYBRID',
  'ELECTRIC',
];

const isCarCategory = (
  category: string
): category is CarCategory =>
  CAR_CATEGORIES.includes(category as CarCategory);

const formatCategory = (category: CarCategory) => {
  if (category.startsWith('EURO')) {
    return `Euro ${category.replace('EURO', '')}`;
  }

  return (
    category.charAt(0) +
    category.slice(1).toLowerCase()
  );
};

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData>(
    EMPTY_DASHBOARD_DATA
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchDashboardData = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const [
          ownersResponse,
          carsResponse,
          categoryResponse,
        ] = await Promise.all([
          getOwners({
            page: 1,
            per_page: 1,
          }),
          getCars({
            page: 1,
            per_page: 1,
          }),
          getCarCategories(),
        ]);

        const categories =
          categoryResponse.filter(isCarCategory);

        const categoryStatistics = await Promise.all(
          categories.map(async (category) => {
            const response = await getCars({
              page: 1,
              per_page: 1,
              category,
            });

            return {
              label: formatCategory(category),
              value: response.count,
            };
          })
        );

        if (!isCurrentRequest) {
          return;
        }

        setData({
          totalOwners: ownersResponse.count,
          totalCars: carsResponse.count,
          carsByCategory: categoryStatistics,
        });
      } catch (error) {
        console.error(error);

        if (isCurrentRequest) {
          setErrorMessage(
            'Could not load dashboard statistics.'
          );
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isCurrentRequest = false;
    };
  }, []);

  return {
    data,
    isLoading,
    errorMessage,
  };
};