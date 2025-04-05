import React from 'react'

const Pointer = () => {
    return (
        <svg width="25" height="25" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <rect width="25" height="26" fill="url(#pattern0_2195_555)" />
            <defs>
                <pattern id="pattern0_2195_555" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use href="#image0_2195_555" transform="matrix(0.01 0 0 0.00961538 0 0.0192308)" />
                </pattern>
                <image id="image0_2195_555" width="100" height="100" href="data:image/png;base64,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" />
            </defs>
        </svg>

    )
}

export default Pointer