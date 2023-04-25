import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Home from '@/components/Home/Home';

export default withPageAuthRequired(function Inicio() {
  return (
    <Home/>
  );
});


