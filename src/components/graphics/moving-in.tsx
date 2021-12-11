import { ComponentProps, useState } from "react";
import styled from "styled-components";
import { lighten, darken } from "polished";

import { ReactComponent as PlantSvg } from "../../images/pictures/plant.svg";
import { ReactComponent as LampSvg } from "../../images/pictures/lamp.svg";
import { ReactComponent as ArrowUpSvg } from "../../images/icons/arrow-up.svg";

const BOX_COLOR = "#ddcea5";

const Container = styled.div`
  position: relative;
`;

const Box = styled.div`
  width: 15rem;
  height: 15rem;
  position: absolute;
  z-index: 1;
`;

const Box1 = styled(Box)`
  left: 0;
  top: 400px;
  background: ${BOX_COLOR};
`;

const Box2 = styled(Box)`
  left: 14rem;
  top: 39rem;
  height: 17rem;
  width: 17rem;
  z-index: 100;
  background: ${lighten(0.08, BOX_COLOR)};
`;

const Box3 = styled(Box)`
  left: 30rem;
  top: 40rem;
  background: ${BOX_COLOR};
`;

const Box4 = styled(Box)`
  left: 25rem;
  top: 25rem;
  background: ${darken(0.08, BOX_COLOR)};
`;

const Box5 = styled(Box)`
  left: 62rem;
  top: 38rem;
  background: ${darken(0.08, BOX_COLOR)};
  z-index: 10;
`;

const Box6 = styled(Box)<{ turned: boolean }>`
  left: 75rem;
  top: 42rem;
  height: 10rem;
  width: 10rem;
  background: ${darken(0.16, BOX_COLOR)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: rotate(${(p) => (p.turned ? "0deg" : "180deg")});
  transform-origin: center;
  transition: transform 0.8s;
  cursor: pointer;
`;

const Box7 = styled(Box)`
  left: 90rem;
  top: 42rem;
  height: 19rem;
  width: 19rem;
  background: ${lighten(0.08, BOX_COLOR)};
`;

const Box8 = styled(Box)`
  left: 108rem;
  top: 41rem;
  height: 21rem;
  width: 21rem;
  background: ${lighten(0.12, BOX_COLOR)};
  z-index: 500;
`;

const Box9 = styled(Box)`
  left: 101rem;
  top: 25rem;
  height: 17rem;
  width: 17rem;
  background: ${BOX_COLOR};
`;

const Plant = styled(PlantSvg)`
  height: 24rem;
  width: auto;
  position: absolute;
  top: 30.5rem;
  left: 43rem;
`;

const Lamp = styled(LampSvg)`
  height: 18rem;
  top: 20.2rem;
  width: auto;
  position: absolute;
  left: 65rem;
`;

const ArrowUp = styled(ArrowUpSvg)`
  left: 50%;
  margin-left: -1.5rem;
  width: 3rem;
  height: auto;
  margin: 0.5rem;
  color: ${darken(0.25, BOX_COLOR)};
`;

const Text = styled.span`
  font-family: Staatliches;
  font-size: 2rem;
  color: ${darken(0.25, BOX_COLOR)};
`;

export function MovingIn(props: ComponentProps<typeof Container>) {
  const [turned, setTurned] = useState(false);
  return (
    <Container {...props}>
      <Box1 />
      <Box2 />
      <Box3 />
      <Box4 />
      <Plant />

      <Box5 />
      <Lamp />
      <Box6 turned={turned} onClick={() => setTurned(!turned)}>
        <ArrowUp />
        <Text>This side up</Text>
      </Box6>

      <Box7 />
      <Box8 />
      <Box9 />
    </Container>
  );
}
