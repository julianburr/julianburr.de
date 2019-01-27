import React, { createContext, useContext } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../theme";

const GridContext = createContext();

const GridComponent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: ${p => `0 ${(p.gutter / 2) * -1}px`};
`;

const ColumnComponent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${p => `0 ${p.context.gutter / 2}px`};
  width: ${p => `${(p.width / p.context.columns) * 100}%`};

  ${BREAKPOINTS.MOBILE} {
    width: 100%;
  }
`;

export function Grid({ gutter = 20, columns = 12, ...rest }) {
  return (
    <GridContext.Provider value={{ gutter, columns }}>
      <GridComponent {...rest} gutter={gutter} columns={columns} />
    </GridContext.Provider>
  );
}

export function Column(props) {
  const context = useContext(GridContext);
  return <ColumnComponent {...props} context={context} />;
}
