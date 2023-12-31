import Layout from "@/components/Layout";
import { RootChapter } from "../verses/types";
import { enBooksOptions } from "../constants";
import "../verses/index.css";
import { Metadata } from "next";

interface SearchParamsProp {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  searchParams,
}: SearchParamsProp): Promise<Metadata> {
  const { abbrev, chapter } = searchParams;

  return {
    title: `${abbrev
      ?.toString()
      .toUpperCase()} ${chapter?.toString()} | Versespot`,
  };
}

export default async function Page({ searchParams }: SearchParamsProp) {
  const { abbrev, version, chapter } = searchParams;

  const searchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.BIBLIA_TOKEN}`,
    },
  };

  const response = await fetch(
    `https://www.abibliadigital.com.br/api/verses/${version}/${abbrev}/${chapter}`,
    { ...searchOptions, cache: "no-store" }
  );

  const verses: RootChapter = await response.json();

  return (
    <Layout>
      <div className="flex justify-center flex-col">
        <div
          className={`bg-blue-2 text-white md:aspect-video md:h-90vh h-screen overflow-scroll verses-container relative`}
        >
          <section
            key={verses.chapter.number}
            className={`h-full  p-10 relative verse-section`}
          >
            <h3 className="font-bold text-2xl font-manrope uppercase">
              {
                enBooksOptions.data.find(
                  (b) => b.value === verses.book.abbrev.pt
                )?.label
              }{" "}
              Chapter {verses.chapter.number}
            </h3>
            {verses.verses.map((v) => (
              <p key={v.number} className="text-2xl font-normal mt-4">
                <span className="text-3xl mr-2">{v.number}</span> {v.text}
              </p>
            ))}
          </section>
        </div>
      </div>
    </Layout>
  );
}
