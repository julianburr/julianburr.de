declare module "*.svg" {
  import { ComponentType, HTMLProps, ReactComponentElement } from "react";
  export const ReactComponent: ComponentType<HTMLProps<SVGElement>>;
}
