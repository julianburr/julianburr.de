import { Link } from "gatsby";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  inset: 0;
  background: #000;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const WrapClose = styled.div`
  position: absolute;
  height: 5.6rem;
  width: 5.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;

  & a {
    padding: 1rem;
    display: flex;
    color: inherit;
    font-size: 2.2rem;

    &:hover {
      text-decoration: none;
    }
  }
`;

const Menu = styled.menu`
  position: absolute;
  margin: 0;
  max-width: calc(100% - 6.4rem);
  padding: 0;
  height: 5.6rem;
  top: 0;
  right: 0;
  background: #fff;
  font-family: Staatliches;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.8rem;
  overflow: hidden;
`;

const WrapTitle = styled.h1`
  padding: 0 1.8rem;
  height: 5.6rem;
  border-right: 0.1rem solid rgba(0, 0, 0, 0.1);
  font-size: 1.8rem;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;

const Title = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const WrapPagination = styled.div`
  padding: 0 1.8rem;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: no-wrap;
  white-space: nowrap;

  & button {
    padding: 1rem;
    border: 0 none;
    background: transparent;
    cursor: pointer;
    margin-top: -0.4rem;
  }
`;

const Pagination = styled.span`
  display: flex;
  flex-direction: row;
  align-items: top;
  flex-wrap: no-wrap;
`;

const MaxPage = styled.span`
  font-size: 1.4rem;
  margin: 0.2rem 0 0 0.3rem;
`;

type ImageGallery = {
  title: string;
  country?: string;
  region?: string;
  date?: string;
  content?: string;
  thumbSrc?: string;
  images: string[];
};

export function ImageGallery({ title, images = [] }: ImageGallery) {
  const maxIndex = images && images.length ? images.length - 1 : 0;
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || !images.length) {
    return null;
  }

  return (
    <Container>
      <WrapClose>
        <Link to="/around-the-world">&times;</Link>
      </WrapClose>
      <Menu>
        <WrapTitle>
          <Title>{title}</Title>
        </WrapTitle>
        <WrapPagination>
          <button
            onClick={() =>
              setCurrentIndex((index) => (index > 0 ? index - 1 : 0))
            }
          >
            ←
          </button>
          <Pagination>
            {currentIndex + 1} / <MaxPage>{maxIndex + 1}</MaxPage>
          </Pagination>
          <button
            onClick={() =>
              setCurrentIndex((index) =>
                index < maxIndex ? index + 1 : maxIndex
              )
            }
          >
            →
          </button>
        </WrapPagination>
      </Menu>

      <img src={`${images[currentIndex]}=w1800`} />
    </Container>
  );
}
