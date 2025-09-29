// contexts/UIContext.tsx
import { createContext, useContext, useState } from "react";

interface UIContextType {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  showSignupModal: boolean;
  setShowSignupModal: (value: boolean) => void;
  showResetModal: boolean;
  setShowResetModal: (value: boolean) => void;
  closeAllModals: () => void;
}

const UIContext = createContext<UIContextType>({
  showModal: false,
  setShowModal: () => {},
  showSignupModal: false,
  setShowSignupModal: () => {},
  showResetModal: false,
  setShowResetModal: () => {},
  closeAllModals: () => {},
});

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const closeAllModals = () => {
    setShowModal(false);
    setShowSignupModal(false);
    setShowResetModal(false);
  };

  return (
    <UIContext.Provider
      value={{
        showModal,
        setShowModal,
        showSignupModal,
        setShowSignupModal,
        showResetModal,
        setShowResetModal,
        closeAllModals,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
