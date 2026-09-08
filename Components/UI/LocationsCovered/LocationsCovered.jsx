"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./LocationsCovered.module.scss";
import Container from "@mui/material/Container";
import { Chip, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const FALLBACK_CENTER = [0, 0];
const FALLBACK_ZOOM = 2;
const CARTO_API_KEY = process.env.NEXT_PUBLIC_CARTO_API_KEY;
const MAP_TILE_URL = CARTO_API_KEY
  ? `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${encodeURIComponent(
      CARTO_API_KEY
    )}`
  : "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_ATTRIBUTION = CARTO_API_KEY
  ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

function getLocationLabel(location) {
  if (typeof location === "string") return location;
  return location?.label || location?.location || location?.title || "";
}

function getLocationCoordinates(location) {
  if (typeof location === "object" && Array.isArray(location?.coordinates)) {
    return location.coordinates;
  }
}

function stripHtml(html = "") {
  return String(html).replace(/<[^>]*>/g, "").trim();
}

export default function LocationsCovered({
  title,
  description,
  locations = [],
  mapCenter = FALLBACK_CENTER,
  mapZoom = FALLBACK_ZOOM,
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [activeLocation, setActiveLocation] = useState("");
  const [mapError, setMapError] = useState("");

  const locationItems = useMemo(() => {
    const items = locations || [];
    const seenLabels = new Set();

    return items
      .map((location) => {
        const label = getLocationLabel(location).trim();
        return {
          label,
          coordinates: getLocationCoordinates(location),
        };
      })
      .filter(({ label }) => {
        if (!label || seenLabels.has(label)) {
          return false;
        }
        seenLabels.add(label);
        return true;
      });
  }, [locations]);

  const resolvedTitle = title || "";
  const resolvedDescription = description || "";
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
          center: mapCenter,
          zoom: mapZoom,
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

        if (!locationItems.length) return;

        const nextMarkers = [];
        const bounds = [];

        locationItems.forEach(({ label, coordinates }) => {
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
  }, [locationItems, mapCenter, mapZoom]);

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
            {locationItems.map(({ label }) => (
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
