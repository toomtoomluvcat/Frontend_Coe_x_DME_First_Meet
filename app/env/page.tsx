import React from 'react'

function page() {
  return (
    <div>{process.env.GOOGLE_CLIENT_SECRET?? ""}
    <p>{ process.env.GOOGLE_CLIENT_ID}</p>
    <p>{ process.env.AUTH_SECRET}</p></div>
  )
}

export default page