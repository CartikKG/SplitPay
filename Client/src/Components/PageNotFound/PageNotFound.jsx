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
     <img style={{margin:"auto", borderRadius:"35px"}} src="https://static.wixstatic.com/media/09b339_1fbf7214f9774513bda87b74f5ea2bed~mv2.gif" alt="" srcset="" />
    {/* <h1> Not Found</h1> */}
    </Box>
  );
}