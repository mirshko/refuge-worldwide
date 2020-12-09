import useSWR from "swr";
import { ShowInterface } from "../types/shared";
import useShows from "./useShows";

async function getGenres(_: any, allShows: ShowInterface[]) {
  const allShowGenres = allShows
    .flatMap((show) => show.genresCollection.items)
    .map((genre) => genre.name);

  const uniqueGenres = Array.from(new Set(allShowGenres));

  return uniqueGenres;
}

export default function useGenres(preview = false) {
  const { data: allShows } = useShows(preview);

  return useSWR(["AllGenres", allShows, preview], getGenres);
}