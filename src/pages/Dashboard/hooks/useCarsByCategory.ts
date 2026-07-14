import { useEffect, useState } from 'react';

import { getCars } from '../../../api/cars/getCars';
import type { CarCategory } from '../../../api/cars/types';
import type { SummaryCardItem } from '../../../components/SummaryCard/types';

interface DashboardCarCategory {
  label: string;
  category: CarCategory;
}

const CAR_CATEGORIES: DashboardCarCategory[] = [
  {
    label: 'EURO3',
    category: 'EURO3',
  },
  {
    label: 'EURO4',
    category: 'EURO4',
  },
  {
    label: 'EURO5',
    category: 'EURO5',
  },
  {
    label: 'EURO6',
    category: 'EURO6',
  },
  {
    label: 'Hybrid',
    category: 'HYBRID',
  },
  {
    label: 'Electric',
    category: 'ELECTRIC',
  },
];

const INITIAL_CATEGORY_ITEMS: SummaryCardItem[] =
  CAR_CATEGORIES.map(({ label }) => ({
    label,
    value: 0,
  }));

/**
 * Loads the number of cars for every supported category.
 */
export const useCarsByCategory = () => {
  const [items, setItems] = useState<SummaryCardItem[]>(
    INITIAL_CATEGORY_ITEMS
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchCarsByCategory = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const categoryResponses = await Promise.all(
          CAR_CATEGORIES.map(({ category }) =>
            getCars({
              page: 1,
              per_page: 1,
              category,
            })
          )
        );

        if (!isCurrentRequest) {
          return;
        }

        const categoryItems = CAR_CATEGORIES.map(
          ({ label }, index) => ({
            label,
            value: categoryResponses[index].count,
          })
        );

        setItems(categoryItems);
      } catch (error) {
        console.error(error);

        if (isCurrentRequest) {
          setErrorMessage(
            'Could not load cars by category.'
          );
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    fetchCarsByCategory();

    return () => {
      isCurrentRequest = false;
    };
  }, []);

  return {
    items,
    isLoading,
    errorMessage,
  };
};