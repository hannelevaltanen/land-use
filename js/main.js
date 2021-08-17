const landUseNames = {
    '01': 'One & Two Family Buildings',
    '02': 'Multi-Family Walk-Up Buildings',
    '03': 'Multi-Family Elevator Buildings',
    '04': 'Mixed Residential & Commercial Buildings',
    '05': 'Commercial & Office Buildings',
    '06': 'Industrial & Manufacturing',
    '07': 'Transportation & Utility',
    '08': 'Public Facilities & Institutions',
    '09': 'Open Space & Outdoor Recreation',
    '10': 'Parking Facilities',
    '11': 'Vacant Land',
}
mapboxgl.accessToken = 'pk.eyJ1Ijoibm5lbGUiLCJhIjoiY2tzZDg2a2dlMG56bzJucXFpNGJydG92YiJ9.5wS9rdhqffiwF7EPfb6GgQ';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/nnele/cksd9bqkj6mtv17qu23txju73', // style URL
    center: [-73.985317, 40.723032], // starting position [lng, lat]
    zoom: 13, // starting zoom
    minZoom: 13,
    maxZoom: 18,
    hash: true
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

map.on('mousemove', function(e) {
    if (map.loaded()) {
    const features = map.queryRenderedFeatures(e.point, { 
        layers: ['lots'] 
    });
    map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    }
});

map.on('click', function(e) {
    const geometry = e.point;
    const parameters = {
        layers: ['lots']
    }
    const features = map.queryRenderedFeatures(geometry, parameters);
    const lot = features[0];

    if (features.length) {
        const bbl = lot.properties.BBL || '—';
        const landUse = landUseNames[lot.properties.LandUse] || '—';
        const zoneDist = lot.properties.ZoneDist1 || '—';
        const bldgClass = lot.properties.BldgClass || '—';
        const ownerName = lot.properties.OwnerName || '—';

        const popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<dl>
                <dt>BBL</dt>
                <dd>${bbl}</dd>
                <dt>Land Use</dt>
                <dd>${landUse}</dd>
                <dt>Zoning District</dt>
                <dd>${zoneDist}</dd>
                <dt>Building Class</dt>
                <dd>${bldgClass}</dd>
                <dt>Owner Name</dt>
                <dd>${ownerName}</dd>
            </dl>`)
            .addTo(map);
    }
});
