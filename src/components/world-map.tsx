import { useEffect } from "react";
import styled from "styled-components";

const Map = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  filter: brightness(1.16);
`;

type Destination = {
  node: {
    fields: {
      slug: string;
    };
    frontmatter: {
      country: string;
      place: string;
      type: string;
      latlng: string;
    };
  };
};

type WorldMapProps = {
  destinations: Destination[];
};

export function WorldMap({ destinations }: WorldMapProps) {
  useEffect(() => {
    // eslint-disable-next-line
    // @ts-ignore
    import("mapbox-gl/dist/mapbox-gl.css")
      // eslint-disable-next-line
      // @ts-ignore
      .then(() => import("mapbox-gl/dist/mapbox-gl.js"))
      .then(({ default: mapboxgl }) => {
        mapboxgl.accessToken =
          "pk.eyJ1IjoiamJ1cnI5MCIsImEiOiJja3hoNGR6NHIxcmVyMnBva3Vjb3l6NDAzIn0.np-882fi1HIpZWtaQOOMig";
        const map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/jburr90/ckxh4iodd27z116pa15wjpadp",
          zoom: 1.5,
          center: [26.3824618, 26.8447825],
        });

        map.on("load", () => {
          map.addSource("places", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: destinations.reduce<any[]>((all, dest) => {
                if (!dest.node.frontmatter.latlng) {
                  return all;
                }
                all.push({
                  type: "Feature",
                  properties: dest.node,
                  geometry: {
                    type: "Point",
                    coordinates: dest.node.frontmatter.latlng
                      ? dest.node.frontmatter.latlng
                          .split(",")
                          .map((str) => parseFloat(str))
                          .reverse()
                      : undefined,
                  },
                });
                return all;
              }, []),
            },
            cluster: true,
          });

          map.addLayer({
            id: "clusters",
            type: "circle",
            source: "places",
            filter: ["has", "point_count"],
            paint: {
              "circle-color": [
                "step",
                ["get", "point_count"],
                "#D2849C",
                5,
                "#CF7A94",
                10,
                "#C76C88",
              ],
              "circle-radius": [
                "step",
                ["get", "point_count"],
                15,
                5,
                20,
                10,
                25,
              ],
            },
          });

          map.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "places",
            filter: ["has", "point_count"],
            layout: {
              "text-field": "{point_count_abbreviated}",
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 12,
            },
          });

          map.addLayer({
            id: "unclustered-point",
            type: "circle",
            source: "places",
            filter: ["!", ["has", "point_count"]],
            paint: {
              "circle-color": "#D2849C",
              "circle-radius": 8,
            },
          });

          map.on("click", "clusters", (e: any) => {
            const features = map.queryRenderedFeatures(e.point, {
              layers: ["clusters"],
            });
            const clusterId = features[0].properties.cluster_id;
            map
              .getSource("places")
              .getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
                if (err) return;

                map.easeTo({
                  center: features[0].geometry.coordinates,
                  zoom: zoom,
                });
              });
          });

          map.on("click", "unclustered-point", (e: any) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const mag = e.features[0].properties.mag;
            const tsunami =
              e.features[0].properties.tsunami === 1 ? "yes" : "no";

            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(`<h2>Hello World<h2>`)
              .addTo(map);
          });

          map
            .on("mouseenter", "clusters", () => {
              map.getCanvas().style.cursor = "pointer";
            })
            .on("mouseenter", "unclustered-point", () => {
              map.getCanvas().style.cursor = "pointer";
            })
            .on("mouseleave", "clusters", () => {
              map.getCanvas().style.cursor = "";
            })
            .on("mouseleave", "unclustered-point", () => {
              map.getCanvas().style.cursor = "";
            });
        });
      });
  }, []);

  return <Map id="map" />;
}
