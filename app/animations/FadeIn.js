import each from "lodash/each";
import Animation from "classes/Animation";

export default class extends Animation {
  constructor({ element }) {
    super({
      element
    });

    this.onResize();

    if ("IntersectionObserver" in window) {
      this.animateOut();
    }
  }

  animateIn() {
    super.animateIn();
    this.element.style.opacity = 1;
    this.element.style.transition = "opacity 0.5s ease";
  }

  animateOut() {
    super.animateOut();
    this.element.style.opacity = 0;
  }

  onResize() {}
}
