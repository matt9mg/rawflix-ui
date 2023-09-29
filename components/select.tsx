import React from 'react'
import Error from "@/components/error";

interface SelectProps {
    id: string;
    forwardedRef: any;
    label: string;
    options?: OptionProps
    name: string;
    placeholder?: string;
    error?: string
}

interface OptionProps extends Array<Option> {
}

interface Option {
    key: any;
    name: any;
    chosen: boolean;
}

const Select: React.FC<SelectProps> = ({
                                           id,
                                           forwardedRef,
                                           label,
                                           name,
                                           options,
                                           placeholder,
                                           error
                                       }) => {

    const chosenValue = options?.filter(({chosen}) => {
        return chosen === true
    })

    return (
        <div className="relative">
            <label className="text-white font-semibold" htmlFor={id}>
                {label}
            </label> d
            <select
                className="block rounded-md px-6 pt-3 pb-3 w-full text-mb text-white bg-neutral-700 appearance-none focus:ring-0"
                ref={forwardedRef} name={name} id={id} defaultValue={chosenValue?.at(0)?.key}>
                {placeholder && (
                    <option>{placeholder}</option>
                )}
                {options?.map(
                    ({key, name}: Option, index) => {
                        return (
                            <option
                                key={index}
                                value={key}
                            >{name}</option>
                        )
                    }
                )}
            </select>
            <Error text={error} />
        </div>
    )
}

export default Select