import React from "react";
import styled from "styled-components";

const List = styled.ul`
  margin: 0;
  padding: 2rem 0;
  list-style: none;
  display: flex;
  flex-direction: row;
`;

const Item = styled.li`
  margin: 0;
  padding: 0;

  & a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    background-color: ${p => (p.active ? "var(--main-bg-color)" : "none")};
    color: ${p => (p.active ? "white" : "var(--main-bg-color)")};
    transition: transform 0.2s;

    &:active {
      transform: scale(1.1);
    }

    &:hover {
      text-decoration: ${p => (p.active ? "none" : "underline")};
    }
  }
`;

export default function Pagination({ url, currentPage, totalPages, ...rest }) {
  return (
    <List {...rest}>
      {Array.from({ length: totalPages }, (_, i) => (
        <Item active={i + 1 === parseInt(currentPage)} key={i}>
          <a
            href={i === 0 ? `${url}` : `${url}?page=${i + 1}`}
            onClick={() =>
              window.document.getElementById("top").scrollIntoView({
                behavior: "smooth"
              })
            }
          >
            {i + 1}
          </a>
        </Item>
      ))}
    </List>
  );
}
