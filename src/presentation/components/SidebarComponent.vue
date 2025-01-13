<template>
    <div class="sidebar">
      <div class="profile">
        <div class="avatar"></div>
        <p>{{ profileStore.userInfo?.getFullName() }}</p>
      </div>
  
      <nav class="menu">
        <router-link
          to="/dashboard/journal"
          class="menu-item"
          exact-active-class="active"
        >
          Bitácora trading
        </router-link>
        <router-link
          to="/dashboard/watchlist"
          class="menu-item"
          :class="{ active: $route.name === 'watchlist' }"
        >
          Lista de seguimientos
        </router-link>
      </nav>
  
      <button class="logout" @click="logout">
        Cerrar sesión
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '../../application/stores/authStore';
import { useProfileStore } from '../../application/stores/useProfileStore';
  
  const authStore = useAuthStore();
  const profileStore = useProfileStore()
  
  const logout = () => {
    authStore.logout();
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 300px;
    padding: 20px;
    background-color: black;
        display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  }
  
  .profile {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .avatar {
    width: 80px;
    height: 80px;
    background-color: #ddd;
    border-radius: 50%;
    margin: 0 auto 10px auto;
  }
  
  .menu {
    flex: 1;
    text-align: center;
  }
  
  .menu-item {
    display: block;
    padding: 10px;
    color: #fff;
    text-decoration: none;
  }
  
  .menu-item.active {
    font-weight: bold;
    color: var(--primary-color);
  }
  
  .logout {
    background: none;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
  }
  </style>
  