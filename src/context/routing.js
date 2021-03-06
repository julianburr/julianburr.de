import React, { createContext, useState, useEffect } from "react";
import { COLORS } from "../theme";

export const RoutingContext = createContext();

export const gridColors = {
  home: COLORS.BEIGE,
  "curriculum-vitae": COLORS.GREEN,
  skills: COLORS.YELLOW,
  "get-in-touch": COLORS.PURPLE,
  til: COLORS.BLUE,
  "my-work": COLORS.RED,
  blm: COLORS.BLACK
};

export function RoutingProvider({ children, location }) {
  const [routingGrids, setRoutingGrids] = useState({
    [getGridId(location.pathname)]: location.pathname
  });

  const [currentGrid, setCurrentGrid] = useState(getGridId(location.pathname));

  function getGridId(path) {
    if (path === "/til/black-lives-matter/") {
      return "blm";
    }
    const [firstPart] = path.split("/").filter(Boolean);
    return firstPart || "home";
  }

  function handleLocationChange(path) {
    const gridId = getGridId(path);
    setCurrentGrid(gridId);
    setRoutingGrids({
      ...routingGrids,
      [gridId]: path
    });
    document.documentElement.style.setProperty(
      "--main-bg-color",
      gridColors[gridId]
    );
  }

  useEffect(() => {
    handleLocationChange(location.pathname);
  }, [location]);

  return (
    <RoutingContext.Provider
      value={{
        routingGrids,
        currentGrid,
        currentGridColor: gridColors[currentGrid],
        location
      }}
    >
      {children}
    </RoutingContext.Provider>
  );
}
