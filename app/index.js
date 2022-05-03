import Home from "pages/Home";
import Preloader from "components/Preloader";
// import Transition from "components/Transition";
import each from "lodash/each";
import magnetBtn from "vendors/magnet";

class App {
  constructor() {
    console.log("🦸🦸 Superman Initialize");
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
      home: new Home()
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
    const links = document.querySelectorAll(
      "a:not(.footer__content__cr__link)"
    );
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
    let hamb__links = [...document.querySelectorAll(".hamb__menu__link")];

    hamb__btn.addEventListener("click", function () {
      hamb__menu.classList.toggle("active");
    });

    hamb__links.forEach((el) => {
      el.addEventListener("click", function () {
        hamb__menu.classList.remove("active");
      });
    });
  }
}

const app = new App();
