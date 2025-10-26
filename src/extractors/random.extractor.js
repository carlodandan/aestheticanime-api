import { v1_base_url } from "../utils/base_v1.js";
import extractAnimeInfo from "./animeInfo.extractor.js";
import { DEFAULT_HEADERS } from "../configs/header.config.js";

export default async function extractRandom() {
  try {
    const response = await fetch(`https://${v1_base_url}/random`, {
      method: "GET",
      headers: DEFAULT_HEADERS,
      redirect: "follow",
    });

    // Cloudflare fetch automatically follows redirects
    const redirectedUrl = response.url;
    const id = redirectedUrl.split("/").pop();

    const animeInfo = await extractAnimeInfo(id);
    return animeInfo;
  } catch (error) {
    console.error("Error extracting random anime info:", error);
  }
}
