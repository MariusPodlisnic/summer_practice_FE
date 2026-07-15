import { useEffect, useState } from "react";
import type { SelectOption } from "../../../types/common";
import { EMPTY_OWNER_OPTION } from "../constants";
import { getOwners } from "../../../api/owners/getOwners";
import { getOwnerOptions } from "../utils";

export const useOwnersOptions = (ownerId: string, isViewMode:boolean) => {
  const [ownerOptions, setOwnerOptions] = useState<SelectOption[]>(
    [EMPTY_OWNER_OPTION]
  );
  
    const [isLoadingOwners, setIsLoadingOwners] =
    useState(!isViewMode);
   useEffect(() => {
    if (isViewMode || ownerId) {
      return;
    }
  
    let isCurrentRequest = true;
  
    /**
     * Loads owners for the add-car owner dropdown.
     */
    const fetchOwnersData = async () => {
      setIsLoadingOwners(true);
  
      try {
        const ownersResponse = await getOwners({
          page: 1,
          per_page: 100,
        });
  
        if (!isCurrentRequest) {
          return;
        }
  
        setOwnerOptions(
          getOwnerOptions(ownersResponse.items)
        );
      } catch (error) {
        console.error(error);
  
        if (isCurrentRequest) {
          setOwnerOptions(getOwnerOptions([]));
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoadingOwners(false);
        }
      }
    };
  
    fetchOwnersData();
  
    return () => {
      isCurrentRequest = false;
    };
  }, [isViewMode,ownerId]);
  
  return {
    isLoadingOwners,
    ownerOptions
  };
};