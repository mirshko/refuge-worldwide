import Image from "next/image";
import Link from "next/link";
import { UpcomingShowType } from "../lib/contentful/pages/radio";
import loaders from "../lib/loaders";
import { formatArtistNames, parseGenres } from "../util";
import Badge from "./badge";
import Date from "./date";
import Pill from "./pill";

export default function UpcomingShowPreview({
  coverImage,
  title,
  artistsCollection,
  slug,
  genresCollection,
  date,
}: UpcomingShowType) {
  const genres = parseGenres(genresCollection);

  const artists = formatArtistNames(artistsCollection.items);

  // remove artists from title
  const upcomingShowTitle = title.split(" | ")[0];

  return (
    <Link href={`/radio/${slug}`} aria-labelledby={`upcoming-${slug}`}>
      <article>
        <div className="flex w-full">
          <Image
            key={coverImage.sys.id}
            src={coverImage.url}
            loader={loaders.contentful}
            width={590}
            height={335}
            alt={title}
            className="bg-black/10 object-cover object-center aspect-video"
          />
        </div>

        <div className="h-4" />

        <div className="flex">
          <Pill size="small">
            <span className="font-serif text-tiny sm:text-small">
              <Date dateString={date} formatString="DD MMM" />
            </span>
          </Pill>
        </div>

        <div className="h-2" />

        <h2 id={`upcoming-${slug}`} className="text-base sm:text-large">
          {upcomingShowTitle}
        </h2>

        <div className="h-2" />

        <p>{artists}</p>

        <div className="h-3" />

        <ul className="w-full flex flex-wrap gap-2">
          {genres.map((genre, i) => (
            <li key={i}>
              <Badge text={genre} />
            </li>
          ))}
        </ul>
      </article>
    </Link>
  );
}
