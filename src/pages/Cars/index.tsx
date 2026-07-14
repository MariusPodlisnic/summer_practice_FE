import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Car } from '../../api/cars/types';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Modal } from '../../components/Modal';
import { ROUTES } from '../../constants/routes';

import { CarsTable } from './components/CarsTable';
import { useCarsData } from './hooks/useCarsData';
import { Wrapper } from './styles';
import { deleteCar } from '../../api/cars/deleteCar';
/**
 * Renders the paginated Cars table with server-backed filters.
 */
export const Cars = () => {
  const navigate = useNavigate();
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);
  const {
    cars,
    categoryOptions,
    errorMessage,
    filters,
    handleFilterChange,
    handlePaginationChange,
    hasNextCarsPage,
    isLoading,
    makeOptions,
    modelOptions,
    pagination,
    retryCarsRequest,
  } = useCarsData();

  /**
   * Navigates to the selected car details page.
   */
  const viewCar = (car: Car) => navigate(ROUTES.VIEW_CAR(car.id));
  const handleDeleteCar = (car: Car) => {
  setCarToDelete(car);
};
  const closeDeleteModal = () => {
  setCarToDelete(null);
};
const confirmDeleteCar = async () => {
  if (!carToDelete) {
    return;
  }

  try {
    await deleteCar(carToDelete.id);

    setCarToDelete(null);
    retryCarsRequest();
  } catch (error) {
    console.error('Could not delete car:', error);
  }
};
  return (
    <div data-testid="cars-page">
      <Wrapper>
  <Header title="Cars" />

  <Button
    type="button"
    onClick={() => navigate(ROUTES.ADD_CAR)}
  >
    Add Car
  </Button>
</Wrapper>

      <CarsTable
  cars={cars}
  categoryOptions={categoryOptions}
  errorMessage={errorMessage}
  filters={filters}
  hasNextCarsPage={hasNextCarsPage}
  isLoading={isLoading}
  makeOptions={makeOptions}
  modelOptions={modelOptions}
  pagination={pagination}
  onDeleteCar={handleDeleteCar}
  onFilterChange={handleFilterChange}
  onPaginationChange={handlePaginationChange}
  onRetry={retryCarsRequest}
  onViewCar={viewCar}
/>

<Modal
  isOpen={carToDelete !== null}
  title="Delete car"
  description={`Are you sure you want to delete the car with VIN ${
    carToDelete?.vin ?? ''
  }?`}
  data-testid="delete-car-modal"
  onClose={closeDeleteModal}
  secondaryCta={{
    label: 'Cancel',
    onClick: closeDeleteModal,
  }}
  primaryCta={{
  label: 'Yes',
  onClick: confirmDeleteCar,
}}
/>
    </div>
  );
};
