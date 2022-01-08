import { Link } from "gatsby";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  inset: 0;
  background: #000;
  overflow: auto;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const WrapClose = styled.div`
  position: fixed;
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
  position: fixed;
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

const Title = styled.button`
  border: 0 none;
  background: transparent;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font: inherit;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
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

const WrapThumbs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 9rem 3rem 3rem;
  margin: -0.8rem;
  justify-content: center;
`;

const WrapThumb = styled.button`
  border: 0 none;
  background: #222;
  width: 16rem;
  height: 16rem;
  padding: 0;
  margin: 0.8rem;
  transition: transform 0.2s, opacity 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

type ImageGallery = {
  title: string;
  country?: string;
  region?: string;
  date?: string;
  content?: string;
  thumbSrc?: string;
  images: string[];
  currentIndex?: number;
  setCurrentIndex: (number) => void;
};

export function ImageGallery({
  title,
  images = [],
  currentIndex,
  setCurrentIndex,
}: ImageGallery) {
  const maxIndex = images && images.length ? images.length : 0;

  if (!images || !images.length) {
    return null;
  }

  if (!currentIndex) {
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
            <Pagination>Overview</Pagination>
            <button onClick={() => setCurrentIndex(1)}>→</button>
          </WrapPagination>
        </Menu>

        <WrapThumbs>
          {images.map((imageSrc, index) => (
            <WrapThumb
              key={imageSrc}
              onClick={() => setCurrentIndex(index + 1)}
            >
              <img
                src={`${imageSrc}=w190`}
                alt={`${title} - Image ${index + 1} of ${maxIndex}`}
              />
            </WrapThumb>
          ))}
        </WrapThumbs>
      </Container>
    );
  }

  return (
    <Container>
      <WrapClose>
        <Link to="/around-the-world" title="Back to the map">
          &times;
        </Link>
      </WrapClose>
      <Menu>
        <WrapTitle>
          <Title onClick={() => setCurrentIndex(0)} title="Go to overview">
            {title}
          </Title>
        </WrapTitle>
        <WrapPagination>
          <button
            onClick={() => setCurrentIndex(currentIndex - 1)}
            title="Go to previous image"
          >
            ←
          </button>
          <Pagination>
            {currentIndex} / <MaxPage>{maxIndex}</MaxPage>
          </Pagination>
          {currentIndex < maxIndex && (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              title="Go to next image"
            >
              →
            </button>
          )}
        </WrapPagination>
      </Menu>

      <img
        key={currentIndex}
        src={`${images[currentIndex - 1]}=w1800`}
        alt={`${title} - Image ${currentIndex} of ${maxIndex}`}
      />
    </Container>
  );
}
