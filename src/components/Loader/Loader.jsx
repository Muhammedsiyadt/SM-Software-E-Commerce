import { Center, Spinner } from '@chakra-ui/react'
import React from 'react'

function Loader() {
  return (
    <Center mt={"20"} mb="20">
        <Spinner />
    </Center>
  )
}

export default Loader