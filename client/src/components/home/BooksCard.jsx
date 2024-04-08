import React from 'react'
import  { Link } from 'react-router-dom'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { AiOutlineEdit } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import BookSingleCard from './BookSingleCard'


const BooksCard = ({books}) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {books.map((item) => (
            <BookSingleCard key={item.id} book={item}/>
        ))}
    </div>
  )
}

export default BooksCard