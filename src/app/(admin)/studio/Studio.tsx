// Sanity doesn't work on server side so we need to create a client side component
'use client';
import { NextStudio } from "next-sanity/studio";
import React from 'react'
import sanityConfig from "../../../../sanity.config";

const Studio = () => {
  return (
    <NextStudio config={sanityConfig} />
  )
}

export default Studio
