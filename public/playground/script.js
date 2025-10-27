document.addEventListener('DOMContentLoaded', () => {
  const sendRequestBtn = document.getElementById('sendRequest');
  const endpointDropdown = document.getElementById('endpointDropdown');
  const responseData = document.getElementById('responseData');
  const currentEndpoint = document.getElementById('currentEndpoint');
  const backHomeBtn = document.getElementById('backHomeBtn');
  const apiSelect = document.getElementById('apiSelect');
  const apiInput = document.getElementById('apiInput');

  if (!sendRequestBtn || !endpointDropdown || !responseData || !currentEndpoint) return;

  const DEFAULT_API = 'https://aenime-api.webbase.workers.dev';
  let selectedAPI = DEFAULT_API;

  // 🏠 Back button
  if (backHomeBtn) {
    backHomeBtn.addEventListener('click', () => (window.location.href = '/'));
  }

  // 🔄 API selector
  apiSelect.addEventListener('change', () => {
    if (apiSelect.value === 'custom') {
      apiInput.style.display = 'block';
    } else {
      apiInput.style.display = 'none';
      selectedAPI = DEFAULT_API;
    }
  });

  apiInput.addEventListener('input', () => {
    if (apiSelect.value === 'custom') {
      selectedAPI = apiInput.value.trim() || DEFAULT_API;
    }
  });

  // 📘 Endpoint display
  endpointDropdown.addEventListener('change', () => {
    const selectedValue = endpointDropdown.value.trim();
    currentEndpoint.textContent = selectedValue || '/api';
  });

  // 🚀 Send Request
  sendRequestBtn.addEventListener('click', async () => {
    const endpoint = currentEndpoint.textContent.trim();
    if (!endpoint) return;

    responseData.textContent = 'Fetching... please wait.';

    const apiBase =
      apiSelect.value === 'custom' && apiInput.value.trim()
        ? apiInput.value.trim()
        : DEFAULT_API;

    const fullUrl = apiBase.replace(/\/$/, '') + '/' + endpoint.replace(/^\//, '');

    try {
      const res = await fetch(fullUrl);
      const contentType = res.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
        responseData.textContent = JSON.stringify(data, null, 2);
      } else {
        const text = await res.text();
        responseData.textContent = text;
      }
    } catch (error) {
      responseData.textContent =
        'Error! Make sure that you allowed all/any origins or you include https://aesthetic-anime-api.webbase.workers.dev as one of ALLOWED_ORIGINS so you can test if your own hosted API is working properly.';
    }
  });
});
