import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const SquareCard = ({image, title}) => {
  return (
    <Card>
        <CardMedia
        component="img"
        image={image}
         />
         <CardContent>
            <Typography sx={{textAlign: "center "}}>{title}</Typography>
         </CardContent>
    </Card>
  )
}

export default SquareCard