import React from 'react'

function page() {
  return (
    <div>{process.env.GOOGLE_CLIENT_SECRET?? ""}
    <p>{ process.env.GOOGLE_CLIENT_SECRET}</p></div>
  )
}

export default page