'use client'

import { locationNameState, locationsState } from 'recoil/locations'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { ReactElement } from 'react'
import { Card, Container } from 'react-bootstrap'
import { useRecoilState } from 'recoil'

const LocationModule = (): ReactElement => {
  const [getRecoilLocations, setRecoilLocations] =
    useRecoilState(locationsState)

  const [getNameLocations, setNameLocations] = useRecoilState(locationNameState)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const locations = localStorage.getItem('locations')
    const nameLocations = localStorage.getItem('locationName')
    if (locations && nameLocations) {
      setRecoilLocations(JSON.parse(locations))
      setNameLocations(JSON.parse(nameLocations))
    }
  }, [setNameLocations, setRecoilLocations])

  return (
    <div className="flex justify-center min-h-screen">
      <div className='flex flex-col w-full sm:w-3/4 max-w-screen-xl'>
        <h1 className='text-md font-medium mt-5 text-center'>List of Locations</h1>

        <div className='flex flex-wrap gap-4 mt-4 p-2'>
          {getNameLocations?.map((location, index) => (
            <Link
              href={`/location/${location}`}
              key={index}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div
                key={index}
                className='flex justify-center border rounded-lg cursor-pointer p-2 bg-white border-4 border-blue-300 hover:border-blue-500 hover:bg-blue-100'

              >
                <p className="text-md font-bold text-black">
                  {location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LocationModule
