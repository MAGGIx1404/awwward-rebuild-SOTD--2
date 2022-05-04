import Page from "classes/Page";
// import cube from "vendors/cube";
import { delay } from "utils/math";
import { TimelineMax } from "gsap/gsap-core";
import GLSlideshow from "GLSlideshow";
import one from "../../../shared/heroes/contact-1.jpg";
import two from "../../../shared/heroes/contact-2.jpg";
import three from "../../../shared/heroes/contact-3.jpg";

const images = {
  one,
  two,
  three
};

export default class Contact extends Page {
  constructor() {
    super({
      classes: {
        active: "contact--active"
      },
      id: "contact",
      element: ".contact",
      elements: {
        wrapper: ".contact__wrapper", // scroller
        links_wrapper: ".contact__title__link"
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
    this.slideShow = new GLSlideshow([images.one, images.two, images.three], {
      canvas: document.getElementById("webgl__container"), // optional
      duration: 1000,
      interval: 4000,
      width: window.innerWidth,
      height: window.innerHeight,
      effect: "ripple"
    });
  }
}

// 'crossFade'
// 'crossZoom'
// 'directionalWipe'
// 'wind'
// 'ripple'
// 'pageCurl'
