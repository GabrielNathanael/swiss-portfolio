// lib\contentful\client.ts
// lib/contentful/client.ts
import { createClient } from "contentful";

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error("CONTENTFUL_SPACE_ID is not defined");
}

if (!process.env.CONTENTFUL_DELIVERY_TOKEN) {
  throw new Error("CONTENTFUL_DELIVERY_TOKEN is not defined");
}

if (!process.env.CONTENTFUL_ENV_ID) {
  throw new Error("CONTENTFUL_ENV_ID is not defined");
}

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
  environment: process.env.CONTENTFUL_ENV_ID,
});