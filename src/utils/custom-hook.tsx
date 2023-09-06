import { useState } from 'react';

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
