import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import { loginCheck } from '../Actions/AllActions';

export default function PageNotFound() {
  const dispatch = useDispatch();
  loginCheck(dispatch)
  return (
    <Box>
    
    <h1> Not Found</h1>
    </Box>
  );
}