import { useEffect, useState } from 'react';

import { getOwners } from '../../../api/owners/getOwners';
import type { DriverLicenseCategory } from '../../../api/owners/types';
import type { SummaryCardItem } from '../../../components/SummaryCard/types';

interface DashboardLicenseCategory {
  label: string;
  category: DriverLicenseCategory;
}

const DRIVER_LICENSE_CATEGORIES: DashboardLicenseCategory[] = [
  {
    label: 'A',
    category: 'A',
  },
  {
    label: 'B',
    category: 'B',
  },
  {
    label: 'C',
    category: 'C',
  },
  {
    label: 'D',
    category: 'D',
  },
  {
    label: 'E',
    category: 'E',
  },
  {
    label: 'None',
    category: 'NONE',
  },
];

const INITIAL_CATEGORY_ITEMS: SummaryCardItem[] =
  DRIVER_LICENSE_CATEGORIES.map(({ label }) => ({
    label,
    value: 0,
  }));

/**
 * Loads the number of owners for every driver's licence category.
 */
export const useOwnersByLicenseCategory = () => {
  const [items, setItems] = useState<SummaryCardItem[]>(
    INITIAL_CATEGORY_ITEMS
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchOwnersByLicenseCategory = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const categoryResponses = await Promise.all(
          DRIVER_LICENSE_CATEGORIES.map(({ category }) =>
            getOwners({
              driver_license_cat: [category],
              page: 1,
              per_page: 1,
            })
          )
        );

        if (!isCurrentRequest) {
          return;
        }

        const categoryItems = DRIVER_LICENSE_CATEGORIES.map(
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
            "Could not load owners by driver's licence category."
          );
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    fetchOwnersByLicenseCategory();

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