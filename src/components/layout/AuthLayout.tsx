import { FC, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/app'
import { getUser } from "@/lib/firebase/store/user";
import { useWalletAccount } from "@/hooks/useWalletAccount";

export const AuthLayout:FC = ({children}) => {
    const {setUserAuth, userAuth} = useAuth()
    const {disconnectWallet, active} = useWalletAccount()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(u) => {
            if (u) {
                const user = userAuth ? userAuth : await getUser(u.uid);
                setUserAuth(user)
            } else {
                setUserAuth(null)
                if(active) {
                    disconnectWallet()
                }
            }
            })
            return () => unsubscribe();
    },[])
    return<>{children}</>
}