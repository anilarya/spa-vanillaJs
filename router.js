import { routes } from './routes.js';

export const router = {
  init: function() {
    this.handleRoute();
    window.addEventListener('hashchange', this.handleRoute.bind(this));
    window.addEventListener('DOMContentLoaded', this.handleRoute.bind(this));
  },

  handleRoute: function() {
    const path = location.hash.slice(1) || '/home';
    const route = routes.find(route => route.path === path);

    if (route) {
      this.renderTemplate(route.template);
    } else {
      this.renderTemplate('components/404.html');
    }
  },

  renderTemplate: function(template) {
    fetch(template)
      .then(response => response.text())
      .then(html => {
        const appElement = document.getElementById('app');
        appElement.innerHTML = html;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  },
};
