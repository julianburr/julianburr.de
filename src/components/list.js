import React from "react";
import styled from "styled-components";
import Box from "./box";

export const List = styled(props => (
  <Box margin="0" padding="0" as="ul" {...props} />
))`
  list-style: none;
`;

export function Item(props) {
  return <Box margin="0" padding="0" width="100%" as="li" {...props} />;
}
