import React from "react";
import styled from "styled-components";

function hasFlexProps(props) {
  return [
    "flex",
    "flexDirection",
    "flexWrap",
    "justifyContent",
    "alignItems"
  ].some(flexProp => Object.keys(props).includes(flexProp));
}

function cleanProps(props) {
  return Object.keys(props)
    .filter(
      name =>
        ![
          "flex",
          "flexDirection",
          "flexWrap",
          "justifyContent",
          "alignItems",
          "width",
          "height",
          "margin",
          "mt",
          "ml",
          "mb",
          "mr",
          "padding",
          "pt",
          "pl",
          "pb",
          "pr"
        ].includes(name)
    )
    .reduce((all, name) => ({ ...all, [name]: props[name] }), {});
}

const Div = props => <div {...cleanProps(props)} />;

const Box = styled(p => p.as || <Div {...p} />)`
  margin: ${p =>
    p.mt || p.mb || p.ml || p.mr
      ? `${p.mt || p.margin || "0"} ` +
        `${p.mr || p.margin || "0"} ` +
        `${p.mb || p.margin || "0"} ` +
        `${p.ml || p.margin || "0"}`
      : p.margin};
  padding: ${p =>
    p.pt || p.pb || p.pl || p.pr
      ? `${p.pt || p.padding || "0"} ` +
        `${p.pr || p.padding || "0"} ` +
        `${p.pb || p.padding || "0"} ` +
        `${p.pl || p.padding || "0"}`
      : p.padding};
  width: ${p => p.width};
  height: ${p => p.height};
  display: ${p => (hasFlexProps(p) ? "flex" : undefined)};
  flex-direction: ${p => p.flexDirection};
  align-items: ${p => p.alignItems};
  justify-content: ${p => p.justifyContent};
  flex-wrap: ${p => p.flexWrap};
  flex: ${p => p.flex};
`;

export default Box;
