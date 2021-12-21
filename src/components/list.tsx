import { ComponentProps } from "react";
import styled from "styled-components";

import { Box } from "./box";

export const List = styled((props: ComponentProps<typeof Box>) => (
  <Box margin="0" padding="0" as="ul" {...props} />
))`
  list-style: none;
`;

export function Item(props: ComponentProps<typeof Box>) {
  return <Box margin="0" padding="0" width="100%" as="li" {...props} />;
}
