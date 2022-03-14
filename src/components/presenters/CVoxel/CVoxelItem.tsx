import { FC, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { CVoxel, CVoxelItem as ICVoxelItem, CVoxelMetaDraft } from "@/interfaces";
import { useCVoxelRecord } from "@/hooks/useCVoxel";
import { useStateSelectedItem } from "@/recoilstate";
import Button from '@/components/presenters/common/button/Button'
import { useConnection } from "@self.id/framework";

type Props = {
  did: string
  item: ICVoxelItem
  offchainItems?: CVoxelMetaDraft[]
  onClickUpdate?: (item: ICVoxelItem) => void
};

export const CVoxelItem: FC<Props> = ({item, did, offchainItems, onClickUpdate}) => {
  const [selectedItem, setSelectedItem] = useStateSelectedItem();
  const [connection, connect] = useConnection();
  const [selectedStyle, setSelectedStyle] = useState("");
  const [unselectedStyle, setUnselectedStyle] = useState("");
  const cVoxelItem = useCVoxelRecord(item.id)

  // Whether this item is selected or not
  const isSelected: boolean = useMemo(() => {
    return item.id == selectedItem?.id
  }, [item.id, selectedItem]);

  useEffect(() => {
    if (isSelected == true) {
      setSelectedStyle(" scale-y-100");
      setUnselectedStyle(" opactiy-0")
    } else if (isSelected == false) {
      setSelectedStyle(" scale-y-0");
      setUnselectedStyle(" opacity-100")
    }
  }, [isSelected]);

  const handleClick = () => {
    if(cVoxelItem.content) setSelectedItem({...cVoxelItem.content, id: item.id})
  };

  const updatable = useMemo(() => {
    if(cVoxelItem.content && cVoxelItem.content?.toSig && cVoxelItem.content?.fromSig) return false
    const item = offchainItems?.find(item => item.txHash.toLowerCase() === cVoxelItem.content?.txHash.toLowerCase())
    if(!item) return false
    return item.fromSig && !cVoxelItem.content?.fromSig
  },[offchainItems, cVoxelItem])

  const handleUpdate = async() => {
    console.log("connection", connection)
    if(connection.status !== "connected") {
      await connect()
      return
    }
    const item = offchainItems?.find(item => item.txHash === cVoxelItem.content?.txHash)
    if(!(item && cVoxelItem.content)) return false
    if(updatable && item.fromSig) {
      const newCVoxel:CVoxel = {...cVoxelItem.content, fromSig: item.fromSig}
      console.log("newCVoxel", newCVoxel)
      await cVoxelItem.update(newCVoxel)
    }    
  }


  return (
    <>
    {!(isSelected && selectedItem) ? (
        <li className={"relative z-10 flex w-full items-center my-4 transition font-medium"} onClick={handleClick}>
          <div
            className={"relative flex w-full h-fit transition"}
          >
          <div className="md:flex w-full space-x-2 items-center">
            <div className="flex justify-center items-center h-20 md:h-20 w-full md:w-20 ">
              <div className="relative flex justify-center items-center w-14 h-14 md:w-16 md:h-16">
                <Image src="/voxel.png" layout="fill" alt="voxel"/>
              </div>
            </div>
            <div className="w-full rounded-lg shadow-lg bg-white text-left px-5 py-3 ">
              <p className="text-primary">{item.issuedTimestamp}</p>
              <h6 className="mb-3 text-xl font-bold text-black">
                {item.summary}
              </h6>
              <p>{cVoxelItem.content && cVoxelItem.content.toSig && cVoxelItem.content.fromSig ? "Verified": "Not Verified"}</p>
              <p className="text-secondary">{updatable ? "You get Verified": ""}</p>
            </div>
          </div>
        </div>
      </li>
      ): (
        <li className={"relative z-10 flex w-full items-center my-4 transition"}>
          <div
            className={
              "relative flex w-full h-fit transition" +
              selectedStyle
            }
          >
            
            <div className="md:flex w-full space-x-2 items-center font-medium">
              <div className="flex justify-center items-center h-20 md:h-20 w-full md:w-20 ">
                <div className="relative flex justify-center items-center w-14 h-14 md:w-16 md:h-16">
                  <Image src="/voxel.png" layout="fill" alt="voxel"/>
                </div>
              </div>
              <div className="h-fit w-full rounded-lg shadow-lg bg-white text-left px-5 py-3 ">
              <div className="flex w-full items-center justify-start space-x-2">
                <p className="text-primary text-sm w-fit">{item.issuedTimestamp}</p>
                <span
                    className={"block px-2 py-0.5 text-xs rounded-full font-light w-max " + (cVoxelItem.content && cVoxelItem.content.toSig && cVoxelItem.content.fromSig ? "text-[#53B15C] bg-green-200": "text-[#E83838] bg-red-300")}>
                    {cVoxelItem.content && cVoxelItem.content.toSig && cVoxelItem.content.fromSig ? "Verified": "Not Verified"}
                </span>
                <p></p>
              </div>
                <h6 className="text-xl text-black">
                  {selectedItem.summary}
                </h6>
                <p className="text-base text-gray-500  px-1">
                  {selectedItem?.detail}
                </p>
                <div className="py-5">
                  <p className="text-base text-black">
                    Deliverable
                  </p>
                  <p className="text-xs text-secondary">
                    {selectedItem?.deliverable}
                  </p>
                </div>
                {updatable && onClickUpdate && (
                  <Button
                  size="medium"
                  variant="contained"
                  color="secondary"
                  text="Update"
                  buttonType="button"
                  onClick={() => handleUpdate()}
              />
                )}
              </div>
            </div>
          </div>
        </li>
      )}
    </>
  );
};