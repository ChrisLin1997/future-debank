import { CHAIN_INFO, CHAIN_INFO_LIST } from '@/global/chain'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { createContainer } from 'unstated-next'

// 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf
// 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
// 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48

type Token = {
  address: string
  name: string
  symbol: string
}

type Tokens = {
  [chainName: string]: Array<Token>
}

const initTokens = JSON.parse(localStorage.getItem('tokens') || '{}')

const useTokens = () => {

  const [tokens, setTokens] = useState<Tokens>(initTokens)

  const flattenedTokens = useMemo(() => {
    return Object.entries(tokens).flatMap(([chainName, tokenInfos]) =>
      tokenInfos.map(tokenInfo => ({
        chainName,
        chainId: CHAIN_INFO_LIST.find(item => item.name === chainName)?.id || 1,
        ...tokenInfo
      }))
    )
  }, [tokens])

  const addToken = (chainId: number, address: string, name: string, symbol: string) => {
    const haveSame = [...tokens[CHAIN_INFO[chainId].name] || []].find(item => item.address === address)

    if (haveSame) return toast.success('Existing same token')

    setTokens(prev => {
      const oldList = [...prev[CHAIN_INFO[chainId].name] || []]
      const newList = [ ...(oldList || []), { address, name, symbol } ]
      return { ...prev, [CHAIN_INFO[chainId].name]: newList }
    })

    toast.success('Success')
  }

  const removeToken = (chainId: number, address: string) => {
    setTokens(prev => {
      const newList = [...prev[CHAIN_INFO[chainId].name]]
      const targetIndex = newList.findIndex(item => item.address === address)
      console.log(targetIndex)
      if (targetIndex === -1) return prev

      newList.splice(Number(targetIndex), 1)
      return { ...prev, [CHAIN_INFO[chainId].name]: newList }
    })
  }

  useEffect(() => {
    localStorage.setItem('tokens', JSON.stringify(tokens))
  }, [tokens])


  return { tokens, flattenedTokens, addToken, removeToken }
}

const TokensContainer = createContainer(useTokens)

export default TokensContainer
