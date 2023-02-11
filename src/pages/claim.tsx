import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Claim = () => {
  const { id } = useParams();
  useEffect(() => {
    // fetch donation using that id from Contract/BE
  }, [])
  return (
    <Typography textAlign="center" variant="h3" gutterBottom>Claim from donation {id}</Typography>
  )
}

export default Claim
