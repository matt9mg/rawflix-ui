'use client';

import Input from "@/components/input";
import {useCallback, useEffect, useRef, useState} from "react";
import Select from "@/components/select";
import {api, objectsToSelectOptions, setJWTToken} from "@/lib/helpers";
import Error from "@/components/error";
import SuccessMessage from "@/components/success";
import * as Routes from "@/lib/routes"
import * as HTTP_CODES from "@/lib/http_codes"
import { useRouter } from 'next/navigation'

interface RegisterFieldData {
    countries: [index: string, string];
    genders: [index: string, string]
}

interface FormErrors {
    username?: string;
    password?: string;
    gender?: string;
    country?: string;
    general_errors?: string;
}

const Auth = () => {
    const router = useRouter()
    const username = useRef()
    const countries = useRef()
    const genders = useRef()
    const password = useRef()
    const [variant, setVariant] = useState("login")
    const toggleVariant = useCallback(() => {
        setFormErrors(null)
        setVariant(currentVariant => {
            return currentVariant === "login" ? "register" : "login"
        })
    }, [])
    const [FormErrors, setFormErrors] = useState<FormErrors | null>(null)
    const [registerData, setRegisterData] = useState<RegisterFieldData | null>(null)
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(() => {
        api(Routes.registerData).then((resp: any) => {
            setRegisterData(resp.data)
        })
    }, [])

    const login = () => {
        api({
            ...Routes.login, ...{
                body: {
                    // @ts-ignore
                    username: username.current?.value,
                    // @ts-ignore
                    password: password.current?.value,
                }
            }
        }).then(resp => {
            if (resp.status != HTTP_CODES.HTTP_OK) {
                setFormErrors(resp.data)
                return
            }

            setJWTToken(resp.data)
            router.push("/")
        })
    }

    const register = () => {
        api({
            ...Routes.register, ...{
                body: {
                    // @ts-ignore
                    username: username.current?.value,
                    // @ts-ignore
                    password: password.current?.value,
                    // @ts-ignore
                    country: countries.current?.value,
                    // @ts-ignore
                    gender: genders.current?.value
                }
            }
        }).then(resp => {
            if (resp.status !== HTTP_CODES.HTTP_CREATED) {
                setFormErrors(resp.data)
            }

            toggleVariant()
            setSuccessMessage("you have been registered, login to enjoy your tailored experience")
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
                        <SuccessMessage text={successMessage}/>
                        <Error text={FormErrors?.general_errors}/>
                        <div className="flex flex-col gap-4">
                            <Input
                                forwardedRef={username}
                                label="Username"
                                id="username"
                                type="username"
                                error={FormErrors?.username}
                            />
                            <Input
                                forwardedRef={password}
                                label="Password"
                                id="password"
                                type="password"
                                error={FormErrors?.password}
                            />
                            {variant == "register" && (
                                <Select
                                    forwardedRef={countries}
                                    label="Countries"
                                    id="countries"
                                    name="countries"
                                    options={objectsToSelectOptions(registerData?.countries)}
                                    placeholder="Choose a county"
                                    error={FormErrors?.country}
                                />
                            )}
                            {variant == "register" && (
                                <Select
                                    forwardedRef={genders}
                                    label="Genders"
                                    id="genders"
                                    name="genders"
                                    options={objectsToSelectOptions(registerData?.genders)}
                                    placeholder="Select a gender"
                                    error={FormErrors?.gender}
                                />
                            )}
                        </div>
                        <button onClick={variant === "login" ? login : register}
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