import VueResource from 'vue-resource';
import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.min.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'


Vue.use(ElementUI, { locale });
Vue.use(TurbolinksAdapter);
Vue.use(VueResource);

document.addEventListener('turbolinks:load', () => {
  Vue.http.headers.common['X-CSRF-Token'] = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content')

  const element = document.getElementById('appointment-form');

  if (element != null) {
    // TODO Clear dataset after parsing.
    const appointment = JSON.parse(element.dataset.appointment);
    const days = JSON.parse(element.dataset.days);
    const users = JSON.parse(element.dataset.users);
    const app = new Vue({
      el: '#app',
      data: {
        appointment: appointment,
        days: days,
        dayId: '',
        users: users,
        userName: '',
        user: {},
        time: '',
        state: 'selectDate',
        isLoading: true
      },
      mounted() {
        this.isLoading = false;
      },
      methods: {
        confirmDate(id) {
          this.dayId = id;
          this.state = 'selectTime';
        },
        querySearch(queryString, cb) {
          // TODO Add lazy loading of users list.
          let result = this.users.filter((user) => {
            return user.first_name
              .toLowerCase()
              .startsWith(queryString.toLowerCase());
          });
          cb(result);
        },
        handleSelect(user) {
          this.user = user;
        },
        createAppointment() {
          this.$http.post(
            '/appointments',
            {
              user_id: this.user.id,
              working_day_id: this.dayId,
              time: this.time
            }
          ).then((res) => {
            Turbolinks.visit('/working_days');
          });
        }
      }
    });
  }
});
