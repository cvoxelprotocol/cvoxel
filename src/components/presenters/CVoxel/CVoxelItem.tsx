import { FC, useMemo } from "react";
import Image from "next/image";
import { CVoxel, CVoxelItem as ICVoxelItem, CVoxelMetaDraft } from "@/interfaces";
import { useCVoxelRecord } from "@/hooks/useCVoxel";
import { useStateSelectedItem } from "@/recoilstate";
import Button from '@/components/presenters/common/button/Button'
import { useConnection } from "@self.id/framework";
import { formatBigNumber } from "@/utils/ethersUtil";
import { shortHash } from "@/utils/tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

type Props = {
  did: string
  item: ICVoxelItem
  offchainItems?: CVoxelMetaDraft[]
};

export const CVoxelItem: FC<Props> = ({item, did, offchainItems}) => {
  const [selectedItem, setSelectedItem] = useStateSelectedItem();
  const [connection, connect] = useConnection();
  const cVoxelItem = useCVoxelRecord(item.id)

  const detailItem = useMemo(() => {
    return cVoxelItem.content || null
  },[cVoxelItem.content])

  // Whether this item is selected or not
  const isSelected: boolean = useMemo(() => {
    return item.id == selectedItem?.id
  }, [item.id, selectedItem]);

  const handleClick = () => {
    if(detailItem) setSelectedItem({...detailItem, id: item.id})
  };

  const updatable = useMemo(() => {
    if(cVoxelItem.content && cVoxelItem.content?.toSig && cVoxelItem.content?.fromSig) return false
    const item = offchainItems?.find(item => item.txHash.toLowerCase() === cVoxelItem.content?.txHash.toLowerCase())
    if(!item) return false
    return item.fromSig && !cVoxelItem.content?.fromSig
  },[offchainItems, cVoxelItem])

  const handleUpdate = async() => {
    if(connection.status !== "connected") {
      await connect()
      return
    }
    const item = offchainItems?.find(item => item.txHash === cVoxelItem.content?.txHash)
    if(!(item && detailItem)) return false
    if(updatable && item.fromSig) {
      const newCVoxel:CVoxel = {...detailItem, fromSig: item.fromSig}
      await cVoxelItem.update(newCVoxel)
    }    
  }


  return (
    <>
    <li className={"relative z-10 flex w-full items-center my-4 transition cursor-pointer"} onClick={handleClick}>
          <div className={"relative flex w-full h-fit transition scale-y-100"}>
            <div className="md:flex w-full space-x-2 items-center font-medium">
              <div className="flex justify-center items-center h-20 md:h-20 w-full md:w-20 ">
                <div className="relative flex justify-center items-center w-14 h-14 md:w-16 md:h-16">
                  <Image src="/voxel.png" layout="fill" alt="voxel"/>
                </div>
              </div>
              <div className="h-fit w-full rounded-lg shadow-lg bg-white text-left px-5 py-3">
                <div className="flex items-center justify-around">
                  <div className="w-fit flex-auto pr-2">
                    <div className="flex w-full items-center justify-start space-x-2">
                      <p className="text-primary text-sm w-fit">{item.issuedTimestamp}</p>
                      <span
                          className={"block px-2 py-0.5 text-xs rounded-full font-light w-max " + (detailItem && detailItem.toSig && detailItem.fromSig ? "text-[#53B15C] bg-green-200": "text-[#E83838] bg-red-300")}>
                          {detailItem && detailItem.toSig && detailItem.fromSig ? "Verified": "Not Verified"}
                      </span>
                      <p></p>
                    </div>
                    <h6 className="text-xl text-black">
                      {detailItem ? detailItem.summary : item.summary}
                    </h6>
                    {detailItem?.detail && (
                      <>
                        {isSelected ? (
                          <p className="text-base text-gray-500  px-1">
                            {detailItem?.detail}
                          </p>
                        ): (
                            <p className="text-base text-gray-500  px-1">
                            {shortHash(detailItem?.detail, 30) }
                          </p>
                        )}
                      </>
                    )}
                    
                    <div className="py-5">
                      <p className="text-base text-black">
                        Deliverable
                      </p>
                      
                      {detailItem?.deliverable?.startsWith("http") ? (
                        <a className="flex items-center" href={`${detailItem?.deliverable}`} target="_blank" rel="noreferrer">
                          <p className="text-xs text-secondary">
                            {detailItem?.deliverable}
                            </p>
                            <FontAwesomeIcon className="w-3 h-3 ml-2" icon={faExternalLink} color={'#EFA9E0'}/>
                        </a>
                      ):(
                        <p className="text-xs text-secondary">{detailItem?.deliverable}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-1/4 flex-none">
                    <div className="">
                      {detailItem && (
                        <p className="font-medium text-lg">
                          {formatBigNumber(detailItem.value, 6)} {detailItem.tokenSymbol ? detailItem.tokenSymbol: "ETH"}
                      </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full text-right">
                  {updatable && (
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
          </div>
        </li>
    </>
  );
};