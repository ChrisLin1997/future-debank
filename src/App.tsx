import Router from '@/routes'
import WebSocketServerContainer from '@/context/wsConext'
import WalletContainer from '@/context/walletContext'
import MarketContainer from '@/context/marketContext'
import ContractContainer from '@/context/contractContext'
import TokensContainer from '@/context/tokensContext'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import { theme } from './styles/theme'

const composeProviders = (...providers) => {
  return ({ children, ...props }) =>
    providers.reduceRight((acc, [Provider, providerProps = {}]) => {
      const mergedProps = typeof providerProps === 'function' ? providerProps(props) : providerProps
      return <Provider {...mergedProps}>{acc}</Provider>
    }, children)
}

const AppProviders = composeProviders(
  [WebSocketServerContainer.Provider],
  [ThemeProvider, { theme }],
  [MarketContainer.Provider],
  [WalletContainer.Provider],
  [ContractContainer.Provider],
  [TokensContainer.Provider],
  [SnackbarProvider,
    {
      maxSnack: 5,
      anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      autoHideDuration: 1500,
    },
  ]
)

const App = () => {
  return (
    <AppProviders>
      <Router />
    </AppProviders>
  )
}

export default App
