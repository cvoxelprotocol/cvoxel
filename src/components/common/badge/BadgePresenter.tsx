import {FC} from "react";

type Props = {
  text: string,
  type?: "default",
  color?: "default" | "dark-gray" | "Ongoing" | "Completed" | "Canceled"
};

const BadgePresenter:FC<Props> = (Props) => {
  let badgeColor:string = "text-glass bg-onglass";
  if(Props.color == "dark-gray") badgeColor = "text-oncard bg-card";
  else if(Props.color == "Canceled") badgeColor = "text-oncard bg-suspended";
  else if(Props.color == "Ongoing") badgeColor = "text-oncard bg-progress";
  else if(Props.color == "Completed") badgeColor = "text-oncard bg-done";


  return (
    Props.text == "" ? <></> :
    <div className={`inline-block h-fit w-fit mx-1 my-[2px] py-[1px] px-3  text-xs text-center ${badgeColor} rounded-full`}>
      {Props.text}
    </div>
  )
};


export default BadgePresenter;