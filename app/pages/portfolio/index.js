import Page from "classes/Page";
// import cube from "vendors/cube";
import { delay } from "utils/math";
import gsap from "gsap";

export default class Portfolio extends Page {
  constructor() {
    super({
      classes: {
        active: "portfolio--active"
      },
      id: "portfolio",
      element: ".portfolio",
      elements: {
        wrapper: ".portfolio__wrapper", // scroller
        links_wrapper: ".portfolio__title__link",
        menu: ".portfolio__list",
        items: ".portfolio__item"
      }
    });
  }

  create() {
    super.create();
    this.slider();
  }

  onResize() {
    super.onResize();
  }

  slider() {
    let menuWidth = this.elements.menu.clientWidth;
    let itemWidth = this.elements.items[0].clientWidth;
    let wrapWidth = this.elements.items.length * itemWidth;

    let scrollSpeed = 0;
    let oldScrollY = 0;
    let scrollY = 0;
    let y = 0;

    const lerp = (v0, v1, t) => {
      return v0 * (1 - t) + v1 * t;
    };

    const dispose = (scroll) => {
      gsap.set(this.elements.items, {
        x: (i) => {
          return i * itemWidth + scroll;
        },
        modifiers: {
          x: (x, target) => {
            const s = gsap.utils.wrap(
              -itemWidth,
              wrapWidth - itemWidth,
              parseInt(x)
            );
            return `${s}px`;
          }
        }
      });
    };
    dispose(0);

    const handleMouseWheel = (e) => {
      scrollY -= e.deltaY * 1.4;
    };

    let touchStart = 0;
    let touchX = 0;
    let isDragging = false;
    const handleTouchStart = (e) => {
      touchStart = e.clientX || e.touches[0].clientX;
      isDragging = true;
      this.elements.menu.classList.add("is-dragging");
    };
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      touchX = e.clientX || e.touches[0].clientX;
      scrollY += (touchX - touchStart) * 2;
      touchStart = touchX;
    };
    const handleTouchEnd = () => {
      isDragging = false;
      this.elements.menu.classList.remove("is-dragging");
    };

    this.elements.menu.addEventListener("mousewheel", handleMouseWheel);

    this.elements.menu.addEventListener("touchstart", handleTouchStart);
    this.elements.menu.addEventListener("touchmove", handleTouchMove);
    this.elements.menu.addEventListener("touchend", handleTouchEnd);

    this.elements.menu.addEventListener("mousedown", handleTouchStart);
    this.elements.menu.addEventListener("mousemove", handleTouchMove);
    this.elements.menu.addEventListener("mouseleave", handleTouchEnd);
    this.elements.menu.addEventListener("mouseup", handleTouchEnd);

    this.elements.menu.addEventListener("selectstart", () => {
      return false;
    });

    window.addEventListener("resize", () => {
      menuWidth = this.elements.menu.clientWidth;
      itemWidth = this.elements.items[0].clientWidth;
      wrapWidth = this.elements.items.length * itemWidth;
    });

    const render = () => {
      requestAnimationFrame(render);
      y = lerp(y, scrollY, 0.1);
      dispose(y);

      scrollSpeed = y - oldScrollY;
      oldScrollY = y;

      gsap.to(this.elements.items, {
        skewX: -scrollSpeed * 0.05
        // rotate: scrollSpeed * 0.01
        // scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003
      });
    };
    render();
  }
}
