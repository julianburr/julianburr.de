import { Link } from "gatsby";
import { useEffect, useRef } from "react";
import { render } from "react-dom";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles: any = createGlobalStyle`
  .mapboxgl-popup {
    filter: drop-shadow(0 .4rem 1rem rgba(0,0,0,.5));
  }

  .mapboxgl-popup-content {
    box-shadow: none;
    border-radius: 0;
    position: relative;
  }

  .mapboxgl-popup-close-button {
    display: none;
  }
`;

const Map = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  filter: brightness(1.14);
`;

const Container = styled.div<{ hasImage?: boolean }>`
  padding: ${(props) =>
    props.hasImage ? `9.8rem .8rem 0` : `0.8rem 0.8rem 0`};
  width: 14rem;

  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 9rem;
    width: 100%;
    object-fit: cover;
  }

  a {
    color: inherit;
  }
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  margin: 0;
  padding: 0;
`;

const SubHeading = styled.span`
  opacity: 0.6;
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

type PopoutProps = {
  imgSrc?: string;
  title: string;
  subTitle?: string;
  slug?: string;
};

function Popout({ title, subTitle, imgSrc, slug }: PopoutProps) {
  return (
    <Container hasImage={!!imgSrc}>
      {imgSrc && <img src={imgSrc} />}
      {slug ? (
        <Link to={slug}>
          <Heading>{title}</Heading>
        </Link>
      ) : (
        <Heading>{title}</Heading>
      )}
      {subTitle && <SubHeading>{subTitle}</SubHeading>}
    </Container>
  );
}

let lastZoom = 0.9;
let lastCenter = [26.3824618, 26.8447825];

type WorldMapProps = {
  destinations: Destination[];
};

export function WorldMap({ destinations }: WorldMapProps) {
  const popupRef = useRef();

  useEffect(() => {
    // eslint-disable-next-line
    // @ts-ignore
    import("mapbox-gl/dist/mapbox-gl.css")
      // eslint-disable-next-line
      // @ts-ignore
      .then(() => import("!mapbox-gl/dist/mapbox-gl.js"))
      .then(({ default: mapboxgl }) => {
        popupRef.current = new mapboxgl.Popup({ offset: 10 });

        mapboxgl.accessToken =
          "pk.eyJ1IjoiamJ1cnI5MCIsImEiOiJja3hoNGR6NHIxcmVyMnBva3Vjb3l6NDAzIn0.np-882fi1HIpZWtaQOOMig";
        const map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/jburr90/ckxh4iodd27z116pa15wjpadp",
          zoom: lastZoom,
          center: lastCenter,
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
            clusterRadius: 35,
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
            const node = e.features[0];
            const coordinates = node.geometry.coordinates.slice();
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            const html = node.properties.html;
            const fields = JSON.parse(node.properties.fields);
            const frontmatter = JSON.parse(node.properties.frontmatter);

            const popupNode = document.createElement("div");
            render(
              <Popout
                title={frontmatter?.place}
                subTitle={frontmatter?.country}
                imgSrc={
                  frontmatter?.thumb ? `${frontmatter.thumb}=w500` : undefined
                }
                slug={frontmatter.images?.length ? fields.slug : undefined}
              />,
              popupNode
            );

            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setDOMContent(popupNode)
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

          map.on("zoomend", () => {
            lastZoom = map.getZoom();
          });

          map.on("moveend", () => {
            lastCenter = map.getCenter();
          });
        });
      });
  }, []);

  return (
    <>
      <GlobalStyles />
      <Map id="map" />
    </>
  );
}
