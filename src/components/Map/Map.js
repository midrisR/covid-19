import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { Chart } from '../Chart'
export const Mbox = () => {
  const mapContainer = useRef(null);

  const styles = {
    position: "relative",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    height: 500,
  };


  async function GetMap() {
    const res = await axios('https://api.kawalcorona.com/');
    const point = await res.data;
    const allPoints = point.map(po => {
      return {
        type: "Feature",
        properties: {
          // description: po.region.province ? po.region.province : po.region.name,
          description: `<h6 class="popup-text"n  >${po.attributes.Country_Region}</h6>
                        <div class="cnMap">
                            <div class="Confirmed">Confirmed</div>
                            <div class="Recovered">Recovered</div>
                            <div class"Deaths">Deaths</div>
                        </div>

                        <div class="popup-info">
                        <div class="Confirmed">${po.attributes.Confirmed}</div>
                        <div class="Recovered">${po.attributes.Recovered}</div>
                        <div class"Deaths">${po.attributes.Deaths}</div>
                        </div>`,
          cases: po.attributes.Confirmed,
          deaths: po.attributes.Deaths
        },
        geometry: {
          type: "Point",
          coordinates: [po.attributes.Long_, po.attributes.Lat]
        }
      };
    });
    LoadMap(allPoints);
  }

  function LoadMap(allPoints) {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZGhhbmlvYXJ0IiwiYSI6ImNrODdhaHNuODBmaXQzZG5oaGV0Z29scTcifQ.S6xUHx6vObihUi02d8vVhA";
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v9",
      center: [95.4245, 7.72],
      zoom: 3
    });
    map.once("load", function () {
      map.addSource("allPoints", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: allPoints
        }
      });
      map.addLayer({
        id: "allPoints",
        source: "allPoints", // this should be the id of source
        type: "circle",
        paint: {
          "circle-opacity": 0.75,
          "circle-stroke-width": [
            "interpolate",
            ["linear"],
            ["get", "cases"],
            1,
            1,
            100000,
            1.75
          ],
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "cases"],
            1,
            4,
            1000,
            8,
            4000,
            10,
            8000,
            14,
            12000,
            18,
            100000,
            40
          ],
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "cases"],
            1,
            "#ffffb2",
            5000,
            "#fed976",
            10000,
            "#feb24c",
            25000,
            "#fd8d3c",
            50000,
            "#fc4e2a",
            75000,
            "#e31a1c",
            100000,
            "#b10026"
          ]
        }
      });
    });

    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.on('mouseenter', 'allPoints', function (e) {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = 'pointer';

      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    map.on('mouseleave', 'allPoints', function () {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });

  }

  useEffect(() => {
    GetMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div ref={el => (mapContainer.current = el)} style={styles} />
      <Chart />
    </>
  );
};
