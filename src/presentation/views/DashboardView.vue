<template>
  <div class="dashboard-container">

    <SidebarComponent />
  <div>
    <router-view />
  </div>
  </div>
  
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useProfileStore } from '../../application/stores/useProfileStore';
import { storeToRefs } from 'pinia';
import SidebarComponent from '../components/SidebarComponent.vue';


const profileStore = useProfileStore();
const { userInfo } = storeToRefs(profileStore);

const fetchProfile = async () => {
  await profileStore.fetchAccountDetails(localStorage.getItem('authToken'));
};

const fetchUserAssets = async () => {
  if (userInfo.value?.id) {
    await profileStore.fetchUserAssets(userInfo.value.id, localStorage.getItem('authToken'));
  }
};

const fetchUserBrokers = async () => {
    await profileStore.fetchUserBrokers(localStorage.getItem('authToken'));

};

watch(
  () => userInfo.value?.id, 
  (newId) => {
    if (newId) {
      fetchUserAssets();
      fetchUserBrokers();
    }
  }
);

onMounted(() => {
  fetchProfile();

});
</script>


<style lang="scss" scoped>

</style>