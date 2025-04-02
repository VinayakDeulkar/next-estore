import React from 'react'

const DeleteCrossIcon = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <rect width="24" height="24" fill="url(#pattern0_2195_473)" />
            <defs>
                <pattern id="pattern0_2195_473" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use href="#image0_2195_473" transform="scale(0.01)" />
                </pattern>
                <image id="image0_2195_473" width="100" height="100" href="data:image/png;base64,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" />
            </defs>
        </svg>

    )
}

export default DeleteCrossIcon