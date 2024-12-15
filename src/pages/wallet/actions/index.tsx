import { useState } from 'react'
import Send from './send'
import Swap from './swap'
import Receive from './recevie'
import Donate from './donate'
import { Dialog, DialogContent } from '@mui/material'
import ArrowIcon from '@/assets/icons/arrow-top.svg?react'
import SwapIcon from '@/assets/icons/swap.svg?react'
import DonateIcon from '@/assets/icons/donate.svg?react'

enum ETab {
  SEND = 'send',
  RECEIVE = 'receive',
  SWAP = 'swap',
  BRIDGE = 'bridge',
  DONATE = 'donate',
}

const tabList = [
  { name: 'Send', value: ETab.SEND, icon: <ArrowIcon className="fill-white" /> },
  { name: 'Receive', value: ETab.RECEIVE, icon: <ArrowIcon className="fill-white rotate-180" /> },
  { name: 'Swap', value: ETab.SWAP, icon: <SwapIcon className="w-8 h-8 fill-white" /> },
  { name: 'Donate', value: ETab.DONATE, icon: <DonateIcon className="fill-white" /> },
]

const Wallet = () => {

  const [isOpen, setIsOpne]= useState(false)
  const [tab, setTab] = useState(ETab.SEND)
  const handleAction = (tab: ETab) => {
    setTab(tab)
    setIsOpne(true)
  }

  return (
    <div>
      <section className="flex items-center justify-end gap-4 rounded-md">
        { tabList.map(item => (
          <article
            key={item.value}
            className="pt-2 w-14 flex flex-col items-center cursor-pointer"
            onClick={() => handleAction(item.value)}
          >
            <div className="flex justify-center items-center w-10 h-10 bg-secondary rounded-full">
              {item.icon}
            </div>
            <div className="text-sm font-semibold">{item.name}</div>
          </article>
        )) }
      </section>

      <Dialog open={isOpen} onClose={() => setIsOpne(false)}>
        <DialogContent>
          {tab === ETab.SEND && <Send />}
          {tab === ETab.RECEIVE && <Receive />}
          {tab === ETab.SWAP && <Swap />}
          {tab === ETab.DONATE && <Donate />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Wallet
