import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import each from "lodash/each";
import map from "lodash/map";
import Prefix from "prefix";
import gsap from "gsap";
import { Expo, Power2 } from "gsap/all";
import { mapEach } from "utils/dom";
import Paragraph from "animations/Paragraph";
import Parallax from "animations/Parallax";
import FadeIn from "animations/FadeIn";
import AsyncLoad from "classes/AsyncLoad";
import locoScroll from "utils/locoscroll";

import { delay } from "utils/math";

export default class Page {
  constructor({ classes, id, element, elements }) {
    this.classes = {
      ...classes
    };
    this.id = id;
    this.selector = element;
    this.selectorChildren = {
      animationsParagraphs: '[data-animation="paragraph"]',
      animationsParallax: '[data-animation="parallax"]',
      animationsFadeIn: '[data-animation="p-fade-in"]',
      imagePreloaders: "[data-src]",
      transition: "#path",

      ...elements
    };
    this.element = element;
    this.elements = {};
    this.transformPrefix = Prefix("transform");
    this.animations = [];
    this.preloadersForImg = [];
  }

  /**
   * Select Elements from DOM and init necessery things
   */
  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    each(this.selectorChildren, (entry, key) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = this.element.querySelectorAll(entry);
        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = this.elements[key][0];
        }
      }
    });

    this.createAnimations();
    // this.createPreloadersForImages();
    this.initLocoScroll();
    this.locoScroll.update();
    this.text();
  }

  text() {
    const target = document.querySelectorAll(".splitter");
    const result = Splitting({
      target: target
    });
  }

  /**
   * Common Animation on all pages
   */
  createAnimations() {
    /**
     * Paragraphs.
     */
    this.animationsParagraphs = mapEach(
      this.elements.animationsParagraphs,
      (element) => {
        return new Paragraph({ element });
      }
    );

    this.animations.push(...this.animationsParagraphs);

    /**
     * Fade in
     */

    this.animationsFadeIn = mapEach(
      this.elements.animationsFadeIn,
      (element) => {
        return new FadeIn({ element });
      }
    );

    this.animations.push(...this.animationsFadeIn);

    /**
     * Parallax
     */

    this.animationsParallax = mapEach(
      this.elements.animationsParallax,
      (element) => {
        return new Parallax({ element });
      }
    );

    this.animations.push(...this.animationsParallax);
  }

  /**
   * Lazy load images
   */
  createPreloadersForImages() {
    this.preloadersForImg = map(this.elements.imagePreloaders, (img) => {
      return new AsyncLoad({ element: img });
    });
  }

  /**
   * Init Locomotive scroll
   */
  initLocoScroll() {
    this.locoScroll = locoScroll(this.elements.wrapper);
  }

  /**
   * Page Show Transition
   */
  async show(onPreloaded = false) {
    if (onPreloaded) {
      return new Promise((resolve) => {
        this.animationIn = gsap.timeline();
        this.animationIn.call(() => {
          this.element.classList.add(this.classes.active);
          this.addEventListeners();
          resolve();
        });
      });
    } else {
      return new Promise((resolve) => {
        this.animationIn = gsap.timeline();
        this.animationIn.to(this.selectorChildren.transition, 0.5, {
          opacity: 0,
          ease: Power2.easeIn
        });
        this.animationIn.call(() => {
          this.element.classList.add(this.classes.active);
          this.addEventListeners();
          this.onResize();
          resolve();
        });
      });
    }
  }

  /**
   * Page Hide Transition
   */
  async hide() {
    return new Promise((resolve) => {
      this.element.classList.remove(this.classes.active);
      each(this.animations, (animation) => {
        animation.animateOut();
      });
      this.destroy();
      window.ASSETS = [];
      this.animateOut = gsap.timeline();
      const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
      const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";
      this.animateOut.set(this.selectorChildren.transition, {
        attr: {
          d: "M 0 100 V 100 Q 50 100 100 100 V 100 Z"
        },
        opacity: 1
      });
      this.animateOut.to(this.selectorChildren.transition, 0.8, {
        attr: {
          d: start
        },
        ease: Power2.easeIn
      });
      this.animateOut.to(this.selectorChildren.transition, 0.4, {
        attr: {
          d: end
        },
        ease: Power2.easeOut
      });

      this.animateOut.call(() => {
        resolve();
      });
    });
  }

  /**
   * Update function for request animation frame
   */
  update() {}

  /**
   * On Resize event Handler
   */
  onResize() {
    if (this.elements.wrapper) {
      this.locoScroll.update();
    }

    this.animations.forEach((animation) => {
      animation.onResize();
    });
  }

  /**
   * Create and Register common event listeners
   */
  addEventListeners() {}

  /**
   * Remove event listeners. Call on Page Hide
   */
  removeEventListeners() {}

  /**
   * Alias of removeEventListener
   */
  destroy() {
    this.removeEventListeners();
    if (this.elements.wrapper) {
      this.locoScroll.destroy();
    }
  }
}
