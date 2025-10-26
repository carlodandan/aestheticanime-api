import { v1_base_url } from "../utils/base_v1.js";
import { provider } from "../utils/provider.js";

export async function extractSubtitle(id) {
  const resp = await fetch(
    `https://${v1_base_url}/ajax/v2/episode/sources/?id=${id}`
  );
  const respData = await resp.json();
  const source = await fetch(
    `${provider}/embed-2/ajax/e-1/getSources?id=${respData.link
      .split("/")
      .pop()
      .replace(/\?k=\d?/g, "")}`
  );
  const sourceData = await source.json();
  const subtitles = sourceData.tracks;
  const intro = sourceData.intro;
  const outro = sourceData.outro;
  return { subtitles, intro, outro };
}