import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import BannerLandingImg from '@/assets/images/banner-landing.png'
import ProtocolImg from '@/assets/images/intro-protocol.png'
import EconomyImg from '@/assets/images/intro-economy.png'
import QuoteImg from '@/assets/images/intro-quote.png'
import MainQuote from './main-quote'
import useTitle from '@/hooks/useTitle'
import { useTranslation } from 'react-i18next'

const Introduce = () => {
  const { t } = useTranslation()

  useTitle('')

  return (
    <div className="bg-bg">
      <div className="mx-auto max-w-screen-xl bg-bg min-h-dvh text-white">
        <section className="mb-14 flex flex-wrap lg:flex-nowrap justify-between items-center gap-10 min-h-[360px]">
          <div className="p-6 w-full lg:w-1/2">
            <div className="my-10 font-black">
              <span className="text-6xl text-primary">STRATEGLE</span>
              <span className="text-5xl text-white">.TECH</span>
            </div>
            <p className="mb-10 text-2xl font-bold text-white">{t('introduce_main_title_1')}</p>
            <p className="mb-8 text-white">{t('introduce_main_title_2')}</p>

            <div className="flex items-center flex-wrap gap-6">
              <Link to="/market">
                <Button variant="outlined" size="large">{t('market_overview')}</Button>
              </Link>
              <Link to="/economy">
                <Button variant="outlined" size="large">{t('economy_news')}</Button>
              </Link>
              <Link to="/wallet/tokens">
                <Button variant="contained" size="large">{t('asset_managment')}</Button>
              </Link>
            </div>
          </div>

          <div className="relative flex w-full lg:w-1/2 h-fit">
            <img src={BannerLandingImg} className="m-auto w-full h-auto" draggable="false" />
            <div className="absolute w-1/5 h-full -left-0 top-0 bg-gradient-to-r from-bg to-transparent" />
            <div className="absolute w-1/5 h-full -right-0 top-0 bg-gradient-to-l from-bg to-transparent" />
            <div className="absolute w-full h-1/6 bottom-0 bg-gradient-to-t from-bg to-transparent" />
            <div className="absolute w-full h-1/6 top-0 bg-gradient-to-b from-bg to-transparent" />
          </div>
        </section>

        <section className="mb-10 pb-4 px-6 flex flex-wrap sm:flex-nowrap gap-4">
          <article className="mb-6 w-full sm:w-1/3 flex flex-col items-center">
            <img src={QuoteImg} className="mb-2 w-auto h-32" draggable="false" />
            <div className="mb-4 font-black text-2xl text-primary-light">{t('market_overview')}</div>
            <p className="mb-6 px-4 text-center">{t('market_overview_tip')}</p>
            <Link to="/market" className="mt-auto">
              <Button className="w-20 !capitalize" variant="contained">{t('detail')}</Button>
            </Link>
          </article>
          <article className="mb-6 w-full sm:w-1/3 flex flex-col items-center">
            <img src={EconomyImg} className="mb-2 w-auto h-32" draggable="false" />
            <div className="mb-4 font-black text-2xl text-primary-light">{t('economy_news')}</div>
            <p className="mb-6 px-4 text-center">{t('economy_news_tip')}</p>
            <Link to="/economy" className="mt-auto">
              <Button className="w-20 !capitalize" variant="contained">{t('detail')}</Button>
            </Link>
          </article>
          <article className="mb-6 w-full sm:w-1/3 flex flex-col items-center">
            <img src={ProtocolImg} className="mb-2 w-auto h-32" draggable="false" />
            <div className="mb-4 font-black text-2xl text-primary-light">{t('asset_managment')}</div>
            <p className="mb-6 px-4 text-center">{t('asset_managment_tip')}</p>
            <Link to="/wallet/tokens" className="mt-auto">
              <Button className="w-20 !capitalize" variant="contained">{t('detail')}</Button>
            </Link>
          </article>
        </section>

        <MainQuote />
      </div>
    </div>
  )
}

export default Introduce
