import VueResource from 'vue-resource';
import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'


Vue.use(TurbolinksAdapter)
Vue.use(VueResource);

document.addEventListener('turbolinks:load', () => {
  Vue.http.headers.common['X-CSRF-Token'] = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content')

  const element = document.getElementById('appointment-form');
  if (element != null) {
    const appointment = JSON.parse(element.dataset.appointment);

    new Vue({
      el: '#app',
      data: {
        appointment: appointment,
      },
      created: function() {
        this.day.id == null
          ? this.btnValue = 'Create'
          : this.btnValue = 'Update';
      },
      methods: {
        saveDay: function() {
          if (this.day.id == null) {
            this.$http.post('/days', { date: this.day.date })
              .then((res) => {
                Turbolinks.visit(`/days`);
              });
          } else {
            this.$http.put(
              `/days/${this.day.id}`,
              {id: this.day.id, date: this.day.date }
            ).then((res) => {
              Turbolinks.visit('/days');
            });
          }
        },
        deleteDay: function() {
          this.$http.delete(`/days/${this.day.id}`)
            .then((res) => {
              Turbolinks.visit('/days');
            });
        }
      },
    });
  }

});
