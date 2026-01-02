<script setup>
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = useRouter()

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}

import { ref, onMounted } from 'vue'

const userEmail = ref('')
const isAdmin = ref(false)

onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  if (data.session) {
    userEmail.value = data.session.user.email
    isAdmin.value = userEmail.value === 'manyaabraham123@gmail.com'
  }
})

</script>

<template>
  <div class="dashboard">
    <h1>Welcome to IMECODE Dashboard</h1>
    <button @click="logout">Logout</button>
  </div>

  <div class="dashboard">
    <h1>Welcome {{ userEmail }}</h1>

    <div v-if="isAdmin">
      <h2>Admin Panel</h2>
      <!-- Admin features here -->
    </div>

    <button @click="logout">Logout</button>
  </div>
</template>
