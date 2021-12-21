import styled from "styled-components";

import { COLORS } from "../theme";

const Container = styled.div`
  width: 100%;
  max-width: 45rem;
  padding: 1.4rem;
  background: ${COLORS.GREY.LIGHT};
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
`;

const BookCover = styled.div<{ cover: string }>`
  width: 7rem;
  height: 10.6rem;
  background: ${COLORS.GREY.DARK} center center no-repeat;
  background-size: cover;
  margin-right: 1.8rem;
  background-image: ${(p) => (p.cover ? `url(${p.cover})` : "none")};
`;

const WrapMeta = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  color: ${COLORS.GREY.DARK};
  line-height: 1.2;
`;

const Title = styled.h2`
  font-family: Staatliches;
  font-size: 1.6rem;
  margin: 0;
  padding: 0.6rem 0 0.2rem;
`;

const Author = styled.p`
  font-size: 1.4rem;
  margin: 0;
  padding: 0.2rem 0;
`;

type BookPreviewProps = {
  author: string;
  title: string;
  cover: string;
};

export function BookPreview({ author, title, cover }: BookPreviewProps) {
  return (
    <Container>
      <BookCover cover={cover} />
      <WrapMeta>
        <Title>{title}</Title>
        {author && <Author>by {author}</Author>}
      </WrapMeta>
    </Container>
  );
}
