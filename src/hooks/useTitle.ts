import { useEffect } from 'react'

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title ? `${title} - Strategle` : 'Strategle - Decentralize Bank'
  }, [])
}

export default useTitle
