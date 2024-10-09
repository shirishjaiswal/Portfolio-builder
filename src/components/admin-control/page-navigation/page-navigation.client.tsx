"use client";

import PageTitle from "@/components/admin-control/page-title/page-title";
import Loading from "@/components/loading/loading";
import { useLoadingContextProvider } from "@/context/loading-context";
import { useEffect, useRef } from "react";
import NavigationSections from "./navigation-section";
import { useNavigationSectionContentProvider } from "@/context/navigation-section-content";
import NavigationTitles from "./navigation-titles";
import Button from "@/components/Button/button";
import { navigationSectionContentData } from "./static-data";
import localstorage from "@/utils/storage/local-storage";

const PageNavigationContentClient = () => {
  const { isLoading, updateIsLoading } = useLoadingContextProvider();
  const { navigationSectionContent, updateNavigationSectionContent, } =
    useNavigationSectionContentProvider();

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const c = localstorage.maps.getNavigationSectionContentMap();
  useEffect(() => {
    updateIsLoading(false);
     updateNavigationSectionContent(c ?? navigationSectionContentData);
  }, [updateNavigationSectionContent, updateIsLoading]);

  return (
    <>
      <div className="flex-col fixed top-16 pt-4 z-40 bg-white w-full h-28">
        <PageTitle title="Navigation Content" />
        <NavigationTitles />
        <Button
          label={"Save Changes"}
          style="primary"
          onClick={() =>
            localstorage.maps.setNavigationSectionContentMap(
              navigationSectionContent
            )
          }
          type="button"
          isActive={false}
          isDisabled={false}
        >
          <p className=" border rounded bg-slate-200 text-slate-600 font-semibold fixed right-52 top-[68px] z-20 p-1 my-4">
            Save Changes
          </p>
        </Button>
      </div>
      <div className="relative mt-20">
        <NavigationSections bottomRef={bottomRef} />
      </div>
      <div ref={bottomRef} id="bottom"></div>
      {isLoading && (
        <Loading
          spinColor="primary"
          spinSize="lg"
          label="Loading..."
          labelColor="primary"
        />
      )}
    </>
  );
};

export default PageNavigationContentClient;
