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
import { formatNumber } from '@/utils'
import toast from 'react-hot-toast'

const Tokens = () => {
  const [isOpenAddDialog, setIsOpenAddDialog] = useState(false)

  const { tokens, flattenedTokens, removeToken } = TokensContainer.useContainer()
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


  const handleHide = async (chainId: number, address: string) => {
    const isConfirm = confirm('confirm')
    if (isConfirm) {
      removeToken(chainId, address)
      toast.success('Hide Success')
    }
  }


  return (
    <Container>
      <div className="mb-6 mr-5 flex justify-between items-center">
        <div>
          <div className="font-black text-2xl">Tokens</div>
          <div>Manage cryptocurrency holdings with ease.</div>
        </div>

        <Button color="secondary" variant="contained" size="large" onClick={() => setIsOpenAddDialog(true)}>Add Token</Button>
      </div>

      <section className="mb-10 p-1">
        <table className="w-full">
          <thead>
            <tr className="py-3 flex text-left font-bold border-b border-gray-400">
              <th className="px-2 w-40">Chain</th>
              <th className="px-2 w-96">Token</th>
              <th className="px-2 flex-1">Amount</th>
              <th className="px-2 flex-1">Price</th>
              <th className="px-2 flex-1">USD Value</th>
              <th className="px-2 w-44"></th>
            </tr>
          </thead>
        </table>

        { flattenedTokens.map(item => (
          <article key={`${item.chainId}-${item.address}`} className="py-3 flex text-left text-lg border-b border-gray-200">
            <a
              className="px-2 w-40 text-secondary font-bold flex items-center gap-2"
              href={CHAIN_INFO[item.chainId].explorer}
              target="_blank"
            >
              <img src={CHAIN_INFO[item.chainId].coin.icon} alt="" className="w-6 h-6" />
              <span className="">{ item.chainName }</span>
            </a>
            <a className="px-2 w-96 font-bold break-all" href={`${CHAIN_INFO[item.chainId].explorer}/token/${item.address}`}>
              <span className="mr-1">{item.name}</span>
              (<span className=" text-gray-500"> {item.symbol} </span>)
            </a>
            <span className="px-2 flex-1">{ balances[item.symbol] }</span>
            <span className="px-2 flex-1">${ formatNumber(ticker[`${item.symbol}USDT`]?.price) || '-' }</span>
            <span className="px-2 flex-1">${ Big(Number(balances[item.symbol] || 0)).mul(Number(ticker[`${item.symbol}USDT`]?.price || 0)).toFixed()  }</span>
            <span className="px-2 w-44 flex gap-2">
              <Button color="secondary" variant="contained" size="small">SEND</Button>
              <Button color="secondary" variant="outlined" size="small" onClick={() => handleHide(item.chainId, item.address)}>HIDE</Button>
            </span>
          </article>
        )) }
      </section>

      <AddDialog isOpen={isOpenAddDialog} onClose={() => setIsOpenAddDialog(false)} />

    </Container>
  )
}

export default Tokens
