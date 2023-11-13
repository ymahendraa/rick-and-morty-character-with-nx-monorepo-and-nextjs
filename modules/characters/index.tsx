'use client'

import { useGetCharacters } from 'hooks/characters'
import { characterPageState, charactersState } from 'recoil/characters'
import React, { useEffect, useState } from 'react'
import { ReactElement } from 'react'
import { useRecoilState } from 'recoil'
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
// import Card from './Card'

const CharacterModule = (): ReactElement => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page')) || 1

  const { data } = useGetCharacters(page)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    router.replace(`/?page=${pageNumber}`)
  }

  const renderPageNumbers = () => {
    if (!data) return null

    const pagesToShow = 5 // Number of page numbers to show around the current page
    const pageNumbers = []

    const minPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1)
    const maxPage = Math.min(minPage + pagesToShow - 1, data?.info?.pages)

    if (minPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className='text-xs sm:text-sm font-bold'
        >
          1
        </button>
      )
      if (minPage > 2) {
        pageNumbers.push(
          <button
            key='ellipsis-start'
            disabled
          />
        )
      }
    }

    for (let i = minPage; i <= maxPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          // active={i === currentPage}
          onClick={() => handlePageChange(i)}
          className={`${i === currentPage && 'bg-blue-500 hover:bg-blue-700 text-white'}  text-xs sm:text-sm font-bold mx-0 sm:mx-2 border border-blue-500 rounded-full h-5 w-5 sm:h-8 sm:w-8`}
        >
          {i}
        </button>
      )
    }

    if (maxPage < data?.info?.count) {
      if (maxPage < data?.info?.count - 1) {
        pageNumbers.push(
          <button
            key='ellipsis-end'
            disabled
          />
        )
      }
      pageNumbers.push(
        <button
          key={data?.info?.count}
          onClick={() => handlePageChange(data?.info?.count)}
          className='text-xs sm:text-sm font-bold'
        >
          {data?.info?.count}
        </button>
      )
    }

    return pageNumbers
  }

  return (
    <div className="flex justify-center">
      <div className='flex flex-col w-full sm:w-3/4 max-w-screen-xl'>
        <h1 className='text-md font-medium mt-5 text-center'>Character Cards</h1>
        <div className='flex flex-wrap flex-1'>
          {data?.results?.map((character) => (
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
        <div className='flex bg-white my-4 justify-center gap-x-2'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='bg-blue-500 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold sm:py-1 px-2 rounded-lg'
          >
            prev
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === data?.info?.count}
            className='bg-blue-500 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold sm:py-1 px-2 rounded-lg'
          >next</button>
        </div>
      </div>
    </div>
  )
}

export default CharacterModule
