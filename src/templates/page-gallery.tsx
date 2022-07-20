import { graphql, navigate } from "gatsby";
import { parse } from "query-string";

import { SEO } from "../components/seo";
import { ImageGallery } from "../components/image-gallery";
import { useCallback } from "react";

export default function PageGalleryTemplate({
  data,
  location,
}: {
  data: any;
  location: any;
}) {
  const post = data.markdownRemark;
  const qs = parse(location.search);

  const currentIndex = qs.image ? parseInt(qs.image as string) : 0;
  const setCurrentIndex = useCallback((index) => {
    navigate(index ? `${location.pathname}?image=${index}` : location.pathname);
  }, []);

  return (
    <>
      <SEO
        title={`${post.frontmatter.place} - ${post.frontmatter.country}`}
        slug={post.fields.slug}
        image="preview.png"
      />

      <ImageGallery
        title={post.frontmatter.place}
        country={post.frontmatter.country}
        region={post.frontmatter.region}
        date={post.frontmatter.date}
        content={post.html}
        thumbSrc={post.frontmatter.thumb}
        images={post.frontmatter.images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </>
  );
}

export const pageQuery = graphql`
  query GalleryBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        country
        region
        place
        type
        date(formatString: "MMMM, YYYY")
        thumb
        images
      }
      fields {
        slug
      }
    }
  }
`;
