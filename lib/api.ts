import dayjs from "dayjs";
import type {
  AboutPageData,
  ArticleInterface,
  ArtistInterface,
  GenreInterface,
  NewsletterPageData,
  NextUpSection,
  ShowInterface,
  SupportPageData,
} from "../types/shared";
import {
  extractCollection,
  extractCollectionItem,
  extractPage,
  sort,
} from "../util";
import { ENDPOINT } from "./constants";

const LIMITS = 500;

export async function contentful(query: string, preview = false) {
  return fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        preview
          ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
      }`,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
}

export async function getAboutPage(preview: boolean): Promise<AboutPageData> {
  const data = await contentful(
    /* GraphQL */ `
      query {
        pageAbout(id: "z1SsoA1K4SMJryGuYjzhK", preview: ${preview}) {
          coverImage {
            sys {
              id
            }
            title
            description
            url
            width
            height
          }
          content {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  contentType
                  title
                  description
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }
    `,
    preview
  );

  return extractPage(data, "pageAbout");
}

export async function getSupportPage(
  preview: boolean
): Promise<SupportPageData> {
  const data = await contentful(
    /* GraphQL */ `
    query {
      pageSupport(id: "Aa4GRMf6fuDtkH0UhkX19", preview: ${preview}) {
        coverImage {
          sys {
            id
          }
          title
          description
          url
          width
          height
        }
        content {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                contentType
                title
                description
                url
                width
                height
              }
            }
          }
        }
      }
    }
  `,
    preview
  );

  return extractPage(data, "pageSupport");
}

export async function getNewsletterPage(
  preview: boolean
): Promise<NewsletterPageData> {
  const data = await contentful(
    /* GraphQL */ `
    query {
      pageNewsletter(id: "7t2jOQoBCZ6sGK4HgBZZ42", preview: ${preview}) {
        coverImage {
          sys {
            id
          }
          title
          description
          url
          width
          height
        }
        content {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                contentType
                title
                description
                url
                width
                height
              }
            }
          }
        }
      }
    }
  `,
    preview
  );

  return extractPage(data, "pageNewsletter");
}

export async function getNextUpSection(
  preview: boolean
): Promise<NextUpSection> {
  const data = await contentful(/* GraphQL */ `
    {
      sectionToday(id: "2bP8MlTMBYfe1paaxwwziy", preview: ${preview}) {
        content {
          json
        }
      }
    }
  `);

  return extractPage(data, "sectionToday");
}

export async function getAllArtists(
  preview: boolean,
  limit = LIMITS
): Promise<ArtistInterface[]> {
  const data = await contentful(
    /* GraphQL */ `
      query {
        artistCollection(order: name_ASC, preview: ${preview}, limit: ${limit}) {
          items {
            name
            slug
            isResident: role
            photo {
              sys {
                id
              }
              title
              description
              url
              width
              height
            }
          }
        }
      }
    `,
    preview
  );

  return extractCollection(data, "artistCollection");
}

export async function getArtistAndMoreShows(
  slug: string,
  preview: boolean
): Promise<{
  artist: ArtistInterface;
  relatedShows: ShowInterface[];
}> {
  const today = dayjs();

  const entry = await contentful(/* GraphQL */ `
    query {
      artistCollection(where: { slug: "${slug}" }, limit: 1, preview: ${preview}) {
        items {
          name
          slug
          photo {
            sys {
              id
            }
            title
            description
            url
            width
            height
          }
          coverImagePosition
          content {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  contentType
                  title
                  description
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  `);

  const allShows = await getAllShows(preview);

  const relatedShows = allShows.filter((show) => {
    const isRelatedArtistFilter =
      show.artistsCollection.items.filter((artist) => artist?.slug === slug)
        .length > 0;

    const isPastFilter = dayjs(show.date).isBefore(today);

    return isRelatedArtistFilter && isPastFilter;
  });

  return {
    artist: extractCollectionItem(entry, "artistCollection"),
    relatedShows,
  };
}

export async function getAllShows(
  preview: boolean,
  limit = LIMITS
): Promise<ShowInterface[]> {
  const data = await contentful(
    /* GraphQL */ `
      query {
        showCollection(order: date_DESC, where: { artistsCollection_exists: true }, preview: ${preview}, limit: ${limit}) {
          items {
            title
            date
            slug
            mixcloudLink
            isFeatured
            coverImage {
              sys {
                id
              }
              title
              description
              url
              width
              height
            }
            coverImagePosition
            artistsCollection(limit: 9) {
              items {
                name
                slug
              }
            }
            genresCollection(limit: 9) {
              items {
                name
              }
            }
            content {
              json
            }
          }
        }
      }
    `,
    preview
  );

  return extractCollection(data, "showCollection");
}

export async function getUpcomingAndPastShows(
  preview: boolean,
  limit = LIMITS
) {
  const today = dayjs();

  const shows = await getAllShows(preview, limit);

  /**
   * Upcoming & Featured
   */
  const upcoming = shows
    .sort((a, b) => (dayjs(a.date).isBefore(b.date) ? -1 : 1))
    .filter((show) => dayjs(show.date).isAfter(today) && show.isFeatured);

  /**
   * All Past Shows
   */
  const past = shows
    .sort((a, b) => (dayjs(a.date).isAfter(b.date) ? -1 : 1))
    .filter((show) => dayjs(show.date).isBefore(today));

  return {
    upcoming,
    past,
  };
}

export async function getGenres(preview: boolean) {
  const { past } = await getUpcomingAndPastShows(preview);

  const allShowGenres = past
    .flatMap((show) => show.genresCollection.items)
    .filter((genre) => Boolean(genre?.name))
    .map((genre) => genre.name);

  const uniqueGenres = Array.from(new Set(allShowGenres)).sort(sort.alpha);

  return uniqueGenres;
}

export async function getFeaturedShows(
  preview: boolean
): Promise<ShowInterface[]> {
  const data = await contentful(
    /* GraphQL */ `
      query {
        showCollection(
          order: date_DESC
          where: { isFeatured: true }
          preview: ${preview}
        ) {
          items {
            title
            date
            slug
            mixcloudLink
            isFeatured
            coverImage {
              sys {
                id
              }
              title
              description
              url
              width
              height
            }
            coverImagePosition
            artistsCollection(limit: 9) {
              items {
                name
                slug
              }
            }
            genresCollection(limit: 9) {
              items {
                name
              }
            }
            content {
              json
            }
          }
        }
      }
    `,
    preview
  );

  const featuredShows = extractCollection<ShowInterface>(
    data,
    "showCollection"
  );

  const pastFeaturedShows = featuredShows
    .filter((show) => dayjs(show.date).isBefore(dayjs()))
    .slice(0, 15);

  return pastFeaturedShows;
}

export async function getShowAndMoreShows(slug: string, preview: boolean) {
  const today = dayjs();

  const res = await contentful(
    /* GraphQL */ `
      query {
        showCollection(
          where: { slug: "${slug}" }
          order: date_DESC
          preview: ${preview}
          limit: 1
        ) {
          items {
            title
            date
            slug
            mixcloudLink
            isFeatured
            coverImage {
              sys {
                id
              }
              title
              description
              url
              width
              height
            }
            coverImagePosition
            artistsCollection(limit: 9) {
              items {
                name
                slug
              }
            }
            genresCollection(limit: 9) {
              items {
                name
              }
            }
            content {
              json
              links {
                assets {
                  block {
                    sys {
                      id
                    }
                    contentType
                    title
                    description
                    url
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    `,
    preview
  );

  const entry: ShowInterface = extractCollectionItem(res, "showCollection");
  const entryGenres = entry.genresCollection.items.map((genre) => genre.name);

  const allShows = await getAllShows(preview);

  const relatedShows = allShows
    .filter((filterShow) => {
      const currentShowGenres = filterShow.genresCollection.items.map(
        (genre) => genre.name
      );

      const isRelatedShowFilter =
        currentShowGenres.filter((genre) => entryGenres.includes(genre))
          .length > 0;

      const isNotOwnShow = filterShow.slug !== slug;

      const isPastFilter = dayjs(filterShow.date).isBefore(today);

      return isNotOwnShow && isRelatedShowFilter && isPastFilter;
    })
    .slice(0, 3);

  return {
    show: entry,
    relatedShows,
  };
}

export async function getAllArticles(
  preview: boolean,
  limit = LIMITS
): Promise<ArticleInterface[]> {
  const data = await contentful(
    /* GraphQL */ `
      query {
        articleCollection(order: date_DESC, preview: ${preview}, limit: ${limit}) {
          items {
            title
            subtitle
            articleType
            date
            slug
            coverImage {
              sys {
                id
              }
              title
              description
              url
              width
              height
            }
            coverImagePosition
            content {
              json
            }
          }
        }
      }
    `,
    preview
  );

  return extractCollection(data, "articleCollection");
}

export async function getLatestArticles(
  preview: boolean
): Promise<ArticleInterface[]> {
  const data = await contentful(
    /* GraphQL */ `
      query {
        articleCollection(
          order: date_DESC
          where: { isFeatured: false }
          limit: 3
          preview: ${preview}
        ) {
          items {
            title
            subtitle
            articleType
            date
            slug
            coverImage {
              sys {
                id
              }
              title
              description
              url
              width
              height
            }
            coverImagePosition
            content {
              json
            }
          }
        }
      }
    `,
    preview
  );

  return extractCollection(data, "articleCollection");
}

export async function getFeaturedArticles(
  preview: boolean
): Promise<ArticleInterface[]> {
  const data = await contentful(
    /* GraphQL */ `
      query {
        articleCollection(
          where: { isFeatured: true }
          order: date_DESC
          limit: 3
          preview: ${preview}
        ) {
          items {
            title
            subtitle
            articleType
            date
            slug
            coverImage {
              sys {
                id
              }
              title
              description
              url
              width
              height
            }
            coverImagePosition
            content {
              json
            }
          }
        }
      }
    `,
    preview
  );

  return extractCollection(data, "articleCollection");
}

export async function getArticleAndMoreArticles(
  slug: string,
  preview: boolean
): Promise<{
  article: ArticleInterface;
  relatedArticles: ArticleInterface[];
}> {
  const entry = await contentful(
    /* GraphQL */ `
      query {
        articleCollection(
          limit: 1
          where: { slug: "${slug}" }
          order: date_DESC
          preview: ${preview}
        ) {
          items {
            title
            subtitle
            articleType
            date
            slug
            coverImage {
              sys {
                id
              }
              title
              description
              url
              width
              height
            }
            coverImagePosition
            content {
              json
              links {
                assets {
                  block {
                    sys {
                      id
                    }
                    contentType
                    title
                    description
                    url
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    `,
    preview
  );

  const allArticles = await getAllArticles(preview);

  const relatedArticles = allArticles
    .filter((article) => {
      const isNotOwnArticle = article.slug !== slug;

      return isNotOwnArticle;
    })
    .slice(0, 3);

  return {
    article: extractCollectionItem(entry, "articleCollection"),
    relatedArticles,
  };
}

export async function getPaths() {
  const data = await contentful(/* GraphQL */ `
    {
      shows: showCollection(limit: 1000) {
        items {
          slug
        }
        total
      }
      artists: artistCollection(limit: 1000) {
        items {
          slug
        }
        total
      }
      articles: articleCollection(limit: 1000) {
        items {
          slug
        }
        total
      }
    }
  `);

  return {
    shows: extractCollection<{ slug: string }>(data, "shows"),
    articles: extractCollection<{ slug: string }>(data, "articles"),
    artists: extractCollection<{ slug: string }>(data, "artists"),
  };
}
