import GSAP from "gsap";

export default class {
  constructor() {
    this.element = document.createElement("canvas");
    this.element.className = "transition";
    this.element.height = window.innerHeight * window.devicePixelRatio;
    this.element.width = window.innerWidth * window.devicePixelRatio;

    this.context = this.element.getContext("2d");

    this.progress = 0;

    document.body.appendChild(this.element);
  }

  show({ color }) {
    this.color = color;

    return new Promise((resolve) => {
      GSAP.set(this.element, { rotation: 0 });

      GSAP.to(this, {
        duration: 1.5,
        ease: "expo.inOut",
        onComplete: resolve,
        onUpdate: this.onUpdate.bind(this),
        progress: 1
      });
    });
  }

  hide() {
    return new Promise((resolve) => {
      GSAP.set(this.element, { rotation: 180 });

      GSAP.to(this, {
        duration: 1.5,
        ease: "expo.inOut",
        onComplete: resolve,
        onUpdate: this.onUpdate.bind(this),
        progress: 0
      });
    });
  }

  onUpdate() {
    this.context.clearRect(0, 0, this.element.width, this.element.height);
    this.context.save();
    this.context.beginPath();

    this.widthSegments = Math.ceil(this.element.width / 40);
    this.context.moveTo(this.element.width, this.element.height);
    this.context.lineTo(0, this.element.height);

    const t = (1 - this.progress) * this.element.height;
    const amplitude = 250 * Math.sin(this.progress * Math.PI);

    this.context.lineTo(0, t);

    for (let index = 0; index <= this.widthSegments; index++) {
      const n = 40 * index;
      const r = t - Math.sin((n / this.element.width) * Math.PI) * amplitude;

      this.context.lineTo(n, r);
    }

    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.restore();
  }
}
