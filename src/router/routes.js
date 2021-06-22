import routerGuard from "./routerGuard.js"

const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        path: '',
        name: 'homePage',
        component: () => import('pages/PageDashboard.vue'),
        beforeEnter: routerGuard.isLoggedIn
      },
      {
        path: '/auth',
        name: 'pathAuth',
        component: () => import('pages/PageAuth.vue'),
        beforeEnter: routerGuard.loginAuthConfig
      },
      {
        path: '/userProfile',
        name: 'userProfile',
        component: () => import('pages/PageUserProfile.vue'),
        beforeEnter: routerGuard.isLoggedIn
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('pages/PageSettings.vue'),
        beforeEnter: routerGuard.isLoggedIn
      },
      {
        path: '/freeFlowLprModule',
        name: 'freeFlowLprModule',
        component: () => import('pages/PageFreeFlowLprModule.vue'),
        beforeEnter: routerGuard.isLoggedIn
      },
      {
        path: '/averageSpeedModule',
        name: 'averageSpeedModule',
        component: () => import('pages/PageAverageSpeedModule.vue'),
        beforeEnter: routerGuard.isLoggedIn
      },
      {
        path: '/tollGatesModule',
        name: 'tollGatesModule',
        component: () => import('pages/PageTollGatesModule.vue'),
        beforeEnter: routerGuard.isLoggedIn
      },
      {
        path: '/gatesModule',
        name: 'gatesModule',
        component: () => import('pages/PageTollGatesModule.vue'),
        beforeEnter: routerGuard.isLoggedIn
      },
      {
        path: '/reportingModule',
        name: 'reportingModule',
        component: () => import('pages/PageReportingModule.vue'),
        beforeEnter: routerGuard.isLoggedIn
      },
      {
        path: '/facial',
        name: 'facial',
        component: () => import('src/pages/PageFacial.vue'),
        beforeEnter: routerGuard.isLoggedIn
      },
      {
        path: '/VMS',
        name: 'VMS',
        component: () => import('src/pages/PageVms.vue'),
        beforeEnter: routerGuard.isLoggedIn
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
