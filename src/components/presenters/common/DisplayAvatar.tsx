import { AvatarPlaceholder } from '@self.id/framework'
import { Avatar, Box, Spinner } from 'grommet'
import { FC } from "react";

type Props = {
  did?: string
  label: string
  loading?: boolean
  src?: string | null
}

export const DisplayAvatar:FC<Props> = ({ did, label, loading, src }) => {
  const avatar = loading ? (
    <Box pad="xxsmall">
      <Spinner />
    </Box>
  ) : src ? (
    <Avatar size="32px" src={src} flex={false} />
  ) : (
    <AvatarPlaceholder did={did} size={32} />
  )

  return (
    <div className="md:w-60 rounded-full flex items-center space-x-2">
      {avatar}
      <p className="text-primary dark:text-white text-sm hidden md:block">
        {label}
      </p>
    </div>
  )
}
