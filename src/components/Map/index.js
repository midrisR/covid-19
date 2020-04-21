import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
// import { Card, CardBody } from "shards-react";
import { Format } from '../Format'

export const MapBox = () => {
  const mapContainer = useRef(null);

  const styles = {
    position: "relative",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    height: 500
  };

  async function GetMap() {
    const res = await axios(
      "https://covid-19-statistics.p.rapidapi.com/reports",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
          "x-rapidapi-key": "9e437668b1msh6c9b7b7a425ec68p1a1d63jsn44994cd45087"
        }
      }
    );
    const point = await res.data.data;

    const x = point.map(po => {
      return {
        type: "Feature",
        properties: {
          description: po.region.province ? po.region.province : po.region.name,
          info: `<h6 class="popup-text"n  >${po.region.name},${po.region.province}</h6>
            <div class="cnMap">
                <div class="Confirmed">Confirmed</div>
                <div class="Recovered">Recovered</div>
                <div class"Deaths">Deaths</div>
            </div>

            <div class="popup-info">
                <div class="Confirmed">${Format(po.confirmed)}</div>
                <div class="Recovered">${Format(po.recovered)}</div>
                <div class"Deaths">${Format(po.deaths)}</div>
            </div>`,
          cases: po.confirmed
        },
        geometry: {
          type: "Point",
          coordinates: [po.region.long, po.region.lat]
        }
      };
    });


    const allPoints = {
      type: "FeatureCollection",
      features: x
    };
    LoadMap(allPoints);
    // console.log(allPoints)
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

    allPoints.features.forEach(function (marker) {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        marker.properties.info
      );

      var el = document.createElement("div");
      el.className = "marker";

      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(popup)

        .addTo(map);
      el.addEventListener("mouseenter", () => popup.addTo(map));
      el.addEventListener("mouseleave", () => popup.remove());
    });

  }

  useEffect(() => {
    GetMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-5">
      <div ref={el => (mapContainer.current = el)} style={styles} />
    </div>
  );
};
