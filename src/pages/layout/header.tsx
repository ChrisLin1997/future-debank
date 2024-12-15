import { MouseEvent, useState } from 'react'
// import { HeaderWrapper, HeaderContainer, LogoWrapper, NavItem, ConnectWallet, ChainItem, Protocol } from './header.style'
import { HeaderWrapper, HeaderContainer, LogoWrapper, NavItem, ConnectWallet, ChainItem, UserItem, Protocol } from './header.style'
import { Button, Popover, Typography } from '@mui/material'
import { CHAIN_INFO, CHAIN_INFO_LIST } from '@/global/chain'
import LogoImg from '@/assets/images/logo-icon.png'
import MenuImg from '@/assets/images/menu.png'
import WalletContainer from '@/context/walletContext'
import Drawer from '@mui/material/Drawer'
import { NavLink } from 'react-router-dom'
import CloseIcon from '@/assets/icons/close.svg?react'
import WalletIcon from '@/assets/icons/wallet.svg?react'
import ConntectWalletDialog from './connect-wallet-dialog'
import { useTranslation } from 'react-i18next'

const anchorOrigin = { vertical: 'bottom', horizontal: 'left' } as const
const anchorStyle = { top: 8 }

const Header = () => {
  const wallet = WalletContainer.useContainer()

  const handleDisconnect = () => {
    wallet.disconnect()
    handleUserMenuClose()
  }

  const isConnect = Boolean(wallet.account)
  const ellipsisAddress = isConnect ? `${wallet.account.slice(0, 6)} ... ${wallet.account.slice(-6)}` : ''

  // dialog
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const handleOpen = () => setIsOpenDialog(true)
  const handleClose = () => setIsOpenDialog(false)

  // switch chain
  const [chainMenuElement, setChainMenuElement] = useState<HTMLButtonElement | null>(null)
  const chainMenuOpen = Boolean(chainMenuElement)

  const openPopover = (event: MouseEvent<HTMLButtonElement>) => setChainMenuElement(event.currentTarget)
  const closePopover = () => setChainMenuElement(null)

  // user menu
  const [userMenuElement, setUserMenuElement] = useState<HTMLElement | null>(null)
  const userMenuOpen = Boolean(userMenuElement)
  const handleUserMenuOpen = (event: MouseEvent<HTMLElement>) => setUserMenuElement(event.currentTarget)
  const handleUserMenuClose = () => setUserMenuElement(null)

  // mobile meun
  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  const { t } = useTranslation()

  const navLinks = [
    { key: 'market', path: '/market', text: t('market') },
    { key: 'economy', path: '/economy', text: t('economy') },
    // { key: 'analysis', path: '/analysis', text: 'Analysis' },
    // { key: 'community', path: '/community', text: 'Community' },
    { key: 'protocol', path: '/protocol', text: <Protocol>{t('strag_protocol')}</Protocol> },
  ]

  const userMenu = [
    { key: 'wallet', path: '/wallet/profile', text: t('wallet'), icon: <WalletIcon /> },
  ]

  return (
    <HeaderWrapper>

      <HeaderContainer>
        <LogoWrapper to="/" draggable="false">
          <img className="logo-img" src={LogoImg} />
          <div className="leading-none font-black">
            <div className="mb-[2px] text-[16px] tracking-[0.4px]  text-primary ">STRATEGLE</div>
            <div className="ml-[2px] text-[10px] text-primary-dark">Decentralize Bank</div>
          </div>
        </LogoWrapper>

        {/* Mobile Meun */}
        <img src={MenuImg} onClick={() => setOpenMobileMenu(true)} width="32px" height="32px" className="ml-auto sm:hidden cursor-pointer hover:opacity-80 transition-all"/>
        <Drawer anchor="right" open={openMobileMenu} onClose={() => setOpenMobileMenu(false)}>
          <div className="relative p-5 w-screen h-screen flex flex-col items-center gap-8 bg-bg text-white">
            <CloseIcon className="absolute top-4 left-4 p-2 fill-white w-10 h-10 cursor-pointer" onClick={() => setOpenMobileMenu(false)} />
            <div className="mb-6 flex flex-col items-center">
              <img className="mb-3 w-14 h-14" src={LogoImg} />
              <div className="text-3xl text-primary font-black">STRATEGLE</div>
              <div className="text-xl text-primary-dark font-bold">Decentralize Bank</div>
            </div>

            {navLinks.map(item => (
              <NavLink to={item.path} key={item.key} className="block font-bold hover:text-[#b28905]" onClick={() => setOpenMobileMenu(false)}>
                <div className="w-fit text-2xl">
                  {item.text}
                </div>
              </NavLink>
            ))}

            <div className="w-4/5 h-[1px] bg-gray-1" />

            {userMenu.map(item => (
              <NavLink to={item.path} key={item.key} className="block font-bold hover:text-[#b28905]" onClick={() => setOpenMobileMenu(false)}>
                <div className="w-fit text-2xl">
                  {item.text}
                </div>
              </NavLink>
            ))}
          </div>
        </Drawer>

        {/* Desktop Menu */}
        <menu className="hidden sm:flex items-center">
          {navLinks.map(item => (
            <NavItem to={item.path} key={item.key} className="hover:text-[#b28905]">
              {item.text}
            </NavItem>
          ))}
        </menu>

        {/* 錢包狀態 */}
        { isConnect &&
        <section className="ml-auto hidden sm:flex items-center gap-4">
          {/* chain switch */}
          <Button onClick={openPopover} variant="outlined" size="small">
            { CHAIN_INFO[wallet.chainId] && <img className="mr-1 w-6 h-auto rounded-full" src={CHAIN_INFO[wallet.chainId]?.icon} /> }
            { CHAIN_INFO[wallet.chainId]?.name || t('no_support') }
          </Button>
          <Popover
            open={chainMenuOpen}
            anchorEl={chainMenuElement}
            onClose={closePopover}
            anchorOrigin={anchorOrigin}
            sx={anchorStyle}
          >
            <div>
              {CHAIN_INFO_LIST.map((item) => (
                <ChainItem className={item.id === wallet.chainId ? 'active' : ''} key={item.id} onClick={() => wallet.switchChain(item.id)}>
                  <img className="chain-icon" src={item.icon}  />
                  <Typography className="chain-text" sx={{ py: 1, px: 2, fontSize: 14, }}>{item.name}</Typography>
                </ChainItem>
              ))}
            </div>
          </Popover>

          {/* User overview */}
          <Button variant="contained" size="small" onClick={handleUserMenuOpen}>{ellipsisAddress}</Button>
          <Popover
            open={userMenuOpen}
            anchorEl={userMenuElement}
            onClose={handleUserMenuClose}
            anchorOrigin={anchorOrigin}
            sx={anchorStyle}
          >
            <div style={{ padding: '6px', width: '164px' }}>
              {userMenu.map((item) => (
                <UserItem key={item.key} to={item.path} onClick={handleUserMenuClose}>
                  {item.icon}
                  <Typography className="chain-text" sx={{ py: 1, px: 2, fontSize: 14, }}>{item.text}</Typography>
                </UserItem>
              ))}

              <div
                onClick={handleDisconnect}
                className="m-4 mb-2 py-1 text-center text-gray-1 border border-gray-1 opacity-40 hover:opacity-100 hover:border-secondary hover:text-secondary cursor-pointer rounded"
              >
                Disconnect
              </div>
            </div>
          </Popover>
        </section>
        }

        {/* 連接錢包 */}
        { !isConnect && <ConnectWallet className="!hidden sm:!block" variant="contained" size="small" onClick={handleOpen}>{t('connect_wallet')}</ConnectWallet> }
        <ConntectWalletDialog  isOpen={isOpenDialog} onClose={handleClose} />

      </HeaderContainer>
    </HeaderWrapper>
  )
}

export default Header
