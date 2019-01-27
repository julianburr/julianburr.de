import styled from "styled-components";

function hasFlexProps(props) {
  return [
    "flex",
    "flexDirection",
    "flexWrap",
    "justifyContent",
    "alignItems",
    "alignContent"
  ].some(flexProp => Object.keys(props).includes(flexProp));
}

const Box = styled(p => p.as || "div")`
  display: ${p => (hasFlexProps(p) ? "flex" : undefined)};
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
`;

export default Box;
