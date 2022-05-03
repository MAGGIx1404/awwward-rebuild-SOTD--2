import Page from "classes/Page";
// import cube from "vendors/cube";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { delay } from "utils/math";
import Ukiyo from "ukiyojs";
import { TimelineMax } from "gsap/gsap-core";

export default class Home extends Page {
  constructor() {
    super({
      classes: {
        active: "home--active"
      },
      id: "home",
      element: ".home",
      elements: {
        wrapper: ".home__wrapper", // scroller
        links_wrapper: ".home__title__link",
        home_pics: ".parallax__image",
        images: ".parallax__image__slow",
        slides: "[data-slide]",
        reel_title_one: ".reel_left_title",
        reel_title_two: ".reel_right_title",
        reel: ".reel_video",
        reel_wrapper: ".home__reel__wrapper"
      }
    });
  }

  create() {
    super.create();
    this.parallax();
    this.pinReel();
  }

  parallax() {
    this.imgOne = [...this.elements.home_pics];
    this.imgSlow = [...this.elements.images];

    this.imgOne.forEach((ele) => {
      this.parallaxEffect = new Ukiyo(ele, {
        speed: 2.5,
        scale: 1.25
      });
    });

    this.imgSlow.forEach((ele) => {
      this.parallaxEffectSlow = new Ukiyo(ele, {
        speed: 1.8,
        scale: 1.1
      });
    });
  }

  pinReel() {
    const title_one = this.elements.reel_title_one;
    const title_two = this.elements.reel_title_two;
    const reel = this.elements.reel;
    const reel_wrapper = this.elements.reel_wrapper;

    gsap.to(reel, {
      width: "100vw",
      scrollTrigger: {
        trigger: reel_wrapper,
        scroller: this.elements.wrapper,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true
      }
    });
    gsap.to(title_one, {
      x: "30vw",
      scrollTrigger: {
        trigger: reel_wrapper,
        scroller: this.elements.wrapper,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true
      }
    });
    gsap.to(title_two, {
      x: "-30vw",
      scrollTrigger: {
        trigger: reel_wrapper,
        scroller: this.elements.wrapper,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true
      }
    });
  }

  onResize() {
    super.onResize();
  }
}
