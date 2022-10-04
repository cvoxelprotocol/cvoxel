import { FC } from "react";

export const Footer: FC = () => {
  return (
    <>
      <footer
        className={
          "block py-4 bg-light-background dark:bg-dark-background transition-spacing duration-500 ease-in-out md:ml-0"
        }
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="px-2">
              <div className="text-sm text-gray-600 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <a className="text-gray-600 hover:text-gray-800 text-sm font-semibold py-1">
                  VESS.
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
