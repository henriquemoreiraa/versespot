import Select from "../Select";
import Us from "../../../public/us.png";
import Br from "../../../public/br.png";
import LogoSmall from "../../../public/logo_small.png";
import Image from "next/image";
import Link from "next/link";

interface NavBarProps {
  dontShowLogo?: boolean;
}

export default function NavBar({ dontShowLogo }: NavBarProps) {
  return (
    <nav className="w-full flex justify-center">
      <div
        className={`max-w-screen-xl w-full flex justify-between items-center ${
          !dontShowLogo ? "pt-1" : "pt-3"
        } px-5`}
      >
        {!dontShowLogo ? (
          <Link href="/">
            <Image width={34} src={LogoSmall} alt="versespot logo small" />
          </Link>
        ) : (
          <div />
        )}
        <Select
          options={{
            type: "language",
            data: [{ label: "en", value: "en", image: Us }],
          }}
          defaultSelected={{ label: "en", value: "en", image: Us }}
          width="w-24"
        />
      </div>
    </nav>
  );
}
