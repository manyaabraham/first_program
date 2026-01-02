<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const email = ref('')
const loading = ref(false)
const error = ref('')

// --- Google login ---
const loginWithGoogle = async () => {
  loading.value = true
  error.value = ''

  try {
    const { data, error: googleError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard'
      }
    })

    if (googleError) {
      console.error('Google login error:', googleError)
      error.value = googleError.message
      return
    }

    console.log('Google login initiated:', data)
    // Note: user will be redirected to dashboard automatically after OAuth
  } catch (err) {
    console.error(err)
    error.value = 'Something went wrong with Google login'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-box">
      <div class="avatar">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="white" stroke-width="2" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="white" stroke-width="2" />
        </svg>
      </div>

      <h2><span class="ime">IMECODE</span> LOGIN</h2>

      <div class="input-group">
        <span class="icon">✉️</span>
        <input type="email" v-model="email" placeholder="Enter your email" />
      </div>

      <button class="login-btn" @click="loginWithEmail" :disabled="loading">
        CONTINUE
      </button>

      <p v-if="error" class="error">{{ error }}</p>

      <button class="google-btn" @click="loginWithGoogle">
        Continue with Google
      </button>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top right, #9cc9ff, #3b78c2, #0a3d7a);
}

.login-box {
  width: 360px;
  color: white;
  text-align: center;
}

.avatar {
  width: 90px;
  height: 90px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: #0b3f7f;
  display: flex;
  align-items: center;
  justify-content: center;
}

h2 {
  letter-spacing: 2px;
  font-weight: 3022;
  margin-bottom: 40px;
}

.input-group {
  position: relative;
  margin-bottom: 30px;
}

.input-group input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.6);
  padding: 10px 0 10px 34px;
  font-size: 18px;
}

.input-group input::placeholder {
  color: rgba(2, 16, 82, 0.7);
}

.input-group input:focus {
  outline: none;
  border-bottom-color: white;
}

.icon {
  position: absolute;
  left: 0;
  top: 8px;
  font-size: 18px;
}

.login-btn,
.google-btn {
  width: 90%;
  border-radius: 1rem;
  padding: 14px;
  border: none;
  background: #003b82;
  color: white;
  font-size: 16px;
  letter-spacing: 2px;
  cursor: pointer;
  margin-top: 15px;
}

.login-btn:hover,
.google-btn:hover {
  background-color: #16539e;
}

.ime {
  color: rgb(11, 8, 53);
}
</style>
