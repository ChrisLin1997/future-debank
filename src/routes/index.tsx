import { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { createRoutesFromElements, createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import Layout from '@/pages/layout'

const routes = [
  { key: 'home', path: '/', index: true, component: lazy(() => import('@/pages/introduce')) },
  { key: 'market', path: '/market', index: false, component: lazy(() => import('@/pages/market')) },
  { key: 'economy', path: '/economy', index: false, component: lazy(() => import('@/pages/economy')) },
  { key: 'economy', path: '/economy/:category', index: false, component: lazy(() => import('@/pages/economy-category')) },
  { key: 'analysis', path: '/analysis', index: false, component: lazy(() => import('@/pages/analysis')) },
  { key: 'community', path: '/community', index: false, component: lazy(() => import('@/pages/community')) },
  { key: 'protocol', path: '/protocol', index: false, component: lazy(() => import('@/pages/protocol')) },
  { key: 'wallet', path: '/wallet', index: false, component: lazy(() => import('@/pages/wallet')),
    children: [
      { key: 'tokens', path: 'tokens', index: true, component: lazy(() => import('@/pages/wallet/tokens')) },
      { key: 'transactions', path: 'transactions', index: false, component: lazy(() => import('@/pages/wallet/transactions')) },
      { key: 'setting', path: 'setting', index: false, component: lazy(() => import('@/pages/wallet/setting')) },
    ]
  },

  { key: 'not-found', path: '*', index: false, component: Layout.NotFound },
]

const root = (
  <Route path="/" element={<Layout />} errorElement={<Layout.ErrorBoundary />}>
    <Route element={<Layout.SuspenseLayout />}>
      { routes.map(item => (
        <Route key={item.key} index={false} path={item.path} element={<item.component/>}>
          { item.index === false && item.children ? item.children.map(node => <Route key={node.key} index={item.index} path={node.path} element={<node.component/>} />) : null }
        </Route>
      ))}
    </Route>
  </Route>
)

const router = createBrowserRouter(createRoutesFromElements(root))

const Router = () => (
  <ErrorBoundary fallbackRender={Layout.ErrorBoundary}>
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  </ErrorBoundary>

)

export default Router
