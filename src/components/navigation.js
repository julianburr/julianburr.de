import React, { Fragment, useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { RoutingContext, gridColors } from "../context/routing";
import { COLORS, BREAKPOINTS } from "../theme";

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

  & ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    list-style: none;
  }

  & li {
    width: 100%;
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
    opacity: 0.4;
    transition: opacity 0.2s, background 0.2s;
    background: ${COLORS.GREY.MEDIUM};

    &:hover {
      background: currentColor;
    }

    &.active {
      background: currentColor;
      opacity: 1;
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

function Navigation({ location }) {
  const context = useContext(RoutingContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function toggleMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  function handleLinkClick() {
    setMobileMenuOpen(false);
  }

  return (
    <Fragment>
      <MobileMenuButton
        onClick={toggleMenu}
        className={mobileMenuOpen ? "active" : undefined}
        aria-label="Toggle Menu"
      >
        <span />
      </MobileMenuButton>
      <Menu className={mobileMenuOpen ? "active" : undefined}>
        <ul>
          <li>
            <Link to="/" onClick={handleLinkClick}>
              Hi.
            </Link>
          </li>
          <li>
            <Link to="/curriculum-vitae" onClick={handleLinkClick}>
              Curriculum vitae
            </Link>
          </li>
          <li>
            <Link to="/skills" onClick={handleLinkClick}>
              Skills
            </Link>
          </li>
          <li>
            <Link to="/my-work" onClick={handleLinkClick}>
              My Work
            </Link>
          </li>
          <li>
            <Link to="/til" onClick={handleLinkClick}>
              TIL
            </Link>
          </li>
          <li>
            <Link to="/get-in-touch" onClick={handleLinkClick}>
              Get in touch
            </Link>
          </li>
        </ul>
      </Menu>

      <MenuGrid>
        <ul>
          {Object.keys(context.routingGrids).map(key => (
            <li key={key}>
              <Link
                className={key === context.currentGrid ? "active" : undefined}
                style={{ color: gridColors[key] }}
                to={context.routingGrids[key]}
              />
            </li>
          ))}
        </ul>
      </MenuGrid>
    </Fragment>
  );
}

export default Navigation;
