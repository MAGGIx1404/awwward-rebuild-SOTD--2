import fetch from "node-fetch";
import * as prismic from "@prismicio/client";
import dotenv from "dotenv";
dotenv.config();

const repoName = process.env.REPO_NAME;
const accessToken = process.env.ACCESS_TOKEN;
const endPoint = prismic.getEndpoint(repoName);

const routes = [];

export const client = prismic.createClient(endPoint, {
  fetch,
  accessToken,
  routes
});
