import NavbarItem from "@/components/navbar_item";
import {BsChevronDown, BsSearch, BsBell} from "react-icons/bs"
import MobileMenu from "@/components/mobile_menu";
import {useCallback, useState} from "react";
import AccountMenu from "./account_menu"

const NavBar = () => {
    const [showMobileMenu, setSHowMobileMenu] = useState(false)
    const toggleMobileMenu = useCallback(() => {
        setSHowMobileMenu(current => {
            return !current
        })
    }, [])

    return (
        <nav className="w-full fixed z-40">
            <div className="px-4 md:px16 py-6 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90">
                <img src="/images/logo.png" alt="logo" className="h-4 lg:h-7" />
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label="home"/>
                    <NavbarItem label="Seriers"/>
                    <NavbarItem label="Films"/>
                    <NavbarItem label="New & Popular"/>
                    <NavbarItem label="My List"/>
                    <NavbarItem label="Browse By Languages"/>
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse </p>
                    <BsChevronDown className="text-white transition" />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gre-200 hover:text-green-300 cursor-pointer transition">
                        <BsSearch />
                    </div>
                    <div className="text-gre-200 hover:text-green-300 cursor-pointer transition">
                        <BsBell />
                    </div>
                    <div className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-blue.png" alt="profile" />
                            <BsChevronDown className="text-white transition" />
                            <AccountMenu />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar