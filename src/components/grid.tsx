import {
  ComponentProps,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import styled from "styled-components";

import { BREAKPOINTS } from "../theme";

type GridContextValue = {
  gutter?: number;
  columns?: number;
};

const GridContext = createContext<GridContextValue>({});

const GridComponent = styled.div<{ gutter: number; columns: number }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: ${(p) => `0 ${(p.gutter / 2) * -1}px`};
`;

const ColumnComponent = styled.div<{
  width: number;
  context: GridContextValue;
}>`
  display: flex;
  flex-direction: column;
  padding: ${(p) => `0 ${(p.context.gutter || 0) / 2}px`};
  width: ${(p) => `${(p.width / (p.context.columns || 0)) * 100}%`};

  ${BREAKPOINTS.MOBILE} {
    width: 100%;
  }
`;

type GridProps = ComponentProps<typeof GridComponent> & {
  gutter?: number;
  columns?: number;
};

export function Grid({ gutter = 20, columns = 12, ...rest }: GridProps) {
  return (
    <GridContext.Provider value={{ gutter, columns }}>
      <GridComponent {...rest} gutter={gutter} columns={columns} />
    </GridContext.Provider>
  );
}

type ColumnProps = PropsWithChildren<{
  width: number;
}>;

export function Column(props: ColumnProps) {
  const context = useContext(GridContext);
  return <ColumnComponent {...props} context={context} />;
}
