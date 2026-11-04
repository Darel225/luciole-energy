import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const DevisModalContext = createContext(null)

export function DevisModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialData, setInitialData] = useState({})

  const openDevisModal = useCallback((data = {}) => {
    setInitialData(data)
    setIsOpen(true)
  }, [])

  const closeDevisModal = useCallback(() => {
    setIsOpen(false)
    setInitialData({})
  }, [])

  const value = useMemo(
    () => ({
      isOpen,
      initialData,
      openDevisModal,
      openModal: openDevisModal,
      closeDevisModal,
      closeModal: closeDevisModal,
    }),
    [isOpen, initialData, openDevisModal, closeDevisModal]
  )

  return (
    <DevisModalContext.Provider value={value}>
      {children}
    </DevisModalContext.Provider>
  )
}

export function useDevisModal() {
  const context = useContext(DevisModalContext)
  if (!context) {
    throw new Error('useDevisModal doit être utilisé à l\'intérieur de DevisModalProvider')
  }
  return context
}

export default DevisModalContext
