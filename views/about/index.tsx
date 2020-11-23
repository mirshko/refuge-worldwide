import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { Fragment } from "react";
import type { AboutPageData } from "../../lib/api";

export default function AboutView({ data }: { data: AboutPageData }) {
  return (
    <Fragment>
      <Image
        className="object-cover object-center"
        src={data?.coverImage?.url}
        alt={data?.coverImage?.title}
        width={1280}
        height={720}
      />

      <div>{documentToReactComponents(data?.content?.json)}</div>
    </Fragment>
  );
}
