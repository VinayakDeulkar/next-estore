import React, { useContext } from 'react'
import { AppContext } from '@/context/AppContext'
import './title.css'

const Title = ({ englishTitle, arabicTitle }) => {
    const { language } = useContext(AppContext)

    return (
        <div className='titleDiv'>
            {language === "ltr" ? englishTitle : arabicTitle}
        </div>
    )
}

export default Title