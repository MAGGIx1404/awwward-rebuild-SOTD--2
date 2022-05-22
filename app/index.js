import Home from "pages/Home";
import About from "pages/About";
import Contact from "pages/Contact";
import Portfolio from "pages/Portfolio";
import Work from "pages/Work";
import Preloader from "components/Preloader";
// import Transition from "components/Transition";
import each from "lodash/each";
import magnetBtn from "vendors/magnet";
import gsap from "gsap";
import { Expo } from "gsap";
import { Linear } from "gsap/all";

class App {
  constructor() {
    console.log("🦸🦸 Superman Initialize hhhhhhh");
    this.preloader = null;
    // this.hamburger = null;
    this.content = null;
    this.template = null;
    this.pages = {};
    this.page = null;
    this.navigation = null;
    this.handleUpdate = this.update.bind(this);
    this.handleOnResize = this.onResize.bind(this);
    this.handleOnPopState = this.handleOnPopState.bind(this);

    this.createContent();
    this.createPreloader();
    this.createTransition();
    // this.createHamburger();
    this.createPages();
    magnetBtn();
    this.hambMenu();
    this.cursor();
    this.addLinkListeners();
    this.addEventListeners();
    this.update();
  }

  /**
   * Set Page template
   */
  createContent() {
    this.content = document.querySelector(".content");
    this.template = this.content.getAttribute("data-template");
  }

