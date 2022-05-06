import Component from "classes/Component";
import each from "lodash/each";
import gsap from "gsap";
import { split } from "utils/text";
import { Power2 } from "gsap/all";

export default class Preloader extends Component {
  constructor() {
    super({
      element: ".preloader",
      elements: {
        title: ".preloader__text",
        number: ".preloader__number",
        images: document.querySelectorAll("img"),
        numberText: ".preloader__number__text",
        preloaderText: ".preloader__text__wrapper h1",
        path: "#path_main"
      }
    });

    this.length = 0;
    this.createLoader();
  }

  createLoader() {
    each(this.elements.images, (element) => {
      element.src = element.getAttribute("data-src");
      element.onload = () => {
        element.classList.add("loaded");
        this.onAssetLoaded();
      };
    });
  }

  onAssetLoaded() {
    this.length += 1;
    const percent = this.length / this.elements.images.length;

    this.elements.numberText.innerHTML = `${Math.round(percent * 100)}%`;

    if (percent === 1) {
      this.onLoaded();
    }
  }

  onLoaded() {
    return new Promise((resolve) => {
      this.animateOut = gsap.timeline({
        delay: 0
      });
      const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
      const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";
      this.animateOut.to(this.elements.numberText, {
        y: "100%",
        stagger: "0.1",
        duration: 1.5,
        ease: "ease.out"
      });
      this.animateOut.to(this.elements.preloaderText, 1, {
        opacity: 0,
        ease: "ease.out"
      });
      this.animateOut.to(this.elements.path, 0.8, {
        attr: {
          d: start
        },
        ease: Power2.easeIn
      });
      this.animateOut.to(this.elements.path, 0.4, {
        attr: {
          d: end
        },
        ease: Power2.easeOut
      });
      this.animateOut.to(
        this.element,
        {
          alpha: 0,
          opacity: 0,
          duration: 0.5
        },
        "-=0.2"
      );
      this.animateOut.call(() => {
        this.emit("completed");
      });
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
