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
        banner__pic: ".work__banner__bg__wrapper img",
        screen: ".work__screen__pic__wrapper img",
        grid_one: ".grid__item__one",
        grid_two: ".grid__item__two",
        grid_three: ".grid__item__three",
        grid_four: ".grid__item__four",
        grid_five: ".grid__item__five",
        grid_wrapper: ".work__grid"
      }
    });
  }

  create() {
    super.create();
    this.parallax();
    this.gridZoom();
  }

  parallax() {
    this.parallaxEffect = new Ukiyo(this.elements.banner__pic, {
      speed: 2.5,
      scale: 1.25
    });

    this.parallaxEffectTwo = new Ukiyo(this.elements.screen, {
      speed: 2,
      scale: 1.25
    });

    // this.imgSlow.forEach((ele) => {
    //   this.parallaxEffectSlow = new Ukiyo(ele, {
    //     speed: 1.8,
    //     scale: 1.1
    //   });
    // });
  }

  gridZoom() {
    const gridOne = this.elements.grid_one;
    const gridTwo = this.elements.grid_two;
    const gridThree = this.elements.grid_three;
    const gridFour = this.elements.grid_four;
    const gridFive = this.elements.grid_five;
    const gridWrapper = this.elements.grid_wrapper;
    const tl = gsap.timeline({ paused: true });
    const scroller = this.elements.wrapper;

    function zoomOut() {
      tl.to(gridOne, {
        width: "100vw"
      });
      tl.to(gridOne, {
        height: "100vh"
      });
      ScrollTrigger.create({
        trigger: gridWrapper,
        pin: true,
        start: "top top",
        end: "+=100%",
        scrub: true,
        scroller: scroller,
        animation: tl
      });
    }

    // zoomOut();
    gsap.to(gridOne, {
      // scale: "5",
      width: "100vw",
      height: "100vh",
      scrollTrigger: {
        trigger: gridWrapper,
        scroller: this.elements.wrapper,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true
      }
    });
    gsap.to(gridTwo, {
      scale: "3",
      translateX: "-200%",
      opacity: 0,
      scrollTrigger: {
        trigger: gridWrapper,
        scroller: this.elements.wrapper,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true
      }
    });
    gsap.to(gridThree, {
      scale: "2",
      translateX: "200%",
      opacity: 0,
      scrollTrigger: {
        trigger: gridWrapper,
        scroller: this.elements.wrapper,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true
      }
    });
    gsap.to(gridFour, {
      scale: "2",
      translateY: "-300%",
      opacity: 0,
      scrollTrigger: {
        trigger: gridWrapper,
        scroller: this.elements.wrapper,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true
      }
    });
    gsap.to(gridFive, {
      scale: "2",
      translateY: "300%",
      opacity: 0,
      scrollTrigger: {
        trigger: gridWrapper,
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
