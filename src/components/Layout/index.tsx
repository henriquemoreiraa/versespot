"use client";

import { PropsWithChildren } from "react";
import NavBar from "../NavBar";
import ErrorBoundary from "@/components/ErrorBoundary/index";
interface LayoutProps {
  dontShowLogo?: boolean;
}

export default function Layout({
  children,
  dontShowLogo,
}: LayoutProps & PropsWithChildren) {
  return (
    <ErrorBoundary>
      <NavBar dontShowLogo={dontShowLogo} />
      <div className="sm:px-24 p-5 pt-0 pb-4 max-w-screen-xl w-full text-black-1">
        {children}
      </div>
    </ErrorBoundary>
  );
}
