import { FC } from "react";
import type { RequestState } from '@self.id/framework'
import { ProfilePresenter } from "@/components/presenters/profile/ProfilePresenter";

type Props = {
  did: string
  state: RequestState
}

export const ProfileContainer:FC<Props> = (props) => {
  return (
        <>
          <ProfilePresenter {...props}/>
        </>
  );
};