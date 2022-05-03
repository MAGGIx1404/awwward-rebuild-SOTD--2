import GSAP from "gsap";
import Animation from "classes/Animation";
import { IMAGE as ease } from "utils/easings";
import { split } from "utils/text";

export default class extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements: {}
    });

    const { innerHTML } = this.element.querySelector("span");

    this.elements.text = document.createElement("div");
    this.elements.text.innerHTML = innerHTML;
    this.elements.textSpans = split({
      append: false,
      element: this.elements.text,
      expression: ""
    });

    this.elements.hover = document.createElement("div");
    this.elements.hover.innerHTML = innerHTML;
    this.elements.hoverSpans = split({
      append: false,
      element: this.elements.hover,
      expression: ""
    });

    this.element.innerHTML = "";
    this.element.appendChild(this.elements.text);
    this.element.appendChild(this.elements.hover);

    if (this.element.getAttribute("data-animation-position") === "center") {
      GSAP.set(this.elements.hover, {
        left: "50%",
        position: "absolute",
        top: "50%",
        x: "-50%",
        y: "-50%"
      });
    } else {
      GSAP.set(this.elements.hover, {
        left: 0,
        position: "absolute",
        top: 0
      });
    }

    this.timeline = GSAP.timeline({ paused: true });

    this.timeline.to(
      this.elements.textSpans,
      {
        duration: 0.5,
        ease,
        transform: "rotate3d(1, 0.2, 0, -90deg)",
        stagger: 0.02
      },
      0
    );

    this.timeline.fromTo(
      this.elements.hoverSpans,
      {
        transform: "rotate3d(1, 0.2, 0, 90deg)"
      },
      {
        duration: 0.5,
        ease,
        transform: "rotate3d(0, 0, 0, 90deg)",
        stagger: 0.02
      },
      0.05
    );

    this.animateOut();
    this.addEventListener();
  }

  animateIn() {
    // GSAP.to(this.elements.textSpans, {
    //   autoAlpha: 1,
    //   duration: 0.2,
    //   ease,
    //   stagger: 0.02,
    //   transform: 'rotate3d(0, 0, 0, 90deg)'
    // })
  }

  animateOut() {
    // GSAP.set(this.elements.textSpans, {
    //   autoAlpha: 0,
    //   transform: 'rotate3d(1, 0.3, 0, 90deg)'
    // })
  }

  onMouseEnter() {
    this.timeline.play();
  }

  onMouseLeave() {
    this.timeline.reverse();
  }

  addEventListener() {
    this.element.addEventListener("mouseenter", this.onMouseEnter);
    this.element.addEventListener("mouseleave", this.onMouseLeave);
  }

  removeEventListener() {
    this.element.addEventListener("mouseenter", this.onMouseEnter);
    this.element.addEventListener("mouseleave", this.onMouseLeave);
  }
}
