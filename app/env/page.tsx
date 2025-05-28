import React from 'react'

function page() {
  return (
    <div>{process.env.GOOGLE_CLIENT_SECRET?? ""}</div>
  )
}

export default page