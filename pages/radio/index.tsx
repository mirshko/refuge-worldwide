import { InferGetStaticPropsType } from "next";
import Layout from "../../components/layout";
import PageMeta from "../../components/seo/page";
import { getPastShows } from "../../lib/contentful/client";
import {
  getAllGenres,
  getUpcomingShows,
  RADIO_SHOWS_PAGE_SIZE,
  getCollections,
} from "../../lib/contentful/pages/radio";
import AllShows from "../../views/radio/allShows";
import NextShows from "../../views/radio/nextShows";
import Pill from "../../components/pill";
import Carousel from "../../components/carousel";
export async function getStaticProps({ preview = false }) {
  const upcomingShows = await getUpcomingShows(preview);

  const pastShows = await getPastShows(RADIO_SHOWS_PAGE_SIZE, 0, []);

  const genres = await getAllGenres();

  const collections = await getCollections(preview);

  return {
    props: {
      preview,
      upcomingShows,
      genres: genres.map((genre) => genre.name),
      pastShows,
      collections,
    },
  };
}

export default function RadioPage({
  genres,
  pastShows,
  preview,
  upcomingShows,
  collections,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout preview={preview}>
      <PageMeta title="Radio | Refuge Worldwide" path="radio/" />

      <h1 hidden>Radio</h1>

      {upcomingShows.length > 0 && <NextShows upcomingShows={upcomingShows} />}
      <section className="border-b-2">
        <Carousel items={collections} type="collection" title="Collections" />
      </section>
      <AllShows genres={genres} pastShows={pastShows} />
    </Layout>
  );
}
