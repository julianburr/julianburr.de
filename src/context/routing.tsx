import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { COLORS } from "../theme";

type RouteContextValue = {
  routingGrids?: any;
  currentGrid?: any;
  currentGridColor?: any;
  location?: any;
};

export const RoutingContext = createContext<RouteContextValue>({});

export const gridColors = {
  home: COLORS.BEIGE,
  "curriculum-vitae": COLORS.GREEN,
  skills: COLORS.YELLOW,
  "get-in-touch": COLORS.PURPLE,
  til: COLORS.BLUE.MEDIUM,
  library: COLORS.BLUE.DARK,
  "around-the-world": COLORS.TURQUOISE,
  "my-work": COLORS.RED,
  blm: COLORS.BLACK,
};

type GridId = keyof typeof gridColors;

type RoutingProviderProps = PropsWithChildren<{
  location: any;
}>;

export function RoutingProvider({ children, location }: RoutingProviderProps) {
  function getGridId(path: string): GridId {
    if (path === "/til/black-lives-matter/") {
      return "blm";
    }
    const [firstPart] = path.split("/").filter(Boolean);
    return firstPart && gridColors[firstPart as GridId] !== undefined
      ? (firstPart as GridId)
      : "home";
  }

  const [routingGrids, setRoutingGrids] = useState({
    [getGridId(location.pathname)]: location.pathname,
  });

  const [currentGrid, setCurrentGrid] = useState(getGridId(location.pathname));

  function handleLocationChange(path: string) {
    const gridId = getGridId(path);
    setCurrentGrid(gridId);
    setRoutingGrids({
      ...routingGrids,
      [gridId]: path,
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
        location,
      }}
    >
      {children}
    </RoutingContext.Provider>
  );
}
