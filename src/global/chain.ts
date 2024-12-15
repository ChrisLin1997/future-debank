import arbitrum from '@/assets/images/chain/arbitrum.png'
import avalanche from '@/assets/images/chain/avalanche.png'
import bsc from '@/assets/images/chain/bsc.png'
import ethereum from '@/assets/images/chain/ethereum.png'
import optimism from '@/assets/images/chain/optimism.png'
import base from '@/assets/images/chain/base.png'
import { isDevelopmentMode } from '@/utils'

export enum Chain {
  ETH = 1,
  BASE = 8453,
  BSC = 56,
  AVAX = 43114,
  ARB = 42161,
  OP = 10,
  Sepolia = 11155111,
}

type ChainInfo = {
  icon: string
  id: Chain
  name: string
  rpc: string
  explorer: string
  coin: {
    name: string
    icon: string
  }
}

const INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY
export const CHAIN_INFO: { [props: number]: ChainInfo } = {
  [Chain.ETH]: {
    icon: ethereum,
    id: Chain.ETH,
    name: 'Ethereum',
    rpc: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
    explorer: 'https://etherscan.io',
    coin: {
      name: 'ETH',
      icon: ethereum,
    }
  },
  [Chain.BASE]: {
    icon: base,
    id: Chain.BASE,
    name: 'Base',
    rpc: 'https://mainnet.base.org',
    explorer: 'https://basescan.org',
    coin: {
      name: 'ETH',
      icon: 'eth-icon',
    },
  },
  [Chain.BSC]: {
    icon: bsc,
    id: Chain.BSC,
    name: 'BSC',
    rpc: 'https://bsc-dataseed.binance.org',
    explorer: 'https://bscscan.com',
    coin: {
      name: 'BNB',
      icon: bsc,
    },
  },
  [Chain.AVAX]: {
    icon: avalanche,
    id: Chain.AVAX,
    name: 'Avalanche',
    rpc: 'https://api.avax.network/ext/bc/C/rpc',
    explorer: 'https://avascan.info',
    coin: {
      name: 'AVAX',
      icon: avalanche,
    },
  },
  [Chain.ARB]: {
    icon: arbitrum,
    id: Chain.ARB,
    name: 'Arbitrum',
    rpc: 'https://arbitrum.llamarpc.com',
    // rpc: `https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    explorer: 'https://arbiscan.io',
    coin: {
      name: 'ETH',
      icon: ethereum,
    },
  },
  [Chain.OP]: {
    icon: optimism,
    id: Chain.OP,
    name: 'Optimism',
    rpc: 'https://mainnet.optimism.io',
    explorer: 'https://optimistic.etherscan.io',
    coin: {
      name: 'ETH',
      icon: ethereum,
    },
  },
  [Chain.Sepolia]: {
    icon: ethereum,
    id: Chain.Sepolia,
    name: 'Sepolia',
    // rpc: 'https://ethereum-sepolia-rpc.publicnode.com',
    rpc: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
    explorer: 'https://sepolia.etherscan.io',
    coin: {
      name: 'SepoliaETH',
      icon: ethereum,
    }
  },
}

export const CHAIN_INFO_LIST = [
  CHAIN_INFO[Chain.ETH],
  CHAIN_INFO[Chain.BASE],
  CHAIN_INFO[Chain.ARB],
  CHAIN_INFO[Chain.OP],
  CHAIN_INFO[Chain.BSC],
  CHAIN_INFO[Chain.AVAX],
]

if (isDevelopmentMode()) {
  CHAIN_INFO_LIST.push(CHAIN_INFO[Chain.Sepolia])
}
