import Page from "classes/Page";
// import cube from "vendors/cube";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { delay } from "utils/math";
import Ukiyo from "ukiyojs";
import { TimelineMax } from "gsap/gsap-core";

export default class Work extends Page {
  constructor() {
    super({
      classes: {
        active: "work--active"
      },
      id: "work",
      element: ".work",
      elements: {
        wrapper: ".work__wrapper", // scroller
        links_wrapper: ".work__title__link",
        work_pics: ".parallax__image"
      }
    });
  }

  create() {
    super.create();
    // this.parallax();
  }

  //   parallax() {
  //     this.imgOne = [...this.elements.home_pics];
  //     this.imgSlow = [...this.elements.images];

  //     this.imgOne.forEach((ele) => {
  //       this.parallaxEffect = new Ukiyo(ele, {
  //         speed: 2.5,
  //         scale: 1.25
  //       });
  //     });

  //     this.imgSlow.forEach((ele) => {
  //       this.parallaxEffectSlow = new Ukiyo(ele, {
  //         speed: 1.8,
  //         scale: 1.1
  //       });
  //     });
  //   }

  onResize() {
    super.onResize();
  }
}
