import Page from "classes/Page";
// import cube from "vendors/cube";
import { delay } from "utils/math";
import gsap from "gsap";
import Ukiyo from "ukiyojs";

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
        items: ".portfolio__item",
        itemImg: ".portfolio__item__pic",
        links: "[data-link]",
        hovers: "[data-hover]",
        drive_menu: ".infinite__drive__list",
        drive_items: ".infinite__list__item",
        reverse_menu: ".infinite__reverse__list",
        reverse_items: ".infinite__reversed__list__item",
        list_wrapper: ".portfolio__banner__list__inner",
        layerBtn: ".layer__changer",
        topSlider: ".portfolio__banner__inner",
        bottomSlider: ".portfolio__banner__list"
      }
    });
  }

  create() {
    super.create();
    this.slider();
    this.hover();
    this.driveList();
    this.reverseList();
    this.layerChanger();
  }

  onResize() {
    super.onResize();
  }

  hover() {
    const links = [...this.elements.links];
    const hovers = [...this.elements.hovers];

    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("mouseover", function () {
        hovers[i].classList.add("active");
        console.log("open");
      });
      links[i].addEventListener("mouseleave", function () {
        hovers[i].classList.remove("active");
        console.log("close");
      });
    }
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
      scrollY -= e.deltaY * 2;
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
      y = lerp(y, scrollY, 0.02);
      dispose(y);

      scrollSpeed = y - oldScrollY;
      oldScrollY = y;

      gsap.to(this.elements.items, {
        skewX: -scrollSpeed * 0.12,
        rotate: scrollSpeed * 0.02
        // scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003
      });
    };
    render();
  }

  driveList() {
    let menuHeight = this.elements.list_wrapper.clientHeight;
    let itemHeight = this.elements.drive_items[0].clientHeight;
    let wrapHeight = this.elements.drive_items.length * itemHeight;

    let scrollSpeed = 0;
    let oldScrollY = 0;
    let scrollY = 0;
    let y = 0;

    const lerp = (v0, v1, t) => {
      return v0 * (1 - t) + v1 * t;
    };

    const dispose = (scroll) => {
      gsap.set(this.elements.drive_items, {
        y: (i) => {
          return i * itemHeight + scroll;
        },
        modifiers: {
          y: (y) => {
            const s = gsap.utils.wrap(
              -itemHeight,
              wrapHeight - itemHeight,
              parseInt(y)
            );
            return `${s}px`;
          }
        }
      });
    };
    dispose(0);

    const handleMouseWheel = (e) => {
      scrollY -= e.deltaY * 2;
    };

    let touchStart = 0;
    let touchY = 0;
    let isDragging = false;
    const handleTouchStart = (e) => {
      touchStart = e.clientY || e.touches[0].clientY;
      isDragging = true;
      this.elements.drive_menu.classList.add("is-dragging");
    };
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      touchY = e.clientY || e.touches[0].clientY;
      scrollY += (touchY - touchStart) * 4;
      touchStart = touchY;
    };
    const handleTouchEnd = () => {
      isDragging = false;
      this.elements.drive_menu.classList.remove("is-dragging");
    };

    this.elements.list_wrapper.addEventListener("mousewheel", handleMouseWheel);

    this.elements.list_wrapper.addEventListener("touchstart", handleTouchStart);
    this.elements.list_wrapper.addEventListener("touchmove", handleTouchMove);
    this.elements.list_wrapper.addEventListener("touchend", handleTouchEnd);

    this.elements.list_wrapper.addEventListener("mousedown", handleTouchStart);
    this.elements.list_wrapper.addEventListener("mousemove", handleTouchMove);
    this.elements.list_wrapper.addEventListener("mouseleave", handleTouchEnd);
    this.elements.list_wrapper.addEventListener("mouseup", handleTouchEnd);

    this.elements.list_wrapper.addEventListener("selectstart", () => {
      return false;
    });

    window.addEventListener("resize", () => {
      menuHeight = this.elements.list_wrapper.clientHeight;
      itemHeight = this.elements.drive_items[0].clientHeight;
      wrapHeight = this.elements.drive_items.length * itemHeight;
    });

    const render = () => {
      requestAnimationFrame(render);
      y = lerp(y, scrollY, 0.04);
      dispose(y);

      scrollSpeed = y - oldScrollY;
      oldScrollY = y;
    };
    render();
  }

  reverseList() {
    let menuHeight = this.elements.list_wrapper.clientHeight;
    let itemHeight = this.elements.reverse_items[0].clientHeight;
    let wrapHeight = this.elements.reverse_items.length * itemHeight;

    let scrollSpeed = 0;
    let oldScrollY = 0;
    let scrollY = 0;
    let y = 0;

    const lerp = (v0, v1, t) => {
      return v0 * (1 - t) + v1 * t;
    };

    const dispose = (scroll) => {
      gsap.set(this.elements.reverse_items, {
        y: (i) => {
          return i * itemHeight + scroll;
        },
        modifiers: {
          y: (y) => {
            const s = gsap.utils.wrap(
              -itemHeight,
              wrapHeight - itemHeight,
              parseInt(y)
            );
            return `${s}px`;
          }
        }
      });
    };
    dispose(0);

    const handleMouseWheel = (e) => {
      scrollY -= e.deltaY * 3;
    };

    let touchStart = 0;
    let touchY = 0;
    let isDragging = false;
    const handleTouchStart = (e) => {
      touchStart = e.clientY || e.touches[0].clientY;
      isDragging = true;
      this.elements.reverse_menu.classList.add("is-dragging");
    };
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      touchY = e.clientY || e.touches[0].clientY;
      scrollY += (touchY - touchStart) * 10;
      touchStart = touchY;
    };
    const handleTouchEnd = () => {
      isDragging = false;
      this.elements.reverse_menu.classList.remove("is-dragging");
    };

    this.elements.list_wrapper.addEventListener("mousewheel", handleMouseWheel);

    this.elements.list_wrapper.addEventListener("touchstart", handleTouchStart);
    this.elements.list_wrapper.addEventListener("touchmove", handleTouchMove);
    this.elements.list_wrapper.addEventListener("touchend", handleTouchEnd);

    this.elements.list_wrapper.addEventListener("mousedown", handleTouchStart);
    this.elements.list_wrapper.addEventListener("mousemove", handleTouchMove);
    this.elements.list_wrapper.addEventListener("mouseleave", handleTouchEnd);
    this.elements.list_wrapper.addEventListener("mouseup", handleTouchEnd);

    this.elements.list_wrapper.addEventListener("selectstart", () => {
      return false;
    });

    window.addEventListener("resize", () => {
      menuHeight = this.elements.list_wrapper.clientHeight;
      itemHeight = this.elements.reverse_items[0].clientHeight;
      wrapHeight = this.elements.reverse_items.length * itemHeight;
    });

    const render = () => {
      requestAnimationFrame(render);
      y = lerp(y, scrollY, 0.04);
      dispose(y);

      scrollSpeed = y - oldScrollY;
      oldScrollY = y;
    };
    render();
  }

  layerChanger() {
    const layerBtn = this.elements.layerBtn;
    const reverseList = this.elements.reverse_menu;
    const driveList = this.elements.drive_menu;
    const topSlider = this.elements.topSlider;
    const bottomSlider = this.elements.bottomSlider;

    layerBtn.addEventListener("click", function () {
      layerBtn.classList.toggle("active");
      reverseList.classList.toggle("active");
      driveList.classList.toggle("active");
      topSlider.classList.toggle("active");
      bottomSlider.classList.toggle("active");
    });
  }
}
