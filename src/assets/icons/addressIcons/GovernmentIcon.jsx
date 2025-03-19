import React from 'react'

const GovernmentIcon = ({ color, height }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={height ? height : "40"} viewBox="0 -960 960 960" width={height ? height : "40"} fill={color}>
            <path d="M235.951-260.923v-328.822h50.255v328.822h-50.255Zm220.819 0v-328.822h50.255v328.822H456.77ZM110.771-140.412v-50.255h738.458v50.255H110.771Zm563.023-120.511v-328.822h50.255v328.822h-50.255ZM110.771-660.001v-43.794L480-898.101l369.229 194.306v43.794H110.771Zm120.459-50.255h497.54-497.54Zm0 0h497.54L480-840.821 231.23-710.256Z" />
        </svg>
    )
}

export default GovernmentIcon