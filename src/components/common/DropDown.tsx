import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";

type DropDownProps = {
    btnContent: React.ReactNode,
    content: React.ReactNode
}
export const DropDown:FC<DropDownProps> = ({btnContent, content}) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
          document.removeEventListener("click", handleOutsideClick);
        };
      }, []);
    
      const handleOutsideClick = (e:MouseEvent) => {
        const dom = e.target as Node;
        if (dropdownRef.current && !dropdownRef.current.contains(dom)) {
            setMenuOpen(false);
        }
      };

    return (
        <div ref={dropdownRef} className="flex justify-center">
          <div className="relative"> 
              <button className="" type="button" onClick={() => setMenuOpen(v => !v)}>     
                  {btnContent}
              </button>  
              <div className={clsx("absolute top-12 -right-0",isMenuOpen ? "block" : "hidden")}>
                {content}
              </div>
          </div>
        </div>
    )
}