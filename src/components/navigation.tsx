import { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import { RoutingContext, gridColors } from "../context/routing";
import { COLORS, BREAKPOINTS } from "../theme";
import { List, Item } from "../components/list";

import { ReactComponent as TwitterIcon } from "../images/icons/twitter.svg";
import { ReactComponent as GithubIcon } from "../images/icons/github.svg";
import { ReactComponent as MediumIcon } from "../images/icons/medium.svg";

const Menu = styled.menu`
  margin: 0;
  padding: 0;
  position: fixed;
  top: 8rem;
  left: 8rem;
  font-size: 2rem;
  font-family: Staatliches;
  z-index: 1000;

  ${BREAKPOINTS.MOBILE} {
    opacity: 0;
    pointer-events: none;
    transform: scale(0.9);
    background: ${COLORS.WHITE};
    top: 0.5rem;
    left: 0.5rem;
    right: 0.5rem;
    bottom: 0.5rem;
    transform-origin: center center;
    transition: transform 0.3s, opacity 0.3s;
    padding: 13rem 4rem 4rem 4rem;
    text-align: center;
    overflow: auto;
    font-size: 3rem;

    &.active {
      opacity: 1;
      pointer-events: all;
      transform: scale(1);
    }
  }

  & a {
    padding: 0.5rem 0;
    text-decoration: none;
    color: inherit;

    ${BREAKPOINTS.MOBILE} {
      padding: 1rem 0;
    }
  }
`;

const MenuGrid = styled.menu`
  margin: 0;
  padding: 0;
  position: fixed;
  bottom: 8rem;
  left: 8rem;
  z-index: 1000;

  ${BREAKPOINTS.MOBILE} {
    display: none;
  }

  & ul,
  & ul li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  & ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 5.6rem;
  }

  & a {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0.3rem 0.3rem 0 0;
    display: flex;
    flex-shrink: 0;
    transition: background 0.2s;
    border: 0 solid currentColor;
    position: relative;
    background: ${COLORS.GREY.MEDIUM};

    &:before {
      content: " ";
      position: absolute;
      background: transparent;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      transform-origin: center;
      transition: opacity 0.2s, background 0.2s;
      opacity: 0;
      border: 0.4rem solid currentColor;
    }

    &:hover:before {
      opacity: 1;
    }

    &.active:before,
    &.active:hover:before {
      opacity: 1;
      background: currentColor;
    }
  }
`;

const MobileMenuButton = styled.button`
  width: 4rem;
  height: 4rem;
  display: none;
  border: 0 none;
  background: transparent;
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 1001;
  transition: transform 0.3s;

  &:before,
  &:after {
    content: " ";
  }

  &:before,
  &:after,
  & > span {
    position: absolute;
    width: 70%;
    height: 0.4rem;
    background: ${COLORS.BLACK};
    transition: top 0.3s, left 0.3s, width 0.3s, transform 0.3s;
    margin-top: -0.2rem;
    left: 15%;
  }

  &:focus {
    outline: 0 none;
    transform: scale(1.1);

    &:before,
    &:after,
    & > span {
      box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.2);
    }
  }

  &:before {
    top: 35%;
  }

  &:after {
    top: 50%;
  }

  & > span {
    top: 65%;
  }

  &.active {
    &:before {
      top: 50%;
      transform: rotate(45deg);
    }

    &:after {
      width: 0;
      left: 50%;
    }

    & > span {
      top: 50%;
      transform: rotate(-45deg);
    }
  }

  ${BREAKPOINTS.MOBILE} {
    display: block;
  }
`;

const SocialList = styled.ul`
  margin: 5rem 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;

  & li a {
    padding: 0.5rem;
    margin: 0 0.4rem 0 0;
    transition: transform 0.3s, color 0.3s;
    display: inline-block;

    &:hover {
      color: var(--hover-color);
      transform: translateY(-0.3rem);
    }

    &:focus {
      outline: 0 none;
      transform: scale(1.2);
    }

    & svg {
      height: 2rem;
      width: auto;
    }
  }

  ${BREAKPOINTS.MOBILE} {
    width: 100%;
    justify-content: center;
    margin-top: 4rem;

    & li a svg {
      height: 3rem;
    }
  }
`;

const A = styled.a<{ hoverColor: string }>`
  --hover-color: ${(props) => props.hoverColor};
`;

type NavigationProps = {
  location?: any;
};

export function Navigation({ location }: NavigationProps) {
  const context = useContext(RoutingContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function toggleMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  function handleLinkClick() {
    setMobileMenuOpen(false);
  }

  return (
    <>
      <MobileMenuButton
        onClick={toggleMenu}
        className={mobileMenuOpen ? "active" : undefined}
        aria-label="Toggle Menu"
      >
        <span />
      </MobileMenuButton>
      <Menu className={mobileMenuOpen ? "active" : undefined}>
        <List>
          <Item>
            <Link to="/" onClick={handleLinkClick}>
              Hi.
            </Link>
          </Item>
          <Item>
            <Link to="/my-work" onClick={handleLinkClick}>
              My Work
            </Link>
          </Item>
          <Item>
            <Link to="/til" onClick={handleLinkClick}>
              TIL
            </Link>
          </Item>

          <Item>
            <Link to="/curriculum-vitae" onClick={handleLinkClick}>
              Curriculum Vitae
            </Link>
          </Item>
          <Item>
            <Link to="/around-the-world" onClick={handleLinkClick}>
              Around The World
            </Link>
          </Item>
          <Item>
            <Link to="/get-in-touch" onClick={handleLinkClick}>
              Get In Touch
            </Link>
          </Item>
        </List>

        <SocialList>
          <li>
            <A
              href="https://mobile.twitter.com/jburr90"
              title="@jburr90 on twitter"
              target="_blank"
              rel="noreferrer"
              hoverColor={COLORS.TWITTER_BLUE}
            >
              <TwitterIcon />
            </A>
          </li>
          <li>
            <A
              href="https://github.com/julianburr"
              title="@julianburr on github"
              target="_blank"
              rel="noreferrer"
              hoverColor={COLORS.GITHUB_GREY}
            >
              <GithubIcon />
            </A>
          </li>
          <li>
            <A
              href="https://medium.com/@julianburr"
              title="@julianburr on Medium"
              target="_blank"
              rel="noreferrer"
              hoverColor={COLORS.MEDIUM_GREEN}
            >
              <MediumIcon />
            </A>
          </li>
        </SocialList>
      </Menu>

      <MenuGrid>
        <ul>
          {Object.keys(context.routingGrids).map((key) => (
            <li key={key}>
              <Link
                className={key === context.currentGrid ? "active" : undefined}
                style={{ color: gridColors[key as keyof typeof gridColors] }}
                to={context.routingGrids[key]}
              />
            </li>
          ))}
        </ul>
      </MenuGrid>
    </>
  );
}
