
mapboxgl.accessToken =map_token;
  const map = new mapboxgl.Map({
      container: 'map', 
      center: listing.geometry.coordinates, 
      zoom: 10
  });
 // Create a default Marker and add it to the map.
 const marker1 = new mapboxgl.Marker({color:"red"})
 .setLngLat(listing.geometry.coordinates)
 .setPopup( new mapboxgl.Popup({ closeOnClick: false })
 .setHTML(`<h6> ${listing.location} </h6> <p> Exact location will be provided after booking.</p>` ))
 .addTo(map);




 document
 .getElementById('lightPreset')
 .addEventListener('change', function () {
     map.setConfigProperty('basemap', 'lightPreset', this.value);
 });

document
 .querySelectorAll('.map-overlay-inner input[type="checkbox"]')
 .forEach((checkbox) => {
     checkbox.addEventListener('change', function () {
         map.setConfigProperty('basemap', this.id, this.checked);
     });
 });



 
 