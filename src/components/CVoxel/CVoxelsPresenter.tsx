import { FC } from "react";

type Props = {
  date?: string;
  title?: string;
};

const CVoxelsPresenter: FC<Props> = (Props) => {
  return (
    <>
      <div className="relative flex flex-1 w-full max-w-[820px] h-full overflow-scroll mx-auto">
        <ul className="flex flex-col h-full w-full max-w-[820px] items-start justify-start overflow-scroll mx-auto">
          {Props.children}
        </ul>
      </div>
    </>
  );
};

export default CVoxelsPresenter;
