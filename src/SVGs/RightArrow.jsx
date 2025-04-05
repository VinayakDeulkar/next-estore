import React from 'react'

const RightArrow = ({ size, strokeWidth }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18"></polyline>
        </svg>
    )
}

export default RightArrow