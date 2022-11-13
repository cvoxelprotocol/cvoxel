import { CERAMIC_NETWORK } from '@/constants/common';
import { DIDContext } from '@/context/DIDContext';
import { getOrbisHelper } from '@/services/OrbisHelper';
import { ChatBox } from '@orbisclub/modules'
import { Orbis } from '@orbisclub/orbis-sdk';
import { useContext } from 'react';
import { getVESS } from 'vess-sdk';

const chat_theme = {
    /** Style for main buttons */
    mainCta: {
      background: 'linear-gradient(135deg, #FF94B4 0%, #AA6AFB 100%)'
    },
  
    /** Style for the connect button */
    connectBtn: {
      background: 'linear-gradient(135deg, #FF94B4 0%, #AA6AFB 100%)'
    },
  
    /** Style for the messages sent and received */
    messagesContainer: {
      background: '#DDD',
      color: "#696969"
    },
    messageSent: {
      background: 'linear-gradient(135deg, #FF94B4 0%, #AA6AFB 100%)',
    },
    messageReceived: {
      background: '#fff',
      color: "#696969"
    },
  
    /** Style for the header and footer (input container) */
    header: {
      background: 'linear-gradient(135deg, #FF94B4 0%, #AA6AFB 100%)',
      color: "#FFF",
    },
    footer: {
      background: "#F2F2F2",
      color: "#696969",
    },
  
    /** Reply text */
    replyLine: {
      borderColor: "#696969"
    },
    replyText: {
      color: "#696969"
    },
  
    /** Input style */
    input: {
      background: "#FFF",
      borderWidth: 1,
      borderColor: "#DDD",
      color: "#696969"
    }
  };

export default function OrbisChatWrapper () {
    const vess = getVESS(CERAMIC_NETWORK !== "mainnet")
    const {did} = useContext(DIDContext)
    const orbisHelper = getOrbisHelper()
    if(!did || !vess.ceramic) {
        return <></>
    }
    return (
        <ChatBox orbis={orbisHelper.orbis} context="kjzl6cwe1jw1497qcy3hq2sn5foy7nev50nb4ykg77q08npqnprv5swuonnxe5u" theme={chat_theme} title={"Ask your questions to VESS Community"} poweredByOrbis="black" />
    )
}