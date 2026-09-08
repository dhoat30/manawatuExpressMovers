"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./LocationsCovered.module.scss";
import Container from "@mui/material/Container";
import { Chip, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const DEFAULT_CENTER = [-40.3564, 175.6111];
const DEFAULT_ZOOM = 10;
const CARTO_API_KEY = process.env.NEXT_PUBLIC_CARTO_API_KEY;
const MAP_TILE_URL = CARTO_API_KEY
  ? `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${encodeURIComponent(
      CARTO_API_KEY
    )}`
  : "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_ATTRIBUTION = CARTO_API_KEY
  ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const LOCATION_COORDINATES = {
  "Palmerston North Central": [-40.3564, 175.6111],
  Hokowhitu: [-40.3587, 175.6316],
  Awapuni: [-40.3698, 175.5904],
  Milson: [-40.3288, 175.6092],
  "Kelvin Grove": [-40.3373, 175.6424],
  Roslyn: [-40.3428, 175.6301],
  "Terrace End": [-40.3512, 175.6358],
  Takaro: [-40.3521, 175.5881],
  "West End": [-40.3654, 175.6002],
  Highbury: [-40.354, 175.5727],
  Aokautere: [-40.3904, 175.6651],
  Ashhurst: [-40.2942, 175.7544],
  Feilding: [-40.2256, 175.5653],
  Bunnythorpe: [-40.2803, 175.633],
  Longburn: [-40.3869, 175.5507],
  Linton: [-40.4277, 175.5834],
  Sanson: [-40.2207, 175.4249],
  Bulls: [-40.1742, 175.3845],
  Whanganui: [-39.9301, 175.0479],
};

const FALLBACK_TITLE =
  "<h2>Moving Services Across Manawatū &amp; Whanganui</h2>";
const FALLBACK_DESCRIPTION =
  "Manawatū Express Movers helps with house moves, apartment moves, office relocations, and furniture deliveries across Palmerston North, Manawatū, and Whanganui.";
const FALLBACK_LOCATIONS = [
  "Palmerston North Central",
  "Hokowhitu",
  "Awapuni",
  "Milson",
  "Kelvin Grove",
  "Roslyn",
  "Terrace End",
  "Takaro",
  "West End",
  "Highbury",
  "Aokautere",
  "Ashhurst",
  "Feilding",
  "Bunnythorpe",
  "Longburn",
  "Linton",
  "Sanson",
  "Bulls",
  "Whanganui",
];

function getLocationLabel(location) {
  if (typeof location === "string") return location;
  return location?.label || location?.location || location?.title || "";
}

function stripHtml(html = "") {
  return String(html).replace(/<[^>]*>/g, "").trim();
}

export default function LocationsCovered({
  title,
  description,
  locations,
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [activeLocation, setActiveLocation] = useState("");
  const [mapError, setMapError] = useState("");

  const locationLabels = useMemo(() => {
    const labels = ((locations && locations.length ? locations : FALLBACK_LOCATIONS) || [])
      .map(getLocationLabel)
      .map((label) => label.trim())
      .filter(Boolean);

    return [...new Set(labels)];
  }, [locations]);

  const resolvedTitle = title || FALLBACK_TITLE;
  const resolvedDescription = description || FALLBACK_DESCRIPTION;
  const titleText = stripHtml(resolvedTitle);
  const hasHtmlTitle =
    typeof resolvedTitle === "string" && /<\/?[a-z][\s\S]*>/i.test(resolvedTitle);
  const hasHtmlDescription =
    typeof resolvedDescription === "string" &&
    /<\/?[a-z][\s\S]*>/i.test(resolvedDescription);

  useEffect(() => {
    let cancelled = false;
    let map;

    async function initMap() {
      try {
        const leaflet = await import("leaflet");
        if (cancelled || !mapRef.current) return;

        map = leaflet.map(mapRef.current, {
          center: DEFAULT_CENTER,
          zoom: DEFAULT_ZOOM,
          zoomControl: true,
          zoomAnimation: false,
          scrollWheelZoom: false,
        });

        leaflet
          .tileLayer(MAP_TILE_URL, {
            attribution: MAP_ATTRIBUTION,
            maxZoom: 19,
          })
          .addTo(map);

        const markerIcon = leaflet.divIcon({
          className: styles.marker,
          html: "<span></span>",
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });
        mapInstanceRef.current = map;

        if (!locationLabels.length) return;

        const nextMarkers = [];
        const bounds = [];

        locationLabels.forEach((label) => {
          const coordinates = LOCATION_COORDINATES[label];
          if (!coordinates) return;

          const marker = leaflet
            .marker(coordinates, {
              icon: markerIcon,
              title: label,
            })
            .addTo(map)
            .bindPopup(label);

          marker.on("click", () => {
            setActiveLocation(label);
            map.flyTo(coordinates, 13, { duration: 0.55 });
          });

          bounds.push(coordinates);
          nextMarkers.push(marker);
        });

        markersRef.current = nextMarkers;

        if (bounds.length > 1) {
          map.fitBounds(bounds, { padding: [36, 36] });
        } else if (bounds.length === 1) {
          map.setView(bounds[0], 13);
        }
      } catch {
        setMapError("Map failed to load.");
      }
    }

    initMap();

    return () => {
      cancelled = true;
      markersRef.current = [];
      if (map) {
        map.stop();
        map.off();
        map.remove();
      }
      mapInstanceRef.current = null;
    };
  }, [locationLabels]);

  const handleLocationClick = (label) => {
    setActiveLocation(label);
    const marker = markersRef.current.find(
      (item) => item.options?.title === label
    );
    const map = mapInstanceRef.current;

    if (!marker || !map) return;

    map.flyTo(marker.getLatLng(), 13, { duration: 0.55 });
    marker.openPopup();
  };

  return (
    <section className={`${styles.section}`} id="locations-covered">
      <Container maxWidth="lg" className={styles.container}>
        <div className={`${styles.contentWrapper}`}>
          {hasHtmlTitle ? (
            <div
              className={`${styles.title} heading-2 `}
              dangerouslySetInnerHTML={{ __html: resolvedTitle }}
            />
          ) : (
            <Typography variant="h3" component="h2" className={styles.title}>
              {resolvedTitle}
            </Typography>
          )}

          {hasHtmlDescription ? (
            <div
              className={`body1 mt-16`}
              dangerouslySetInnerHTML={{ __html: resolvedDescription }}
            />
          ) : (
            <Typography
              variant="body1"
              component="p"
              className={`${styles.description} mt-16`}
            >
              {resolvedDescription}
            </Typography>
          )}

          <ul className={`${styles.locationsWrapper} mt-16`}>
            {locationLabels.map((label) => (
              <li key={label}>
                <Chip
                  icon={<LocationOnIcon fontSize="small" />}
                  label={label}
                  onClick={() => handleLocationClick(label)}
                  className={`${styles.locationChip} ${
                    activeLocation === label ? styles.active : ""
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.mapPanel}>
          <div
            ref={mapRef}
            className={styles.map}
            aria-label={`${titleText || "Areas covered"} map`}
          />
          {mapError && (
            <Typography variant="body2" className={styles.mapError}>
              {mapError}
            </Typography>
          )}
        </div>
      </Container>
    </section>
  );
}
