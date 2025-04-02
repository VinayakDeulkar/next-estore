import React from 'react'

const HomeIcon = ({ color, height }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={height ? height : "40"} viewBox="0 -960 960 960" width={height ? height : "40"} fill={color}><path d="M220.001-180.001v-320h-87.689L480-813.075 656.41-655.28v-104.205h72.819v170.305l98.459 89.004h-87.689v320.175H529.488v-224.615h-98.976v224.615H220.001Zm50.255-50.255h110.002v-224.615h199.484v224.615h110.002v-326.206L480-746.205 270.256-556.462v326.206Zm110.002-224.615h199.484-199.484Zm21.281-109.796h157.179q0-30.743-23.718-50.5-23.718-19.756-55-19.756t-54.872 19.617q-23.589 19.617-23.589 50.639Z" /></svg>
    )
}

export default HomeIcon