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
    <Container>
      <h1 className='mt-5 text-center'>Character Cards</h1>
      <Row className='mt-4'>
        {filteredLocations?.map((character) => (
          <Col
            key={character.id}
            md={4}
          >
            <Link
              href={`character/${character.id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Card className='mb-3'>
                <Image
                  src={character.image as string}
                  width='0'
                  height='0'
                  alt={character.name as string}
                  layout="responsive"
                />
                <Card.Body>
                  <Card.Title>{character.name}</Card.Title>
                  <Card.Text>
                    <strong>Status:</strong> {character.status}
                    <br />
                    <strong>Species:</strong> {character.species}
                    <br />
                    <strong>Type:</strong> {character.type}
                    <br />
                    <strong>Gender:</strong> {character.gender}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default DetailLocationModule
