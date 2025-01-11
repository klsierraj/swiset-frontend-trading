import { createApp } from "vue";

import App from "./App.vue";
import router from "./presentation/router";
import {
  Quasar,
  QBtn,
  QStepper,
  QStep,
  QCard,
  QCardSection,
  QPage,
  QLayout,
  QPageContainer,
  QForm,
  QInput,
  QCardActions,
  Notify,
  QDialog,
  QStepperNavigation,
  QCircularProgress,
  QSpinnerDots,
  QIcon,
  QSelect,
  QTime,
  QPopupProxy,
  QDate,
} from "quasar";
import "quasar/dist/quasar.css";
import "./style.css";
import "@quasar/extras/material-icons/material-icons.css";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();
app.use(Quasar, {
  components: {
    QBtn,
    QStepper,
    QStep,
    QCard,
    QCardSection,
    QPage,
    QLayout,
    QPageContainer,
    QForm,
    QInput,
    QCardActions,
    QDialog,
    QStepperNavigation,
    QCircularProgress,
    QSpinnerDots,
    QIcon,
    QSelect,
    QTime,
    QPopupProxy,
    QDate
  },
  plugin: { Notify },
});
app.use(pinia);
app.use(router);
app.mount("#app");
