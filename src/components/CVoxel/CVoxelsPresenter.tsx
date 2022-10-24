import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const CVoxelsPresenter: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="relative flex flex-1 w-full max-w-[820px] h-full overflow-scroll mx-auto px-4 md:px-0">
        <div className="h-[calc(100vh-5rem-3rem)] lg:h-[calc(100vh-5rem-2.5rem-3rem)] w-full max-w-[744px] items-start justify-start mx-auto py-6 ">
          {children}
        </div>
      </div>
    </>
  );
};

export default CVoxelsPresenter;
