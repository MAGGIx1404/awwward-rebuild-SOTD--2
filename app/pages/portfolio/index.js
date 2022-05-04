import Page from "classes/Page";
// import cube from "vendors/cube";
import { delay } from "utils/math";
import { TimelineMax } from "gsap/gsap-core";

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
        links_wrapper: ".portfolio__title__link"
      }
    });
  }

  create() {
    super.create();
  }

  onResize() {
    super.onResize();
  }
}
