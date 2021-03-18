const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/PageDashboard.vue')
      },
      {
        path: '/auth',
        component: () => import('pages/PageAuth.vue')
      },
      {
        path: '/userProfile',
        component: () => import('pages/PageUserProfile.vue')
      },
      {
        path: '/settings',
        component: () => import('pages/PageSettings.vue')
      },
      {
        path: '/freeFlowLprModule',
        component: () => import('pages/PageFreeFlowLprModule.vue')
      },
      {
        path: '/averageSpeedModule',
        component: () => import('pages/PageAverageSpeedModule.vue')
      },
      {
        path: '/tollGatesModule',
        component: () => import('pages/PageTollGatesModule.vue')
      },
      {
        path: '/reportingModule',
        component: () => import('pages/PageReportingModule.vue')
      },
      {
        path: '/VMS',
        component: () => import('src/pages/PageVMS.vue')
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
