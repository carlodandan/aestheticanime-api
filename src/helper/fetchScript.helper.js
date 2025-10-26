async function fetchScript(url) {
  const response = await fetch(url);
  return await response.text();
}

export default fetchScript;