  /**
   * Create Preloader
   */
  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once("completed", () => this.onPreloaded());
  }

  /**
   * Create Transition
   */
  createTransition() {
    // this.transition = new Transition();
  }

  /**
   * Mount Page
   */
  createPages() {
    this.pages = {
      home: new Home(),
      about: new About(),
      contact: new Contact(),
      portfolio: new Portfolio(),
      work: new Work()
    };

    this.page = this.pages[this.template];
    this.page.create();
  }

  /**
   * Request Animation frame
   */

  update() {
    if (this.page && this.page.update) {
      this.page.update();
    }

    this.frame = window.requestAnimationFrame(this.handleUpdate);
  }

  /**
   * Event Handlers
   */

  onPreloaded() {
    this.preloader.destroy();
    this.onResize();
    this.page.show(true);
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize();
    }
  }

  async onChange({ url, push = true }) {
    if (url === window.location.href) return;

    await this.page.hide();
    const res = await window.fetch(url);
    if (res.status === 200) {
      const html = await res.text();
      const fakeDiv = document.createElement("div");

      if (push) {
        window.history.pushState({}, "", url);
      }

      fakeDiv.innerHTML = html;

      const divContent = fakeDiv.querySelector(".content");
      this.template = divContent.getAttribute("data-template");
      this.content.setAttribute(
        "data-template",
        divContent.getAttribute("data-template")
      );
      this.content.innerHTML = divContent.innerHTML;
      this.page = this.pages[this.template];

      // if (this.template === "work") {
      //   const preloadImageToAssets = this.content.querySelector(
      //     ".work__banner__wrapper img"
      //   );
      //   window.ASSETS.unshift(preloadImageToAssets.getAttribute("data-src"));
      // }
      this.preloadingOnPageTransition();
      //   this.page.create();
      //   this.onResize();
      //   this.addLinkListeners();
      //   this.page.show();
    }
  }

  preloadingOnPageTransition() {
    const imgs = this.content.querySelectorAll("img");
    let percent = 0,
      loadedImgs = 0;
    imgs.forEach((img) => {
      img.src = img.getAttribute("data-src");
      img.onload = () => {
        loadedImgs++;
        img.classList.add("loaded");
        percent = loadedImgs / imgs.length;

        if (percent === 1) {
          this.page.create();
          this.onResize();
          this.addLinkListeners();
          this.page.show();
        }
      };
    });
  }

  handleOnPopState() {
    this.onChange({
      url: window.location.pathname,
      push: false
    });
  }

  /**
   * Add page transition on each "a" element
   */
  addLinkListeners() {
    const links = document.querySelectorAll("a:not(.no-transition)");
    each(links, (link) => {
      link.onclick = (e) => {
        e.preventDefault();
        const { href } = link;
        this.onChange({ url: href });
      };
    });
  }

  /**
   * Add Event Listeners
   */
  addEventListeners() {
    window.addEventListener("resize", this.handleOnResize);
    window.addEventListener("popstate", this.handleOnPopState);
  }

  // hamb menu

  hambMenu() {
    let hamb__btn = document.querySelector(".hamb__btn");
    let hamb__menu = document.querySelector(".hamb__menu");
    const hamb__links = [...document.querySelectorAll("[data-links]")];
    const hamb__pics = [...document.querySelectorAll("[data-hover]")];
    const links = [...document.querySelectorAll("a")];
    let bloack = document.querySelector(".images__wrapper__block");
    let link_word = document.querySelectorAll(".hamb__menu__link .word");
    let mainContent = document.querySelector(".content");
    let tl = gsap.timeline();

    for (let i = 0; i < hamb__links.length; i++) {
      hamb__links[i].addEventListener("mouseover", (e) => {
        hamb__pics.forEach((el) => {
          el.classList.remove("active");
        });
        hamb__pics[i].classList.add("active");
      });
    }

    links.forEach((el) => {
      el.addEventListener("click", function () {
        if (hamb__menu.classList.contains("active")) {
          bloack.classList.remove("active");
          tl.to(link_word, 0.5, {
            y: "110%",
            opacity: 0,
            ease: Expo.easeInOut,
            stagger: {
              from: "end",
              each: 0.04
            }
          });
          setTimeout(() => {
            hamb__menu.classList.remove("active");
            mainContent.classList.remove("active");
          }, 700);
        } else {
          console.log("done");
        }
      });
    });

    hamb__btn.addEventListener("click", function () {
      if (hamb__menu.classList.contains("active")) {
        bloack.classList.remove("active");
        tl.to(link_word, 0.5, {
          y: "110%",
          opacity: 0,
          ease: Expo.easeInOut,
          stagger: {
            from: "end",
            each: 0.04
          }
        });
        setTimeout(() => {
          hamb__menu.classList.remove("active");
          mainContent.classList.remove("active");
        }, 700);
      } else {
        hamb__menu.classList.add("active");
        mainContent.classList.add("active");
        bloack.classList.add("active");
        tl.to(link_word, 0.8, {
          delay: "0.5",
          y: "0",
          opacity: 1,
          ease: Expo.easeInOut,
          stagger: 0.1
        });
      }
    });
  }

  // cursor
  cursor() {
    const cursor = document.querySelector(".cursor");
    const cursorBlock = document.querySelector(".cursor__block");
    const cursorScroll = document.querySelector(".cursor__scroll");
    const cursorView = document.querySelector(".cursor__view");
    const cursorPlay = document.querySelector(".cursor__play");
    const cursorScrollWrapper = document.querySelector("[data-cursor-scroll]");
    const cursorPlayWrapper = document.querySelector("[data-cursor-play]");
    const cursorViewWrapper = [
      ...document.querySelectorAll("[data-cursor-view]")
    ];

    document.body.addEventListener("mousemove", (evt) => {
      const mouseX = evt.clientX;
      const mouseY = evt.clientY;
      gsap.set(cursor, {
        x: mouseX,
        y: mouseY
      });
      gsap.to(cursorBlock, {
        x: mouseX,
        y: mouseY,
        stagger: -0.1
      });
    });

    document.body.addEventListener("mouseleave", function () {
      cursorScroll.classList.remove("active");
      cursorPlay.classList.remove("active");
      cursorView.classList.remove("active");
    });
    cursorScrollWrapper.addEventListener("mouseover", function () {
      cursorScroll.classList.add("active");
    });
    cursorScrollWrapper.addEventListener("mouseleave", function () {
      cursorScroll.classList.remove("active");
    });
    cursorPlayWrapper.addEventListener("mouseover", function () {
      cursorPlay.classList.add("active");
    });
    cursorPlayWrapper.addEventListener("mouseleave", function () {
      cursorPlay.classList.remove("active");
    });
    cursorViewWrapper.forEach((el) => {
      el.addEventListener("mouseover", function () {
        cursorView.classList.add("active");
      });
      el.addEventListener("mouseleave", function () {
        cursorView.classList.remove("active");
      });
    });
  }
}

const app = new App();
