import Layout from "@/components/Layout";
import Image from "next/image";
import Logo from "../../public/logo.png";
import Search from "./components/Search";
import Options from "./components/Options";
import OptionsProvider from "@/contexts/OptionsContext";

export default function Home() {
  return (
    <Layout dontShowLogo>
      <main className="flex flex-col items-center gap-10">
        <div>
          <Image src={Logo} alt="verse spot" width={1012} />
          <p className="text-center sm:text-2xl font-bold text-blue-1">
            A simple way to find Bible verses. <br /> Search a verse, word,
            phrase or anything written in the Bible
          </p>
        </div>
        <OptionsProvider>
          <div className="max-w-1012 w-full mb-4">
            <div className="flex items-center mb-4">
              <p className="font-manrope font-bold text-lg">OPTIONS</p>
              <div className="border-b border-black-1 w-full ml-5" />
            </div>
            <Options />
          </div>

          <Search />
        </OptionsProvider>
      </main>
    </Layout>
  );
}
