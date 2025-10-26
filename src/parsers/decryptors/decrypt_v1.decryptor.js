import CryptoJS from "crypto-js";
import * as cheerio from "cheerio";
import { v1_base_url } from "../../utils/base_v1.js";
import { v4_base_url } from "../../utils/base_v4.js";
import { fallback_1, fallback_2 } from "../../utils/fallback.js";

export async function decryptSources_v1(epID, id, name, type, fallback) {
  try {
    let decryptedSources = null;
    let iframeURL = null;

    if (fallback) {
      const fallback_server = ["hd-1", "hd-3"].includes(name.toLowerCase())
        ? fallback_1
        : fallback_2;

      iframeURL = `https://${fallback_server}/stream/s-2/${epID}/${type}`;

      const response = await fetch(
        `https://${fallback_server}/stream/s-2/${epID}/${type}`,
        {
          headers: {
            Referer: `https://${fallback_server}/`,
          },
        },
      );
      const html = await response.text();
      
      const $ = cheerio.load(html);
      const dataId = $("#megaplay-player").attr("data-id");
      const decryptedResponse = await fetch(
        `https://${fallback_server}/stream/getSources?id=${dataId}`,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        },
      );
      decryptedSources = await decryptedResponse.json();
    } else {
      const sourcesResponse = await fetch(
        `https://${v4_base_url}/ajax/episode/sources?id=${id}`,
      );
      const sourcesData = await sourcesResponse.json();

      const ajaxLink = sourcesData?.link;
      if (!ajaxLink) throw new Error("Missing link in sourcesData");

      const sourceIdMatch = /\/([^/?]+)\?/.exec(ajaxLink);
      const sourceId = sourceIdMatch?.[1];
      if (!sourceId) throw new Error("Unable to extract sourceId from link");

      const baseUrlMatch = ajaxLink.match(
        /^(https?:\/\/[^\/]+(?:\/[^\/]+){3})/,
      );
      if (!baseUrlMatch) throw new Error("Could not extract base URL");
      const baseUrl = baseUrlMatch[1];

      iframeURL = `${baseUrl}/${sourceId}?k=1&autoPlay=0&oa=0&asi=1`;

      const rawSourceResponse = await fetch(
        `${baseUrl}/getSources?id=${sourceId}`,
      );
      decryptedSources = await rawSourceResponse.json();
    }

    return {
      id,
      type,
      link: {
        file: fallback
          ? (decryptedSources?.sources?.file ?? "")
          : (decryptedSources?.sources?.[0].file ?? ""),
        type: "hls",
      },
      tracks: decryptedSources.tracks ?? [],
      intro: decryptedSources.intro ?? null,
      outro: decryptedSources.outro ?? null,
      iframe: iframeURL,
      server: name,
    };
  } catch (error) {
    console.error(
      `Error during decryptSources_v1(${id}, epID=${epID}, server=${name}):`,
      error.message,
    );
    return null;
  }
}