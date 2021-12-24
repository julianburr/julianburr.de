import { graphql } from "gatsby";

import { SEO } from "../components/seo";
import { ImageGallery } from "../components/image-gallery";

export default function PageGalleryTemplate({ data }: { data: any }) {
  const post = data.markdownRemark;

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
