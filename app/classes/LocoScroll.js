import LocomotiveScroll from "locomotive-scroll";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default class LocoScroll {
  constructor({ scrollContainer }) {
    this.scrollContainer = scrollContainer;
    this.locoScroll = null;
    this.initLocoScroll();
  }

  initLocoScroll() {
    this.locoScroll = new LocomotiveScroll({
      el: this.scrollContainer,
      smooth: true,
      smoothMobile: true,
      lerp: 0.07
    });

    this.locoScroll.update();

    this.locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(this.scrollContainer, {
      scrollTop(value) {
        return arguments.length
          ? this.locoScroll.scrollTo(value, 0, 0)
          : this.locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      pinType: this.scrollContainer.style.transform ? "transform" : "fixed"
    });
  }
}
