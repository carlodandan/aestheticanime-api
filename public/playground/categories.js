const CATEGORIES = {
  genres: [
    { value: 'action', label: 'Action' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'cars', label: 'Cars' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'dementia', label: 'Dementia' },
    { value: 'demons', label: 'Demons' },
    { value: 'drama', label: 'Drama' },
    { value: 'ecchi', label: 'Ecchi' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'game', label: 'Game' },
    { value: 'harem', label: 'Harem' },
    { value: 'historical', label: 'Historical' },
    { value: 'horror', label: 'Horror' },
    { value: 'isekai', label: 'Isekai' },
    { value: 'josei', label: 'Josei' },
    { value: 'kids', label: 'Kids' },
    { value: 'magic', label: 'Magic' },
    { value: 'martial-arts', label: 'Martial Arts' },
    { value: 'mecha', label: 'Mecha' },
    { value: 'military', label: 'Military' },
    { value: 'music', label: 'Music' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'parody', label: 'Parody' },
    { value: 'police', label: 'Police' },
    { value: 'psychological', label: 'Psychological' },
    { value: 'romance', label: 'Romance' },
    { value: 'samurai', label: 'Samurai' },
    { value: 'school', label: 'School' },
    { value: 'sci-fi', label: 'Sci-Fi' },
    { value: 'seinen', label: 'Seinen' },
    { value: 'shoujo', label: 'Shoujo' },
    { value: 'shoujo-ai', label: 'Shoujo Ai' },
    { value: 'shounen', label: 'Shounen' },
    { value: 'shounen-ai', label: 'Shounen Ai' },
    { value: 'slice-of-life', label: 'Slice of Life' },
    { value: 'space', label: 'Space' },
    { value: 'sports', label: 'Sports' },
    { value: 'super-power', label: 'Super Power' },
    { value: 'supernatural', label: 'Supernatural' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'vampire', label: 'Vampire' }
  ],
  azList: [
    { value: 'other', label: 'Other' },
    { value: '0-9', label: '0-9' },
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
    { value: 'd', label: 'D' },
    { value: 'e', label: 'E' },
    { value: 'f', label: 'F' },
    { value: 'g', label: 'G' },
    { value: 'h', label: 'H' },
    { value: 'i', label: 'I' },
    { value: 'j', label: 'J' },
    { value: 'k', label: 'K' },
    { value: 'l', label: 'L' },
    { value: 'm', label: 'M' },
    { value: 'n', label: 'N' },
    { value: 'o', label: 'O' },
    { value: 'p', label: 'P' },
    { value: 'q', label: 'Q' },
    { value: 'r', label: 'R' },
    { value: 's', label: 'S' },
    { value: 't', label: 'T' },
    { value: 'u', label: 'U' },
    { value: 'v', label: 'V' },
    { value: 'w', label: 'W' },
    { value: 'x', label: 'X' },
    { value: 'y', label: 'Y' },
    { value: 'z', label: 'Z' }
  ]
};

// Initialize dropdowns
function initializeCategoryDropdowns() {
  const mainDropdown = document.getElementById('endpointDropdown');
  const categoryContainer = document.getElementById('categoryContainer');
  const subcategoryDropdown = document.getElementById('subcategoryDropdown');
  const urlDisplay = document.getElementById('currentEndpoint');

  if (!mainDropdown || !categoryContainer || !subcategoryDropdown || !urlDisplay) return;

  mainDropdown.addEventListener('change', function () {
    const value = this.value;

    if (value === '/api/genre' || value === '/api/az-list') {
      categoryContainer.style.display = 'block';
      subcategoryDropdown.innerHTML = '<option value="">Select...</option>';

      const categories = value === '/api/genre' ? CATEGORIES.genres : CATEGORIES.azList;

      categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.value;
        opt.textContent = cat.label;
        subcategoryDropdown.appendChild(opt);
      });

      updateUrlDisplay();
    } else {
      categoryContainer.style.display = 'none';
      updateUrlDisplay();
    }
  });

  subcategoryDropdown.addEventListener('change', updateUrlDisplay);

  function updateUrlDisplay() {
    const mainValue = mainDropdown.value;
    const subValue = subcategoryDropdown.value;
    urlDisplay.textContent =
      (mainValue === '/api/genre' || mainValue === '/api/az-list') && subValue
        ? `${mainValue}/${subValue}`
        : mainValue;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCategoryDropdowns);
} else {
  initializeCategoryDropdowns();
}