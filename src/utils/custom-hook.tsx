import { useState } from 'react';

// Custom Hook for managing modal state
const CustomHook = (initState?: boolean) => {
  const [isOpen, setIsOpen] = useState(!!initState);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal };
};

export default CustomHook;
