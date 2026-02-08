import React from 'react'
import { Text } from '@react-three/drei'

const Message3D = ({ text = 'I love you', position = [0, -2.5, 4] }) => {
  return (
    <Text
      position={position}
      fontSize={0.9}
      maxWidth={12}
      lineHeight={1}
      textAlign="center"
      anchorX="center"
      anchorY="middle"
      color="#ffdce3"
    >
      {text}
    </Text>
  )
}

export default Message3D
