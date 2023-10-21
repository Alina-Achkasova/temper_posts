import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(store);
app.mount('#app');
