'use client'

import { locationsState } from 'recoil/locations'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { ReactElement } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useRecoilState } from 'recoil'
import Image from 'next/image'


type Props = {
  params: { name: string }
}

const DetailLocationModule = ({ params }: Props): ReactElement => {
  const [get, set] = useRecoilState(locationsState)

  const filteredLocations = get.data.filter((location) => {
    return location.location === params.name
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const locations = localStorage.getItem('locations')
      const nameLocations = localStorage.getItem('locationName')
      if (locations && nameLocations) {
        set(JSON.parse(locations))
      }
    }
  }, [set])

  return (
    <div className='flex flex-col w-full sm:w-3/4 max-w-screen-xl min-h-screen'>
      <h1 className='text-md font-medium mt-5 text-center'>Character Cards</h1>
      <div className='flex flex-wrap flex-1'>
        {filteredLocations?.map((character) => (
          <div
            key={character.id}
            className='flex flex-col w-1/2 sm:w-1/3 md:w-1/4 lg:w-2/8 p-2 rounded-lg '
          >
            <Link
              href={`character/${character.id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div className='border rounded-lg '>
                <Image
                  src={character.image as string}
                  width='0'
                  height='0'
                  alt={character.name as string}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: '0.5rem 0.5rem 0 0',
                  }}
                  layout="responsive"
                />
                <div className='flex flex-col p-2 gap-y-2'>
                  <p className='text-lg font-bold'>{character.name}</p>
                  <div className='flex flex-col gap-2'>
                    <p className='text-md'><b>Status:</b> {character.status || 'unknown'}</p>
                    <p className='text-md'><b>Species:</b> {character.species || 'unknown'}</p>
                    <p className="text-md"><b>Type:</b> {character.type || 'unknown'}</p>
                    <p className="text-md"><b>Gender:</b> {character.gender || 'unknown'}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DetailLocationModule
