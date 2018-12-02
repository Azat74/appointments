import VueResource from 'vue-resource';
import TurbolinksAdapter from 'vue-turbolinks';
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

  const element = document.getElementById('days-form');
  const day = JSON.parse(element.dataset.day);

  new Vue({
    el: '#app',
    data: {
      day: day,
      btnValue: ''
    },
    created: function() {
      this.day.id == null
        ? this.btnValue = 'Create'
        : this.btnValue = 'Update';
    },
    methods: {
      saveDay: function() {
        if (this.day.id == null) {
          this.$http.post('/working_days', { date: this.day.date })
            .then((res) => {
              Turbolinks.visit(`/working_days`);
            });
        } else {
          this.$http.put(
            `/working_days/${this.day.id}`,
            {id: this.day.id, date: this.day.date }
          ).then((res) => {
            Turbolinks.visit('/working_days');
          });
        }
      },
      deleteDay: function() {
        this.$http.delete(`/working_days/${this.day.id}`)
          .then((res) => {
            Turbolinks.visit('/working_days');
          });
      }
    },
    components: { App }
  });

});
