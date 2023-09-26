import React from 'react'

interface SelectProps {
    id: string;
    forwardedRef: any;
    label: string;
    options?: OptionProps
    name: string;
}

interface OptionProps extends Array<Option> {
}

interface Option {
    key: any;
    name: any;
    selected: boolean;
}

const Select: React.FC<SelectProps> = ({
                                          id,
                                          forwardedRef,
                                          label,
                                          name,
                                          options,
                                      }) => {
    console.log(options)

    return (
        <div className="relative">
            <label htmlFor={id}>
                {label}
            </label>
            <select ref={forwardedRef} name={name} id={id}>
                {options?.map(
                    ({key, name, selected}: Option, index) => {
                        return (
                            <option
                                key={index}
                                value={key}
                                selected={selected}
                            >{name}</option>
                        )
                    }
                )}
            </select>
        </div>
    )
}

export default Select