import React from 'react'
import Link from "next/link"
const page = () => {
  return (
    <div className='navbar'>
        <div className="nav_part1">
          <img src="logo.png" />
          <Link href={`/Home`}>Home</Link>
          <Link href = {`/About`}>About Us</Link>
        </div>
        <div className="nav_part">
          <button><Link href = {``} > Log In </Link></button>
          <button><Link href = {``}> Sign Up </Link></button>
        </div>
    </div>
  )
}

export default page