
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
        path: '/genericLprModule', 
        component: () => import('pages/PageGenericLprModule.vue') 
      },
      {
        path: '/averageSpeedModule', 
        component: () => import('pages/PageAverageSpeedModule.vue') 
      },
      {
        path: '/reportingModule', 
        component: () => import('pages/PageReportingModule.vue') 
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
