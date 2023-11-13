'use client'

import { useGetDetailCharacter } from 'hooks/characters'
import { locationNameState, locationsState } from 'recoil/locations'
import { TLocations } from 'types/location'
import { type } from 'os'
import React, { useState, useEffect } from 'react'
import { ReactElement } from 'react'
import { Container, Row, Col, Card, Modal, Form, Button } from 'react-bootstrap'
import Image from 'next/image'
import { useRecoilState } from 'recoil'

type Props = {
  params: { id: string }
}

const DetailCharacterModule = ({ params }: Props) => {
  const { data } = useGetDetailCharacter(params.id)

  const [showModal, setShowModal] = useState(false)

  const [location, setLocation] = useState('')
  const [getRecoilLocations, setRecoilLocations] =
    useRecoilState(locationsState)

  const [getNameLocations, setNameLocations] = useRecoilState(locationNameState)

  console.log(getRecoilLocations)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const locations = localStorage.getItem('locations')
    const nameLocations = localStorage.getItem('locationName')
    if (locations && nameLocations) {
      setRecoilLocations(JSON.parse(locations))
      setNameLocations(JSON.parse(nameLocations))
    }
  }, [setNameLocations, setRecoilLocations])

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  const handleModalSave = () => {
    const newLocation = {
      id: Number(params.id),
      name: data?.name,
      status: data?.status,
      species: data?.species,
      type: data?.type,
      gender: data?.gender,
      image: data?.image,
      location: location,
    }

    // setRecoilLocations({ data: [newLocation] })
    setRecoilLocations((oldLocations) => {
      // check if the location already exists with the same character

      const locationExists = oldLocations.data.find((item) => {
        return item.location === location && item.id === Number(params.id)
      })

      if (locationExists) {
        alert('This location already exists for this character')
        return oldLocations
      }

      localStorage.setItem(
        'locations',
        JSON.stringify({ data: [...oldLocations.data, newLocation] })
      )
      return {
        data: [...oldLocations.data, newLocation],
      }
    })

    // check if there is a location with the same name
    const nameExists = getNameLocations.find((item) => {
      return item === location
    })

    if (nameExists) return getNameLocations

    setNameLocations((oldNameLocations) => {
      localStorage.setItem(
        'locationName',
        JSON.stringify([...oldNameLocations, location])
      )
      return [...oldNameLocations, location]
    })

    handleModalClose()
  }

  return (
    <div className='flex flex-col items-center h-screen'>
      <h1 className='my-4 text-black font-bold text-lg'>Character Details</h1>
      <div className='border rounded-xl sm:w-2/4'>
        <div className='flex sm:flex-col'>
          <div className='sm:w-2/3'>
            <Image
              src={data?.image as string}
              width='0'
              height='0'
              alt={data?.name as string}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '0.5rem 0 0 0.5rem',
              }}
              layout="responsive"
            />
          </div>
          <div className='flex flex-col p-4 sm:gap-y-4 sm:w-1/3 justify-between'>
            <div className='flex flex-col gap-1 sm:gap-4'>
              <p className='sm:text-2xl font-bold'>{data?.name}</p>
              <div className='flex flex-col'>
                <p className='text-sm sm:text-lg'><b>Status: </b> {data?.status}</p>
                <p className='text-sm sm:text-lg'><b>Species: </b> {data?.species}</p>
                <p className='text-sm sm:text-lg'><b>Type: </b>{data?.type}</p>
                <p className='text-sm sm:text-lg'><b>Gender: </b> {data?.gender}</p>
              </div>
            </div>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white text-sm sm:text-lg sm:font-bold sm:py-2 sm:px-4 rounded-lg'
              onClick={() => setShowModal(true)}
            >
              Add Location
            </button>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter new location'
              value={location}
              onChange={handleLocationChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleModalClose}
          >
            Close
          </Button>
          <Button
            variant='primary'
            onClick={handleModalSave}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DetailCharacterModule
