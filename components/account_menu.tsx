import React from "react"
import {api, deleteJWTToken} from "@/lib/helpers";
import { useRouter } from 'next/navigation'
import {logout as logoutRoute} from "@/lib/routes"

interface AccountMenuProps {
    visible?: boolean
}

const AccountMenu: React.FC<AccountMenuProps> = ({visible}) => {
    const router = useRouter()
    const logout = () => {
        api(logoutRoute).then(() => {
            deleteJWTToken()
            router.push("/auth")
        })
    }

    if (!visible) {
        return null
    }

    return (
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-3">
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <img className="w-8 rounded-md" src="/images/default-blue.png" alt="profile"/>
                    <p className="text-white text-sm group-hover/item:underline">
                        Username
                    </p>
                </div>
                <hr className="bg-gray-600 border-0 h-px my-4" />
                <div onClick={logout} className="px-3 text-center text-white text-sm hover:underline">
                    Sign out of RawFlix
                </div>
            </div>
        </div>
    )
}

export default AccountMenu