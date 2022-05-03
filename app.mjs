import express from "express";
import methodOverride from "method-override";
import compression from "compression";
import PrismicDOM from "prismic-dom";
import errorHandler from "errorhandler";
import path from "path";
import morgan from "morgan";
import { client } from "./config/prismicConfig.mjs";
import handleRichText, { wrapWords, wrapWordsInH2 } from "./utils/text.mjs";

const __dirname = path.resolve();
const port = process.env.PORT || 9000;
const app = express();

const handleLinkResolvers = (doc) => {
  if (doc.type === "work") {
    return `/work/${doc.uid}`;
  }
  return "/";
};

// Express configs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middlewares
app.use(
  compression({
    level: 9
  })
);
app.use(express.json());
app.use(methodOverride());
app.use(errorHandler());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.locals.Link = handleLinkResolvers;
  res.locals.PrismicDOM = PrismicDOM;
  res.locals.wrapWords = wrapWords;
  res.locals.wrapWordsInH2 = wrapWordsInH2;
  next();
});

// async function handleRequest(api) {
//   const meta = await api.getSingle("meta");
//   const footer = await api.getSingle("footer");
//   return { meta, footer };
// }

// Home page
app.get("/", async (req, res) => {
  //   const defaults = await handleRequest(client);
  const home = await client.getSingle("home");
  const assets = [];

  return res.render("pages/home", {
    home,
    // ...defaults,
    assets
  });
});

// // About page
// app.get("/about", async (req, res) => {
//   res.locals.handleRichText = handleRichText;
//   // const defaults = await handleRequest(client);
//   const about = await client.getSingle("about");
//   const assets = [];

//   return res.render("pages/about", {
//     about,
//     // ...defaults,
//     assets
//   });
// });

// // Portfolio page
// app.get("/portfolio", async (req, res) => {
//   // const defaults = await handleRequest(client);
//   const portfolio = await client.getSingle("portfolio");
//   const assets = [];
//   return res.render("pages/portfolio", {
//     portfolio,
//     // ...defaults,
//     assets
//   });
// });

// // Contact page
// app.get("/contact", async (req, res) => {
//   // const defaults = await handleRequest(client);
//   const contact = await client.getSingle("contact");
//   const assets = [];
//   return res.render("pages/contact", {
//     contact,
//     // ...defaults,
//     assets
//   });
// });

// app.get("/work/:uid", async (req, res) => {
//   const uid = req.params.uid;
//   // const defaults = await handleRequest(client);
//   const work = await client.getByUID("work", uid);
//   const assets = [];
//   // assets.push(work.data.work_gallery[0].image.url);

//   return res.render("pages/work", {
//     // ...defaults,
//     work,
//     assets
//   });
// });

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
