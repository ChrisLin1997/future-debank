import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Link, Outlet } from 'react-router-dom'
import Header from './header'
import Footer from './footer'
import ProgressLinear from '@/components/progress-linear'
import ProgressCircular from '@/components/progress-circular'
import NotFound from '@/assets/images/not-found.png'
import Button from '@mui/material/Button'

interface LayoutProps {
  isErrorPage?: boolean
  children?: React.ReactNode
}

const Layout = ({ isErrorPage = false, children }: LayoutProps) => {

  const toastOption = {  style: { wordBreak: 'break-all' } } as any

  return (
    <main className="flex flex-col pt-[56px] relative w-full min-h-screen">
      <ProgressLinear />
      <Header />

      <section className="flex-1 w-full">
        { isErrorPage ? children : <Outlet /> }
      </section>

      <Footer />
      <Toaster position="bottom-right" reverseOrder={true} toastOptions={toastOption}/>
    </main>
  )
}

Layout.SuspenseLayout = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full min-h-screen flex justify-center items-center">
          <ProgressCircular />
        </div>
      }>
      <Outlet />
    </Suspense>
  )
}

Layout.ErrorBoundary = () => {
  return (
    <Layout isErrorPage>
      <div className="flex h-[calc(100vh-56px)]">
        <section className="m-auto p-8 w-full max-w-screen-sm rounded-2xl flex justify-center items-center gap-8 text-white bg-gray-bg shadow">
          <img src={NotFound} className="w-1/2" />
          <div className="w-1/2">
            <h1 className="mb-2 text-5xl font-black">Oops!</h1>
            <h2 className="mb-4 text-4xl font-black">Get Some Error</h2>
            <p className="mb-6">we're sorry the page you requested could be error. Please go back to the homepage!</p>
            <Link to="/">
              <Button variant="contained" size="large" fullWidth>Back Homepage</Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}

Layout.NotFound = () => {
  return (
    <div className="flex h-[calc(100vh-56px)]">
      <section className="m-auto p-8 w-full max-w-screen-sm rounded-2xl flex justify-center items-center gap-8 text-white bg-gray-bg shadow">
        <img src={NotFound} className="w-1/2" />
        <div className="w-1/2">
          <h1 className="mb-2 text-5xl font-black">404</h1>
          <h2 className="mb-4 text-4xl font-black">Page Not Found</h2>
          <p className="mb-6">we're sorry the dpage you requested could not be found. Please go back to the homepage!</p>
          <Link to="/">
            <Button variant="contained" size="large" fullWidth>Back Homepage</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Layout
