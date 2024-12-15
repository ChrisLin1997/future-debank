import { CHAIN_INFO } from '@/global/chain'
import { useEffect, useState } from 'react'
import { createContainer } from 'unstated-next'


type Tokens = {
  [chainName: string]: string[]
}

const initTokens = JSON.parse(localStorage.getItem('tokens') || '{}')

const useTokens = () => {

  const [tokens, setTokens] = useState<Tokens>(initTokens)

  const addToken = (chainId: number, address: string) => {
    setTokens(prev => {
      const newList = Array.from(new Set([ ...(prev[CHAIN_INFO[chainId].name] || []), address ]))
      return { ...prev, [CHAIN_INFO[chainId].name]: newList }
    })
  }

  const removeToken = (chainId: number, address: string) => {
    setTokens(prev => {
      const newList = [...prev[CHAIN_INFO[chainId].name]]
      const targetIndex = newList.find(item => item === address)
      if (!targetIndex) return prev

      newList.splice(Number(targetIndex), 1)
      return { ...prev, [CHAIN_INFO[chainId].name]: newList }
    })
  }

  useEffect(() => {
    localStorage.setItem('tokens', JSON.stringify(tokens))
  }, [tokens])


  return { tokens, addToken, removeToken }
}

const TokensContainer = createContainer(useTokens)

export default TokensContainer
