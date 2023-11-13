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
    <div>
      <Container>
        <h1 className='mt-3 mb-4'>List of Locations</h1>

        {getNameLocations?.map((location, index) => (
          <Link
            href={`/location/${location}`}
            key={index}
          >
            <Card
              key={index}
              className='m-2 p-3 bg-light'
              style={{ minWidth: '200px' }}
            >
              {location}
            </Card>
          </Link>
        ))}
      </Container>
    </div>
  )
}

export default LocationModule
