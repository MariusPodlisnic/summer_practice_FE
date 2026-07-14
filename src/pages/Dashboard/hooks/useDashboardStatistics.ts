import { useEffect, useState } from 'react';

import { getCars } from '../../../api/cars/getCars';
import { getOwners } from '../../../api/owners/getOwners';

interface DashboardStatistics {
  totalOwners: number | null;
  totalCars: number | null;
}

const INITIAL_STATISTICS: DashboardStatistics = {
  totalOwners: null,
  totalCars: null,
};

/**
 * Loads the Owners and Cars statistics in parallel.
 */
export const useDashboardStatistics = () => {
  const [statistics, setStatistics] =
    useState<DashboardStatistics>(INITIAL_STATISTICS);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchStatistics = async () => {
      setIsLoading(true);
      setErrorMessage('');

      const [ownersResult, carsResult] =
        await Promise.allSettled([
          getOwners(),
          getCars(),
        ]);

      if (!isCurrentRequest) {
        return;
      }

      setStatistics({
        totalOwners:
          ownersResult.status === 'fulfilled'
            ? ownersResult.value.count
            : null,

        totalCars:
          carsResult.status === 'fulfilled'
            ? carsResult.value.count
            : null,
      });

      if (
        ownersResult.status === 'rejected' ||
        carsResult.status === 'rejected'
      ) {
        setErrorMessage(
          'Some dashboard statistics could not be loaded.'
        );
      }

      setIsLoading(false);
    };

    fetchStatistics();

    return () => {
      isCurrentRequest = false;
    };
  }, []);

  return {
    statistics,
    isLoading,
    errorMessage,
  };
};