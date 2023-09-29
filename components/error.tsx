import React from "react";

interface ErrorProps {
    text?: string
}

const Error: React.FC<ErrorProps> = ({text}) => {
    return (<>{text && <span className="text-red-500 font-semibold">{text}</span>}</>)
}

export default Error