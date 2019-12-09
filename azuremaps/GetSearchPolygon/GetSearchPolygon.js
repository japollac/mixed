/*
Non working code snipped:
This snipped shows how to search for a geometrie like a country, city or region and draw the results onto azure maps as a polygon
*/

const url1 = "https://atlas.microsoft.com/search/address/json?subscription-key=[sub]&api-version=1.0&query=Niedersachsen&typeahead=true&limit=1"
            
fetch(url1).then((response) => {
               
    response.json().then((geojson) => {
    const geometry = geojson.results[0].dataSources.geometry

    let url = "https://atlas.microsoft.com/search/polygon/json?subscription-key=[sub]&api-version=1.0&geometries={geometries}".replace("{geometries}", geometry.id)
    fetch(url).then((geopoly) => {
        geopoly.json().then((data) => {
            const coords = data.additionalData[0].geometryData.features[0].geometry
            console.log(coords)

            this._dataSource.add(new atlas.data.Feature(
                new atlas.data.MultiPolygon(coords.coordinates)
            ))

            map.layers.add(new atlas.layer.PolygonLayer(this._dataSource, null,{
                fillColor: 'red',
                opacaty: 0.5
            }));

        })
    })
})
