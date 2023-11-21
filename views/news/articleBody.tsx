import dynamic from "next/dynamic";
import { Fragment } from "react";
import Date from "../../components/date";
import Pill from "../../components/pill";
import Prose from "../../components/Prose";
import { renderRichTextWithImages } from "../../lib/rich-text";
import { ArticleInterface } from "../../types/shared";

const ShareButton = dynamic(() => import("../../components/shareButton"));

export default function ArticleBody({
  title,
  date,
  subtitle,
  content,
  slug,
  articleType,
  author,
}: ArticleInterface) {
  return (
    <Fragment>
      <section className="news bg-white dark:bg-black dark:text-white dark:border-b-2 dark:border-white dark:lg:mt-24">
        <div className="container-md p-4 sm:p-8 bg-white dark:bg-black dark:text-white dark:lg:-top-24 dark:relative dark:lg:-mb-24">
          <div className="flex flex-wrap md:flex-nowrap md:space-x-8 lg:space-x-12 justify-between">
            <Pill>
              <span className="font-serif">{articleType}</span>
            </Pill>

            <div className="w-full order-last md:order-none">
              <div className="h-3 block md:hidden" />

              <p className="text-small text-center">
                <Date dateString={date} />
              </p>

              <div className="h-6" />

              <h1 className="text-base sm:text-large text-center">{title}</h1>

              <div className="h-6" />

              <p className="font-medium text-center">{subtitle}</p>

              {author?.name && (
                <Fragment>
                  <div className="h-6" />

                  <p className="font-medium text-center">By {author.name}</p>
                </Fragment>
              )}
            </div>

            <div className="flex">
              <ShareButton
                details={{
                  title: title,
                  slug: `/news/${slug}`,
                }}
              />
            </div>
          </div>

          <div className="h-6" />

          <Prose>{renderRichTextWithImages(content)}</Prose>

          <div className="h-12 md:h-24" />
        </div>
      </section>
    </Fragment>
  );
}
