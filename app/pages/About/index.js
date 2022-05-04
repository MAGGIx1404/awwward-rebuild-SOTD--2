import Page from "classes/Page";
// import cube from "vendors/cube";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { delay } from "utils/math";
import Ukiyo from "ukiyojs";
import { TimelineMax } from "gsap/gsap-core";

export default class About extends Page {
  constructor() {
    super({
      classes: {
        active: "about--active"
      },
      id: "about",
      element: ".about",
      elements: {
        wrapper: ".about__wrapper", // scroller
        links_wrapper: ".about__title__link",
        about__pics: ".parallax__image"
      }
    });
  }

  create() {
    super.create();
    this.parallax();
  }

  parallax() {
    this.imgOne = [...this.elements.about__pics];
    // this.imgSlow = [...this.elements.images];

    this.imgOne.forEach((ele) => {
      this.parallaxEffect = new Ukiyo(ele, {
        speed: 2.5,
        scale: 1.25
      });
    });

    // this.imgSlow.forEach((ele) => {
    //   this.parallaxEffectSlow = new Ukiyo(ele, {
    //     speed: 1.8,
    //     scale: 1.1
    //   });
    // });
  }

  onResize() {
    super.onResize();
  }
}
