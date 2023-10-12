import NavbarItem from "@/components/navbar_item";
import {BsBell, BsChevronDown, BsSearch} from "react-icons/bs"
import MobileMenu from "@/components/mobile_menu";
import {useCallback, useEffect, useState} from "react";
import AccountMenu from "./account_menu"

const TOP_OFFSET = 66

const NavBar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [showBackground, setShowBackground] = useState(false)

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu(current => {
            return !current
        })
    }, [])

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu(current => {
            return !current
        })
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setShowBackground(window.scrollY > TOP_OFFSET)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []);

    return (
        <nav className="w-full fixed z-40">
            <div
                className={`px-4 md:px16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
                <img src="/images/logo.png" alt="logo" className="h-4 lg:h-7"/>
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label="Home"/>
                    <NavbarItem label="Seriers"/>
                    <NavbarItem label="Films"/>
                    <NavbarItem label="New & Popular"/>
                    <NavbarItem label="My List"/>
                    <NavbarItem label="Browse By Languages"/>
                </div>
                <div onClick={toggleMobileMenu}
                     className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse </p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}/>
                    <MobileMenu visible={showMobileMenu}/>
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gre-200 hover:text-green-300 cursor-pointer transition">
                        <BsSearch/>
                    </div>
                    <div className="text-gre-200 hover:text-green-300 cursor-pointer transition">
                        <BsBell/>
                    </div>
                    <div onClick={toggleAccountMenu}
                         className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-blue.png" alt="profile"/>
                        </div>
                        <BsChevronDown
                            className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}/>
                        <AccountMenu visible={showAccountMenu}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar