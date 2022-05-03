import Prefix from "prefix";
import { BREAKPOINT_TABLET } from "utils/breakpoints";
import { getOffset } from "utils/dom";
import { map } from "utils/math";

export default class {
  constructor({ element }) {
    this.transform = Prefix("transform");

    this.element = element;

    this.targetElement = this.element.getAttribute("data-animation-target");
    this.target = this.targetElement
      ? element.parentNode.querySelector(this.targetElement)
      : element;

    this.direction = this.element.getAttribute("data-animation-direction");

    this.isVisible = false;

    this.onResize();

    this.parallax = {
      current: -this.amount,
      target: -this.amount
    };
  }

  onResize() {
    this.amount = window.innerWidth < BREAKPOINT_TABLET ? 10 : 150;
    this.offset = getOffset(this.target);
  }

  update(scroll) {
    if (this.isVideo) {
      return;
    }

    const { innerHeight } = window;

    const offsetBottom = scroll.current + innerHeight;

    if (offsetBottom >= this.offset.top) {
      this.parallax = map(
        this.offset.top - scroll.current,
        -this.offset.height,
        innerHeight,
        this.amount,
        -this.amount
      );

      if (this.direction === "left") {
        this.parallax *= -1;
        this.parallax = Math.min(this.parallax, 0);
      } else {
        this.parallax = Math.max(this.parallax, 0);
      }

      this.element.style[
        this.transform
      ] = `translate3d(0, ${this.parallax}px, 0)`;
    } else {
      this.element.style[
        this.transform
      ] = `translate3d(0, ${this.amount}px, 0)`;
    }
  }
}
