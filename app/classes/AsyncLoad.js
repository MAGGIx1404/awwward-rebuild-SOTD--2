import Component from "classes/Component";

// Home made async loader
export default class AsyncLoad extends Component {
  constructor({ element }) {
    super({ element });

    this.createObserver();
  }

  createObserver() {
    this.observer = new window.IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!this.element.src) {
            this.element.src = this.element.getAttribute("data-src");
            this.element.onload = (_) => {
              this.element.classList.add("loaded");
              observer.unobserve(entry.target);
            };
          }
        }
      });
    });

    this.observer.observe(this.element);
  }
}
