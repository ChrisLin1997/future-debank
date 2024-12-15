import LogoIcon from '@/assets/images/logo-icon.png'
// import TelegramIcon from '@/assets/icons/telegram.svg?react'
// import XIcon from '@/assets/icons/x.svg?react'
// import ArbitrumIcon from '@/assets/icons/arbitrum.svg?react'
import MailIcon from '@/assets/icons/mail.svg?react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <div className="p-5 w-full font-bold text-sm text-center shadow-md bg-gray-bg border-t border-gray-1 text-white">
      <section className="mx-auto w-full max-w-screen-lg flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <img src={LogoIcon} width="28px" height="28px" />
            <span className="text-2xl text-primary font-black">STRATEGLE</span>
          </div>

          <p className="mb-2 text-sm font-bold text-gray-hover">{t('introduce_main_title_1')}</p>
          <p className="text-left text-xs text-gray-secondary">{`© ${new Date().getUTCFullYear()} - Strategle.tech All Rights Reserved.`}</p>

        </div>

        <div>
          {/* <div className="mb-4 flex items-center gap-4">
            <XIcon width="24px" height="24px" className="cursor-pointer" onClick={() => window.open('https://twitter.com/Strategle_Tech')}/>
            <TelegramIcon width="24px" height="24px" className="cursor-pointer" onClick={() => window.open('https://t.me/STRAG_Protocol')} />
            <div className="flex w-[24px] h-[24px] cursor-pointer rounded-full border-solid border border-gray-1" onClick={() => window.open('https://www.strategle.tech/protocol')}>
              <img src={LogoIcon} width="20px" height="20px" className="m-auto" />
            </div>
            <div className="relative flex w-[24px] h-[24px] cursor-pointer" onClick={() => window.open('https://arbiscan.io/address/0x7683aC3FF19cf4A6ac42E035aFe67f237086fAC1')}>
              <ArbitrumIcon width="48px" height="48px" className="absolute inset-0 -left-[12px] m-auto pointer-events-none" />
            </div>
          </div> */}

          <div className="flex items-center gap-2">
            <MailIcon width="16px" height="16px" />
            <span className="tex-sm text-gray-hover">strategle.tech.io@gmail.com</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer
