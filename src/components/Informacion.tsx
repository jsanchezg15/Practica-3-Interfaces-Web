import React, {FC, useState} from "react"

interface IInfoProps {
    data: string[];
}

const InformacionComponent: FC<IInfoProps> = (props) => {

    return (
        <div>
            {props.data.map((elem) => <div>{elem}</div>)}
        </div>
    )
}


export default InformacionComponent