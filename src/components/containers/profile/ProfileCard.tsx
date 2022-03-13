import { FC } from "react";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { useUserCeramicAcount } from "@/hooks/useCeramicAcount";
import { Avatar } from "grommet";
import { AvatarPlaceholder } from "@self.id/ui";

type Props = {
  did:string
}
export const ProfileCard:FC<Props> = ({did}) => {
  const {name, avator} = useUserCeramicAcount(did)
  const { showLoading, closeLoading } = useModal();
  const {lancInfo, lancError} = useToast()

  // const onClickSubmit: SubmitHandler<ProfileInfo & { file: FileList }> = async (data) => {
  //   if(!(user && user.address)) {
  //     return
  //   }
    
  //   showLoading()

  //   try {
  //     const icon = iconFileList !== null ? await uploadIcon(iconFileList) : user.icon
  //     await updateUserProfile(user.address, icon, data.name, data.genre, data.intro)
      
  //     closeLoading()
  //     lancInfo("Your profile updated successfully!")

  //     setButtonState({
  //       state: "edit",
  //       text: "Edit",
  //       variant: "outline",
  //     });
  //   } catch (error) {
  //     console.log(error)
  //     closeLoading()
  //     lancError("something went wrong...")
  //   }
  // };

  // const uploadIcon = async(fileList: FileList):Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsArrayBuffer(fileList[0]);
  //     reader.onloadend = async () => {
  //       const result = await setProfileImage(reader.result as string)
  //       resolve(result)
  //     };
  //     reader.onerror = (error) => {
  //       reject(error)
  //     }
  //   })
  // }

  // const onEditClick = () => {
  //   if (buttonState.state == "edit") {
  //     setButtonState({
  //       state: "save",
  //       text: "Save",
  //       variant: "focus",
  //     });
  //   }
  // };

  return (
    <>
      <div className="flex h-auto justify-center items-center self-center rounded-full space-x-2 border w-fit py-1 px-2.5 border-secondary mx-auto">
        <div className="w-[40px] h-[40px] rounded-full bg-onglass-weak overflow-hidden">
          {avator ? (
            <Avatar size="40px" src={avator} flex={false} />
          ): (
            <AvatarPlaceholder size={40} />
          )}
        </div>
        <div className="w-fit mt-2 mb-1 text-xs md:text-sm font-bold text-primary dark:text-secondary text-center">
          {name}
        </div>
      </div>
    </>
  );
};