import { NextPage } from "next";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";

const scrollTop = (): number => {
  console.log("pageY0:" + window.pageYOffset);
  console.log("scrollTop:" + document.documentElement.scrollTop);

  return Math.max(
    window.pageYOffset,
    document.documentElement.scrollTop,
    document.body.scrollTop,
    window.scrollY
  );
};

const IntroV2: NextPage = () => {
  const [scrollPos, setScrollPos] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onScroll = (): void => {
    setScrollPos(scrollRef.current == null ? 2 : scrollRef.current.scrollTop);
    console.log(scrollPos);
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll, true);
    return (): void => document.removeEventListener("scroll", onScroll, true);
  });

  return (
    <div ref={scrollRef}>
      aaa aaa
      <div className="h-[10000px] w-full bg-gradient-to-b to-blue-50 from-teal-100">
        <div className=" fixed">{scrollPos}</div>
      </div>
    </div>
  );
};

export default IntroV2;
