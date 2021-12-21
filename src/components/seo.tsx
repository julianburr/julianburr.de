import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

type SEOProps = {
  description?: string;
  lang?: string;
  meta?: { name: string; content: string }[];
  keywords?: string[];
  title?: string;
  image?: string;
  slug?: string;
};

export function SEO({
  description,
  lang = "en",
  meta = [],
  keywords = [],
  title,
  image = "preview.png",
  slug,
}: SEOProps) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s — ${site.siteMetadata.title}`}
      meta={[
        {
          name: "google-site-verification",
          content: "qPoVn1qQ5JXGs4qkjcff2qSBPUlkTSzQXA8w-wT_m18",
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: `https://julianburr.de/${image}`,
        },
        {
          property: `twitter:image`,
          content: `https://julianburr.de/${image}`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
  );
}
