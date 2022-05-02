import { FC, useMemo,useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { CVoxel, CVoxelItem as ICVoxelItem, CVoxelMetaDraft } from "@/interfaces";
import { useStateSelectedItem } from "@/recoilstate";
import { formatBigNumber } from "@/utils/ethersUtil";
import { shortHash } from "@/utils/tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { useUpdateCVoxel } from "@/hooks/useUpdateCVoxel";
// import { useUpdateCVoxel, useUpdateCVoxels } from "@/hooks/useUpdateCVoxel";
import { Button } from "@/components/common/button/Button";
import { getEtherService } from "@/services/Ether/EtherService";
import { CommonSpinner } from "../common/CommonSpinner";
import { useWalletAccount } from "@/hooks/useWalletAccount";
import { getExploreLink } from "@/utils/etherscanUtils";
import { convertTimestampToDateStr } from "@/utils/dateUtil";
import { shortenStr } from "@/utils/objectUtil";
import { GenreBadge } from "../common/badge/GenreBadge";
import { getGenre } from "@/utils/genreUtil";
import { TagBadge } from "../common/badge/TagBadge";
// import { useStateSelectedGenre } from "@/recoilstate/genre";
// import { GenreList } from "../Transaction/GenreList";
// import { TagForm } from "../Transaction/TagForm";

type Props = {
  did: string
  item: ICVoxelItem
  offchainItems?: CVoxelMetaDraft[]
  isOwner: boolean
};

export const CVoxelItem: FC<Props> = ({item, did, offchainItems, isOwner}) => {
  const [selectedItem, setSelectedItem] = useStateSelectedItem();
  const {cVoxelItem, update} = useUpdateCVoxel(item.id)
  const etherService = getEtherService();
  const [verifier, setVerifier] = useState<string>("")
  const [isLoading, setLoading] = useState(false)
  const {chainId} = useWalletAccount()
  // const [selectedGenre, selectGenre] = useStateSelectedGenre()
  // const [newTags, setNewTags] = useState<string[]>([])
  // const {updateCvoxels} = useUpdateCVoxels()

  const detailItem = useMemo(() => {
    return cVoxelItem.content || null
  },[cVoxelItem.content])

  // Whether this item is selected or not
  const isSelected: boolean = useMemo(() => {
    return item.id == selectedItem?.id
  }, [item.id, selectedItem]);

  const updatable = useMemo(() => {
    if(cVoxelItem.content && cVoxelItem.content?.toSig && cVoxelItem.content?.fromSig) return false
    const item = offchainItems?.find(item => item.txHash.toLowerCase() === cVoxelItem.content?.txHash.toLowerCase())
    if(!item) return false
    return item.fromSig && !cVoxelItem.content?.fromSig
  },[offchainItems, cVoxelItem])

  // const updatableGenre = useMemo(() => {
  //   return !!detailItem && !detailItem.genre
  // },[detailItem])

  const exploreLink = useMemo(() => {
    if(!detailItem) return
    return getExploreLink(detailItem.txHash, detailItem.networkId)
  },[detailItem,chainId])

  useEffect(() => {
    let isMounted = true
    async function init() {
        await getENS()
    }
    if(detailItem && !verifier && isMounted) {
        init()
    }
    return () => {
      isMounted = false
    }
  },[detailItem])

  const getENS = useCallback(async () => {
      if(!detailItem) return
      setLoading(true)
      if(item.isPayer) {
        const ens = await etherService.getDisplayENS(detailItem.to)
          setVerifier(ens)
      } else {
        const ens = await etherService.getDisplayENS(detailItem.from)
          setVerifier(ens)
      }
      setLoading(false)
  },[detailItem, etherService])

  const handleClick = () => {
    if(detailItem) setSelectedItem({...detailItem, id: item.id})
  };

  const offchainItem = useMemo(() => {
    return offchainItems?.find(offchain => offchain.txHash === item.txHash)
  },[offchainItems, item])

  const fiatVal = useMemo(() => {
    if(detailItem && detailItem.fiatValue) {
      return detailItem.fiatValue
    } else if(offchainItem && offchainItem.fiatValue) {
      return offchainItem.fiatValue
    } 
    return null
  },[detailItem, offchainItem])
  
  const handleUpdate = async() => {
    if(!(offchainItem && detailItem)) return false
    if(updatable && offchainItem.fromSig) {
      const newCVoxel:CVoxel = {...detailItem, fromSig: offchainItem.fromSig}
      await update(newCVoxel)
    }    
  }

  // const handleUpdateGenre = async() => {
  //   if(!detailItem) return false
  //   if(updatableGenre && selectedGenre) {
  //     const newCVoxel:CVoxel = {...detailItem, genre: selectedGenre.value, tags: newTags}
  //     await update(newCVoxel)
  //     await updateCvoxels(item.id, newCVoxel)

  //   }    
  // }


  return (
    <>
    <li className={"relative z-10 flex w-full items-center my-4 transition cursor-pointer"} onClick={handleClick}>
          <div className={"relative flex w-full h-fit transition scale-y-100"}>
            <div className="md:flex w-full space-x-2 items-center font-medium">
              <div className="text-center h-20 w-full md:w-24">
                <div className="flex justify-center items-center w-14 h-14 md:w-16 md:h-16 mx-auto">
                  <div className="relative w-14 h-14 md:w-16 md:h-16">
                    <Image src="/voxel.png" layout="fill" alt="voxel"/>
                  </div>
                </div>
              </div>
              <div className="h-fit w-full rounded-lg shadow-lg bg-white text-left px-5 py-3">
                <div className="flex items-center justify-around">
                  <div className="w-fit max-w-full flex-auto pr-2">
                    <div className="flex w-full items-center justify-start space-x-2 ml-0.5">
                      <span
                        className={"block px-1 py-0.5 text-xs rounded-full font-light w-max " + (detailItem && detailItem.toSig && detailItem.fromSig ? "text-[#53B15C] bg-green-200": "text-[#E83838] bg-red-300")}>
                        {detailItem && detailItem.toSig && detailItem.fromSig? "Verified": "Not Verified"}
                      </span>
                    <p className="text-primary text-sm w-fit">{convertTimestampToDateStr(item.issuedTimestamp)}</p>
                    </div>
                    <h6 className="text-2xl text-black ml-1">
                      {detailItem ? detailItem.summary : item.summary}
                    </h6>
                    <div className="flex items-center flex-wrap w-full my-0.5">
                      {detailItem?.genre ? (
                        <GenreBadge text={detailItem.genre} baseColor={getGenre(detailItem.genre)?.bgColor || "bg-[#b7b7b7]"} isSelected={true}/>
                      ): (
                        <>
                          {/* <div className="mb-3 w-full">
                              <GenreList handleGenre={(g) => selectGenre(g)} genre={selectedGenre?.label} />
                          </div>
                          <div className="flex flex-wrap items-center">
                              <p className="font-semibold">Tags</p>
                          </div>
                          <div className="mb-3 w-full">
                              <TagForm handleTags={tags => setNewTags(tags)} tags={newTags}/>
                          </div> */}
                        </>
                      )}
                      {detailItem?.tags && detailItem.tags.map(tag => {
                        return (
                          <TagBadge key={tag} text={tag} />
                        )
                      })}
                    </div>
                    {detailItem?.detail && (
                      <>
                        {isSelected ? (
                          <p className="text-base text-gray-500 px-1 pt-3 whitespace-pre-wrap">
                            {detailItem?.detail}
                          </p>
                        ): (
                            <p className="text-base text-gray-500 px-1 pt-3">
                            {shortHash(detailItem?.detail, 30) }
                          </p>
                        )}
                      </>
                    )}
                    
                    <div className="py-5 ml-1">
                      <p className="text-base text-black">
                        Deliverable
                      </p>
                      
                      {detailItem?.deliverable?.startsWith("http") ? (
                        <a className="flex items-center flex-wrap" href={`${detailItem?.deliverable}`} target="_blank" rel="noreferrer">
                          <p className="text-xs text-secondary">
                            {shortenStr(detailItem?.deliverable)}
                            </p>
                            <FontAwesomeIcon className="w-3 h-3 ml-2" icon={faExternalLink} color={'#EFA9E0'}/>
                        </a>
                      ):(
                        <p className="text-xs text-secondary">{shortenStr(detailItem?.deliverable)}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-1/4 flex-none">
                    <div className="text-center">
                      {detailItem && (
                        <>
                          <p className="font-medium text-lg">
                            {formatBigNumber(detailItem.value, 6)} {detailItem.tokenSymbol || detailItem.networkId}
                          </p>
                          {fiatVal && (
                            <p className="text-gray-400 text-xs">
                              {`(${Number(fiatVal).toFixed(2)} ${detailItem.fiatSymbol || "USD"})`}
                            </p>
                          )}
                          {isLoading ? (
                              <CommonSpinner size="sm"/>
                          ): (
                              <p className="text-primary text-xs">{item.isPayer ? `TO: ` : `FROM: ` }{verifier}</p>
                          )}
                          <a className="flex items-center justify-center" href={exploreLink} target="_blank" rel="noreferrer">
                            <p className="text-xs text-gray-500">explorer</p>
                            <FontAwesomeIcon className="w-2 h-2 ml-1" icon={faExternalLink} color={'gray'}/>
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full text-right">
                  {(updatable && isOwner) && (
                      <Button
                        variant="contained"
                        color="secondary"
                        text="Update"
                        buttonType="button"
                        onClick={() => handleUpdate()}
                      />
                      )}
                  {/* {(updatableGenre && isOwner) && (
                    <Button
                      variant="contained"
                      color="secondary"
                      text="Update Genre"
                      buttonType="button"
                      onClick={() => handleUpdateGenre()}
                    />
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </li>
    </>
  );
};