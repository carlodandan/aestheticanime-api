import * as cheerio from "cheerio";
import { v1_base_url } from "../utils/base_v1.js";

export default async function extractNextEpisodeSchedule(id) {
  try {
    const response = await fetch(`https://${v1_base_url}/watch/${id}`);
    const html = await response.text();
    const $ = cheerio.load(html);
    const nextEpisodeSchedule = $(
      ".schedule-alert > .alert.small > span:last"
    ).attr("data-value");
    return nextEpisodeSchedule;
  } catch (error) {
    console.error(error);
  }
}