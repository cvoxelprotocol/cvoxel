import { useMyCeramicAcount } from '@/hooks/useCeramicAcount'
import { AvatarPlaceholder, useConnection, useViewerID, useViewerRecord } from '@self.id/framework'
import { Avatar, Box, Button, DropButton, Text } from 'grommet'
import Link from 'next/link'
import { useState } from 'react'



import {DisplayAvatar} from './DisplayAvatar'
import { ThemeButton } from './button/ThemeButton'
import { getProfileInfo } from '@/utils/ceramicUtils'

type MenuButtonProps = {
  label: string
  onClick: () => void
}

function MenuButton({ label, ...props }: MenuButtonProps) {
  return (
    <div>
      <button className="text-sm" {...props}>
          <p className="text-sm">
            {label}
          </p>
      </button>
    </div>
  )
}

export default function AccountButton() {
  // const [connection, connect, disconnect] = useConnection()
  const {connectCeramic, connection, disconnectCeramic, account, connectWalletOnly} = useMyCeramicAcount()
  const viewerID = useViewerID()
  const profileRecord = useViewerRecord('basicProfile')
  const [isMenuOpen, setMenuOpen] = useState(false)

  if (viewerID != null) {
    const { avatarSrc, displayName } = getProfileInfo(viewerID.id, profileRecord.content)

    const buttons =
      connection.status === 'connected' ? (
        <>
          <MenuButton label="Disconnect" onClick={() => disconnectCeramic()} />
          <div>
            <ThemeButton />
          </div>
        </>
      ) : (
        <>
          <MenuButton
            label="Connect"
            onClick={() => {
              connectCeramic()
              setMenuOpen(false)
            }}
          />
          <MenuButton label="Clear" onClick={() => disconnectCeramic()} />
          <div>
            <ThemeButton />
          </div>
        </>
      )

    const content = (
      <div
        className="border-gray-200 rounded-lg w-64 mt-12 p-4 text-primary bg-gray-100 dark:bg-card dark:text-oncard">
        <div
          className="space-y-4 text-center p-2">
            <div className="flex items-center justify-center">
              {avatarSrc ? (
                <Avatar size="60px" src={avatarSrc} />
              ) : (
                <AvatarPlaceholder did={viewerID.id} size={60} />
              )}
            </div>
          <p className="font-bold text-sm">
            {displayName}
          </p>
        </div>
        <div className="rounded-lg space-y-2">
          <div className="">
            <Link href={`/${viewerID.id}`} passHref>
              <button
                onClick={() => {
                  setMenuOpen(false)
                }}><p className="text-sm">My CVoxels</p></button>
            </Link>
          </div>
          {buttons}
        </div>
      </div>
    )

    return (
      <DropButton
          dropAlign={{ top: 'bottom', right: 'right' }}
          dropContent={content}
          dropProps={{ plain: true }}
          onClose={() => {
            setMenuOpen(false)
          }}
          onOpen={() => {
            setMenuOpen(true)
          }}
          open={isMenuOpen}>
          <DisplayAvatar
            did={viewerID.id}
            label={displayName}
            loading={profileRecord.isLoading}
            src={avatarSrc}
          />
        </DropButton>
    )
  }

  if(account && connection.status === 'disconnected'){
    return (
      <Button
        primary
        color="white"
        label="Connect Ceramic"
        onClick={() => connectCeramic()}
        style={{ border: 1, color: 'gray' }}
      />
    )
  }



  return connection.status === 'connecting' ? (
    <DisplayAvatar label="Connecting..." loading />
  ) : (
    <Button
      primary
      color="white"
      label="Connect"
      onClick={() => connectWalletOnly()}
      style={{ border: 1, color: 'gray' }}
    />
  )
}
