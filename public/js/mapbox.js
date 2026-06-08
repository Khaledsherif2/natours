export const displayMap = (locations, startLocation) => {
  const icon = document.createElement('div');
  icon.className = 'marker';

  const customIcon = L.divIcon({
    html: icon.outerHTML,
    className: '',
  });

  const map = L.map('map', { scrollWheelZoom: false });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const bounds = [];

  const [lng, lat] = startLocation.coordinates;
  bounds.push([lat, lng]);
  const startMarker = L.marker([lat, lng], {
    icon: customIcon,
  })
    .addTo(map)
    .bindPopup(startLocation.description, {
      className: 'tour-popup',
    });

  locations.forEach(loc => {
    const [lng, lat] = loc.coordinates;
    bounds.push([lat, lng]);
    L.marker([lat, lng], {
      icon: customIcon,
    })
      .addTo(map)
      .bindPopup(`Day ${loc.day}: ${loc.description}`);
  });

  // Fit map to show all markers
  map.fitBounds(bounds, {
    padding: [100, 100],
  });

  // open the sart location popup
  startMarker.openPopup();
  // enable zoom only when user interacts with map
  map.on('click', function () {
    map.scrollWheelZoom.enable();
  });

  // disable again when mouse leaves
  map.on('mouseout', function () {
    map.scrollWheelZoom.disable();
  });
};
