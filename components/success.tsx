import React from "react";

interface SuccessMessageProps {
    text?: string
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({text}) => {
    return (<>{text && <span className="text-green-500 font-semibold">{text}</span>}</>)
}

export default SuccessMessage