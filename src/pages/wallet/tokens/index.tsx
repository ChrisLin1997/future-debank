import Container from '@/components/container'
import { Button } from '@mui/material'
import AddDialog from './dialog-add'
import { useEffect, useState } from 'react'
import TokensContainer from '@/context/tokensContext'
import MarketContainer from '@/context/marketContext'
import WalletContainer from '@/context/walletContext'
import { CHAIN_INFO } from '@/global/chain'
import { ethers } from 'ethers'
import Big from 'big.js'

const Tokens = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const { tokens, flattenedTokens } = TokensContainer.useContainer()
  const { ticker } = MarketContainer.useContainer()
  const { account } = WalletContainer.useContainer()

  const [balances, setBalances] = useState<{ [tokenName: string]: string }>({})


  useEffect(() => {
    const userAddress = account
    const erc20Abi = [
      'function balanceOf(address owner) view returns (uint256)',
      'function decimals() view returns (uint8)'
    ]

    flattenedTokens.forEach(async (tokenInfo) => {
      const tokenAddress = tokenInfo.address
      const chainInfo = CHAIN_INFO[tokenInfo.chainId]
      const provider = new ethers.JsonRpcProvider(chainInfo.rpc)
      const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, provider)

      // balance
      const balance = await tokenContract.balanceOf(userAddress)
      const decimals = await tokenContract.decimals()
      const formattedBalance = ethers.formatUnits(balance, decimals)
      setBalances(prev => ({ ...prev, [tokenInfo.symbol]: formattedBalance }))
    })
  }, [tokens])



  return (
    <Container>
      <div className="mb-10 flex justify-between items-center">
        <div>
          <div className="font-black text-2xl">Tokens</div>
          <div>Manage cryptocurrency holdings with ease.</div>
        </div>

        <Button color="secondary" variant="contained" className="h-12" onClick={() => setIsOpenDialog(true)}>Add Token</Button>
      </div>

      <AddDialog isOpen={isOpenDialog} onClose={() => setIsOpenDialog(false)} />

      <section className="mb-10">
        <table className="w-full">
          <thead>
            <tr className="p-3 flex text-left font-bold border-b border-gray-400">
              <th className="px-2 w-32">Chain</th>
              <th className="px-2 w-80">Token</th>
              <th className="px-2 flex-1">Amount</th>
              <th className="px-2 flex-1">Price</th>
              <th className="px-2 flex-1">USD Value</th>
              <th className="px-2 w-28"></th>
            </tr>
          </thead>
        </table>

        { flattenedTokens.map(item => (
          <article key={`${item.chainId}-${item.address}`} className="p-3 flex text-left border-b border-gray-200">
            <span className="px-2 w-32">{ item.chainName }</span>
            <span className="px-2 w-80">{ `${item.name} ( ${item.symbol} )` }</span>
            <span className="px-2 flex-1">{ balances[item.symbol] }</span>
            <span className="px-2 flex-1">${ ticker[`${item.symbol}USDT`]?.price || '-' }</span>
            <span className="px-2 flex-1">${ Big(Number(balances[item.symbol] || 0)).mul(Number(ticker[`${item.symbol}USDT`]?.price || 0)).toFixed()  }</span>
            <span className="px-2 w-28"></span>
          </article>
        )) }
      </section>
    </Container>
  )
}

export default Tokens
