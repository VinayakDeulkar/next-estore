import React from 'react'

const SchoolIcon = ({ color, height }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={height ? height : "40"} fill={color} viewBox="0 -960 960 960" width={height ? height : "40"}><path d="M479.59-166.157 214.719-310.772v-216.921L81.541-600 479.59-816.921 878.458-600v286.203h-50.254v-257.435l-83.744 43.539v216.921L479.59-166.157Zm0-274.202L773.103-600 479.59-758.154 186.897-600 479.59-440.359Zm0 217.127 214.615-117.334v-158.102L479.59-383.15 264.974-499.745v159.179L479.59-223.232Zm.41-217.127Zm-.41 64.46Zm0 0Z" /></svg>
    )
}

export default SchoolIcon