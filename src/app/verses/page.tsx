import Layout from "@/components/Layout";
import { RootVerses, Verse } from "./types";
import "./index.css";
import { enBooksOptions } from "../constants";
import { LuBookX } from "react-icons/lu";
import { MdOutlineLocalLibrary } from "react-icons/md";
import Link from "next/link";
import PrintVerse from "../chapters/PrintVerse";
import { Metadata } from "next";

export const revalidate = 0;

interface SearchParamsProp {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  searchParams,
}: SearchParamsProp): Promise<Metadata> {
  const { verse } = searchParams;

  return {
    title: `${verse?.[0].toString().toUpperCase()}${verse
      ?.toString()
      .slice(1)} | Versespot`,
  };
}

export default async function Page({ searchParams }: SearchParamsProp) {
  const { abbrev, verse, version } = searchParams;
  const isRandom = verse === "random";

  const searchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.BIBLIA_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ search: verse, version }),
  };

  const randomOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.BIBLIA_TOKEN}`,
    },
  };

  const response = await fetch(
    isRandom
      ? `https://www.abibliadigital.com.br/api/verses/${version}${
          abbrev ? "/" : ""
        }${abbrev || ""}/random`
      : "https://www.abibliadigital.com.br/api/verses/search",
    isRandom
      ? { ...randomOptions, cache: "no-store" }
      : { ...searchOptions, cache: "no-store" }
  );

  const verses: RootVerses | Verse = await response.json();

  return (
    <Layout>
      <div className="flex justify-center flex-col">
        <h2 className="font-manrope font-bold text-2xl mb-10">
          Results for {`"${isRandom ? "Random verse" : verse}"`}
        </h2>
        <div
          id="print"
          className={`bg-blue-2 text-white md:aspect-video md:h-90vh h-screen overflow-scroll snap-mandatory snap-y verses-container relative`}
        >
          {"verses" in verses ? (
            verses.verses.length < 1 ? (
              <div className="w-full h-full flex justify-center items-center flex-col">
                <LuBookX size={30} />
                <p className="text-2xl font-normal mt-2 mb-4">
                  Verse not found
                </p>
                <Link href="/" style={{ textDecoration: "underline" }}>
                  Seach again
                </Link>
              </div>
            ) : (
              verses.verses.map((v) => (
                <section
                  key={v.text}
                  className={`h-full snap-center p-10 flex flex-col justify-center relative verse-section ${
                    v.book.testament === "NT" ? "nt" : "vt"
                  }`}
                >
                  <div
                    className="absolute z-10 right-5 top-3 flex gap-3"
                    id={`opts${v.text}`}
                  >
                    <PrintVerse opt={v.text} />
                    <Link
                      href={`/chapters/?chapter=${v.chapter}&verse=${v.number}&abbrev=${v.book.abbrev.pt}&version=${version}`}
                    >
                      <MdOutlineLocalLibrary size={35} />
                    </Link>
                  </div>
                  <h3 className="font-bold text-2xl font-manrope uppercase">
                    {
                      enBooksOptions.data.find(
                        (b) => b.value === v.book.abbrev.pt
                      )?.label
                    }{" "}
                    {v.chapter}:{v.number}
                  </h3>
                  <p className="text-2xl font-normal mt-4">{v.text}</p>
                </section>
              ))
            )
          ) : (
            <section
              key={verses.text}
              className={`h-full snap-center p-10 flex flex-col justify-center relative verse-section ${
                verses.book.testament === "NT" ? "nt" : "vt"
              }`}
            >
              <div
                className="absolute z-10 right-5 top-3 flex gap-3"
                id={`opts${verses.text}`}
              >
                <PrintVerse opt={verses.text} />
                <Link
                  href={`/chapters/?chapter=${verses.chapter}&verse=${verses.number}&abbrev=${verses.book.abbrev.pt}&version=${version}`}
                >
                  <MdOutlineLocalLibrary size={35} />
                </Link>
              </div>
              <h3 className="font-bold text-2xl font-manrope uppercase">
                {
                  enBooksOptions.data.find(
                    (b) => b.value === verses.book.abbrev.pt
                  )?.label
                }{" "}
                {verses.chapter}:{verses.number}
              </h3>
              <p className="text-2xl font-normal mt-4">{verses.text}</p>
            </section>
          )}
          {"verses" in verses && verses.verses.length > 1 && (
            <div className="absolute bottom-12 right-0 left-0">
              <span className="scroll block"></span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
