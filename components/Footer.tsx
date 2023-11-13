'use client'
import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {
  return (
    <div
      className='bg-blue-400 text-white text-center py-3'
    >
      &copy; {new Date().getFullYear()} Rick and Morty Fan Site
    </div>
  )
}

export default Footer
