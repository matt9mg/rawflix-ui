import React from 'react'

interface InputProps {
    id: string;
    forwardedRef: any;
    label: string;
    type?: string;
}

const Input: React.FC<InputProps> = ({
                                         id,
                                         forwardedRef,
                                         label,
                                         type
                                     }) => {
    return (
        <div className="relative">
            <input
                ref={forwardedRef}
                type={type}
                id={id}
                className="block rounded-md px-6 pt-6 pb-1 w-full text-mb text-white bg-neutral-700 appearance-none focus:ring-0 peer"
                placeholder=" "
            />
            <label
                htmlFor={id}
                className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:75 peer-focus:-translate-y-3">
                {label}
            </label>
        </div>
    )
}

export default Input