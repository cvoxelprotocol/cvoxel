import {FC} from "react";

export const Footer:FC = () => {

  return (
    <>
      <footer className={"bottom-0 right-0 left-0 block py-4 bg-white dark:bg-darkgray transition-spacing duration-500 ease-in-out md:ml-0"}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="px-2">
              <div className="text-sm text-gray-600 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <a　className="text-gray-600 hover:text-gray-800 text-sm font-semibold py-1">C-Voxel.</a>
              </div>
            </div>
            <div className="md:flex">
              <p　className="px-2 py-1">
                <a className="text-sm text-gray-600" href="" target="_blank">Terms</a>
              </p>
              <p　className="px-2 py-1">
                <a className="text-sm text-gray-600" href="" target="_blank">Privacy</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}