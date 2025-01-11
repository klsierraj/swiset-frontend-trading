import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { SendActivationCodeUseCase } from '../../application/usecases/SendActivationCodeUseCase';
import { ValidateActivationCodeUseCase } from '../../application/usecases/ValidateActivationCodeUseCase';

import { RegisterUserUseCase } from '../usecases/RegisterUSerUseCase';
import { CheckUserExistsUseCase } from '../usecases/checkUserExistsUseCase';
import router from '../../presentation/router';
import { RegisteringUser } from '../../domain/entities/RegisteringUser';

const userRepository = new UserRepository();
const checkUserExistsUseCase = new CheckUserExistsUseCase(userRepository);
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const sendActivationCodeUseCase = new SendActivationCodeUseCase(userRepository);
const validateActivationCodeUseCase = new ValidateActivationCodeUseCase(userRepository);

export const useRegistrationStore = defineStore('registration', () => {

  const getInitialState = () => ({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    activationCode: '',
  });


  const hasActiveRegistration = localStorage.getItem('hasActiveRegistration') === 'true';

  const formData = ref(
    hasActiveRegistration 
      ? JSON.parse(localStorage.getItem('formData') || JSON.stringify(getInitialState()))
      : getInitialState()
  );

  const currentStep = ref(hasActiveRegistration ? parseInt(localStorage.getItem('currentStep') || '1') : 1);
  const countdown = ref(hasActiveRegistration ? parseInt(localStorage.getItem('countdown') || '0') : 0);
  const showModal = ref(false);
  const modalMessage = ref('');
  const isProcessing = ref(false);
  let countdownInterval: ReturnType<typeof setInterval> | null = null;


  const saveToLocalStorage = () => {
    localStorage.setItem('hasActiveRegistration', 'true');
    localStorage.setItem('formData', JSON.stringify(formData.value));
    localStorage.setItem('currentStep', currentStep.value.toString());
    localStorage.setItem('countdown', countdown.value.toString());
  };

  const isPersonalInfoComplete = computed(() => {
    return (
      formData.value.firstName.trim() &&
      formData.value.lastName.trim() &&
      formData.value.email.trim()
    );
  });

  const areCredentialsComplete = computed(() => {
    return (
      formData.value.username.trim().length >= 7 &&
      formData.value.password.trim().length >= 7
    );
  });

  const isActivationCodeComplete = computed(() => {
    return formData.value.activationCode.trim().length === 6;
  });

  const startCountdown = () => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    countdown.value = 60;
    saveToLocalStorage();

    countdownInterval = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--;
        saveToLocalStorage();
      } else {
        if (countdownInterval) {
          clearInterval(countdownInterval);
          countdownInterval = null;
        }
      }
    }, 1000);
  };

  const goToNextStep = () => {
    if (currentStep.value < 3) {
      currentStep.value++;
      saveToLocalStorage();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--;
      saveToLocalStorage();
    }
  };

  const updateFormData = (field: keyof typeof formData.value, value: string) => {
    formData.value[field] = value;
    saveToLocalStorage();
  };

  const validateEmail = async () => {
    try {
      isProcessing.value = true;
      const email = formData.value.email;
      const result = await checkUserExistsUseCase.execute(email);

      if (result.exists) {
        showModal.value = true;
        modalMessage.value = result.message;
      } else {
        goToNextStep();
      }
    } catch (error) {
      console.error('Error en validateEmail:', error);
      showModal.value = true;
      modalMessage.value = 'Error al verificar el email. Intenta nuevamente.';
    } finally {
      isProcessing.value = false;
    }
  };

  const validateAndRegister = async () => {
    try {
      isProcessing.value = true;
      const username = formData.value.username;
      const usernameResult = await checkUserExistsUseCase.execute(undefined, username);

      if (usernameResult.exists) {
        showModal.value = true;
        modalMessage.value = usernameResult.message;
        return;
      }

      const user = new RegisteringUser(
        formData.value.firstName,
        formData.value.lastName,
        formData.value.email,
        formData.value.username,
        formData.value.password
      );

      const registerResult = await registerUserUseCase.execute(user);

      if (registerResult.success) {
        goToNextStep();
        await sendActivationCode();
        startCountdown();
      } else {
        showModal.value = true;
        modalMessage.value = registerResult.message;
      }
    } catch (error) {
      console.error('Error en validateAndRegister:', error);
      showModal.value = true;
      modalMessage.value = 'Error al registrar el usuario. Intenta nuevamente.';
    } finally {
      isProcessing.value = false;
    }
  };

  const sendActivationCode = async () => {
    if (isProcessing.value || countdown.value > 0) return;

    try {
      isProcessing.value = true;
      const email = formData.value.email;
      const result = await sendActivationCodeUseCase.execute(email);

      if (result.success) {
        startCountdown();
      } else {
        showModal.value = true;
        modalMessage.value = result.message;
      }
    } catch (error) {
      console.error('Error en sendActivationCode:', error);
      showModal.value = true;
      modalMessage.value = 'Error al enviar el código. Intenta nuevamente.';
    } finally {
      isProcessing.value = false;
    }
  };

  const validateActivationCode = async (key: string): Promise<boolean> => {
    if (isProcessing.value) return false;

    try {
      isProcessing.value = true;
      const email = formData.value.email;
      const result = await validateActivationCodeUseCase.execute(email, key);

      if (result.success) {
        clearRegistration();
        router.push({ name: 'login' });
        return true;
      } else {
        showModal.value = true;
        modalMessage.value = result.message;
        return false;
      }
    } catch (error) {
      console.error('Error en validateActivationCode:', error);
      showModal.value = true;
      modalMessage.value = 'Error al validar el código. Intenta nuevamente.';
      return false;
    } finally {
      isProcessing.value = false;
    }
  };

  const clearRegistration = () => {
    console.log('Limpiando el estado del registro...');
    
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  
    formData.value = getInitialState();
    currentStep.value = 1;
    countdown.value = 0;
    showModal.value = false;
    modalMessage.value = '';
    isProcessing.value = false;
  
    localStorage.removeItem('formData');
    localStorage.removeItem('currentStep');
    localStorage.removeItem('countdown');
    localStorage.removeItem('hasActiveRegistration');

  };

  const validateCurrentStep = () => {
    if (!hasActiveRegistration && currentStep.value > 1) {
      currentStep.value = 1;
      if (router.currentRoute.value.name !== 'register') {
        router.push({ name: 'register' });
      }
    }
  };


  validateCurrentStep();


  const closeModal = () => {
    showModal.value = false;
    modalMessage.value = '';
  };

  const cleanup = () => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  };

  return {
    formData,
    currentStep,
    countdown,
    showModal,
    modalMessage,
    isProcessing,
    isPersonalInfoComplete,
    areCredentialsComplete,
    isActivationCodeComplete,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    validateEmail,
    validateAndRegister,
    sendActivationCode,
    validateActivationCode,
    closeModal,
    clearRegistration,
    cleanup,
    startCountdown,
    validateCurrentStep
  };
});