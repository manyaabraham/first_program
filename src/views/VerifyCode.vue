<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const code = ref('')
const loading = ref(false)
const error = ref('')

// Retrieve saved email
const email = localStorage.getItem('verify_email')
if (!email) {
  router.push('/')
}

// Save user to Supabase if not exists
const saveUser = async (emailToSave) => {
  try {
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('email', emailToSave)
      .maybeSingle() // FIXED typo

    if (selectError && selectError.code !== 'PGRST116') {
      console.error('Error checking user:', selectError.message)
      return
    }

    if (!existingUser) {
      const { data, error: insertError } = await supabase
        .from('users')
        .insert({ email: emailToSave })
        .select()
        .single()

      if (insertError) {
        console.error('Error saving new user:', insertError.message)
        return
      }

      console.log('New user saved:', data)
    } else {
      console.log('User already exists, skipping insert')
    }
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

// Verify OTP
const verifyCode = async () => {
  error.value = ''
  loading.value = true

  try {
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: code.value,
      type: 'email',
    })

    if (verifyError) {
      error.value = 'Invalid or expired code'
      loading.value = false
      return
    }

    // Save user to DB
    await saveUser(email)

    // Clear localStorage
    localStorage.removeItem('verify_email')

    // Redirect to dashboard
    router.push('/dashboard')
  } catch (err) {
    console.error(err)
    error.value = 'Something went wrong'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-box">
      <h2>VERIFY EMAIL</h2>

      <div class="input-group">
        <input type="text" v-model="code" placeholder="Enter verification code" />
      </div>

      <button class="login-btn" @click="verifyCode">
        VERIFY
      </button>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>
