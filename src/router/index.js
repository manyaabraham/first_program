import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabase'

import Login from '../views/Login.vue'
import VerifyCode from '../views/VerifyCode.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/verify', component: VerifyCode },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const { data } = await supabase.auth.getSession()
    if (!data.session) return '/'

    // Optional: admin-only check for certain pages
    if (to.meta.adminOnly) {
      if (data.session.user.email !== 'manyaabraham123@gmail.com') {
        return '/dashboard' // redirect normal users
      }
    }
  }
})

export default router
