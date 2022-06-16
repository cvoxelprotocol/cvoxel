import { FC,ReactNode } from "react";

type Props = {
  children: ReactNode
};

const CVoxelsPresenter: FC<Props> = ({children}) => {
  return (
    <>
      <div className="relative flex flex-1 w-full max-w-[820px] h-full overflow-scroll mx-auto">
        <ul className="flex flex-col h-full w-full max-w-[820px] items-start justify-start overflow-scroll mx-auto">
          {children}
        </ul>
      </div>
    </>
  );
};

export default CVoxelsPresenter;
