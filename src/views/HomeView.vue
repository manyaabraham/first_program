<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const currentSection = ref('login') // 'login' | 'register'

const login = () => {
  console.log({
    email: email.value,
    password: password.value,
  })
}

const goToRegister = () => {
  currentSection.value = 'register'
}

const goToLogin = () => {
  currentSection.value = 'login'
}
</script>

<template>
  <div class="login-page">
    <div class="login-box">
      <!-- LOGIN SECTION -->
      <template v-if="currentSection === 'login'">
        <div class="avatar">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="white" stroke-width="2" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="white" stroke-width="2" />
          </svg>
        </div>

        <h2><span class="ime">IMECODE</span> LOGIN</h2>

        <div class="input-group">
          <span class="icon">✉️</span>
          <input type="username" v-model="email" placeholder="Username" />
        </div>

        <div class="input-group">
          <span class="icon">🔑</span>
          <input type="password" v-model="password" placeholder="Password" />
        </div>

        <button class="login-btn" @click="login">LOGIN</button>

        <div class="options">
          <p>Don't have an account?</p>
          <a href="#" class="link" @click.prevent="goToRegister"> Register </a>
        </div>
      </template>
      <!-- REGISTER SECTION -->
      <template v-else>
        <div class="avatar">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="white" stroke-width="2" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="white" stroke-width="2" />
          </svg>
        </div>

        <h2><span class="ime">IMECODE</span> REGISTER</h2>

        <div class="input-group">
          <span class="icon">👤</span>
          <input type="username" placeholder="Username" />
        </div>

        <div class="input-group">
          <span class="icon">✉️</span>
          <input type="email" placeholder="Email" />
        </div>

        <div class="input-group">
          <span class="icon">🔑</span>
          <input type="password" placeholder="Password" />
        </div>

        <button class="login-btn">REGISTER</button>

        <div class="options">
          <p>Already have an account?</p>
          <a href="#" class="link" @click.prevent="goToLogin"> Login </a>
        </div>
      </template>
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

.options {
  margin-top: 1rem;
  justify-content: center;
  margin-right: auto;
  display: flex;
  gap: 3px;
  font-size: 14px;
}

.options a {
  color: rgb(5, 6, 56);
  text-decoration: none;
  opacity: 0.85;
}

.options a:hover {
  text-decoration: underline;
}

.remember {
  display: flex;
  align-items: center;
  gap: 6px;
}

.login-btn {
  width: 90%;
  border-radius: 1rem;
  padding: 14px;
  border: none;
  background: #003b82;
  color: white;
  font-size: 16px;
  letter-spacing: 2px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #16539e;
}

.ime {
  color: rgb(11, 8, 53);
}
</style>
