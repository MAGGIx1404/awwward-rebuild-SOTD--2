import LocomotiveScroll from "locomotive-scroll";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

export default function initLocoScroll(wrapper) {
  const locoScroll = new LocomotiveScroll({
    el: wrapper,
    smooth: true,
    smoothMobile: true,
    lerp: 0.03,
    // reloadOncontextChange: true,
    getDirection: true,
    // repeat: true,
    mobile: {
      smooth: true,
      inertia: 0.8,
      breakpoint: 0,
      getDirection: true
    },
    tablet: {
      smooth: true,
      inertia: 0.8,
      breakpoint: 0,
      getDirection: true
    }
  });

  locoScroll.on("scroll", () => ScrollTrigger.update());
  ScrollTrigger.scrollerProxy(wrapper, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: wrapper.style.transform ? "transform" : "fixed"
  });

  return locoScroll;
}
