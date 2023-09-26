'use client';

import Input from "@/components/input";
import {useCallback, useEffect, useRef, useState} from "react";
import Select from "@/components/select";
import objectsToSelectOptions from "@/lib/helpers";

interface RegisterFieldData {
    countries: [index: string, string];
    genders: [index: string, string]
}

const Auth = () => {
    const username = useRef()
    const countries = useRef()
    const genders = useRef()
    const password = useRef()
    const [variant, setVariant] = useState("login")
    const toggleVariant = useCallback(() => {
        setVariant(currentVariant => {
            return currentVariant === "login" ? "register" : "login"
        })
    }, [])
    const [registerData, setRegisterData] = useState<RegisterFieldData | null>(null)

    useEffect(() => {
        const getRegisterData = async () => {
            const fetchData = await fetch("http://127.0.0.1:3002/register-field-data").then(res => {
                return res.json()
            })
            setRegisterData(fetchData)
        }

        getRegisterData()
    }, [])

    const login = () => {
        fetch("http://127.0.0.1:3002").then(response => {
            response.json().then(data => {
                console.log(response.status, data)
            })
        })
    }

    return (
        <div className="relative w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-12"/>
                </nav>
                <div className="flex justify-center">
                    <div
                        className="bg-black bg-opacity-70 px-16 py-16 self-center mt-12 lg:w-2/5 lg:max-w-md rounded-md">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === "login" ? "Sign in" : "Register"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant == "register" && (
                                <Select
                                    forwardedRef={countries}
                                    label="Countries"
                                    id="countries"
                                    name="countries"
                                    options={objectsToSelectOptions(registerData?.countries)}
                                />
                            )}
                            {variant == "register" && (
                                <Select
                                    forwardedRef={genders}
                                    label="Genders"
                                    id="genders"
                                    name="genders"
                                    options={objectsToSelectOptions(registerData?.genders)}
                                />
                            )}
                            <Input
                                forwardedRef={username}
                                label="Username"
                                id="username"
                                type="username"
                            />
                            <Input
                                forwardedRef={password}
                                label="Password"
                                id="password"
                                type="password"
                            />
                        </div>
                        <button onClick={login}
                                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant === "login" ? "Login" : "Register"}
                        </button>
                        <p className="text-neutral-500 mt-12">
                            {variant === "login" ? "First time using Netflix?" : "Already have an account?"}
                            <span onClick={toggleVariant}
                                  className="text-white text-sm ml-1 hover:underline cursor-pointer">
                                {variant === "login" ? "Create an account" : "Login"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth