import { Image, IImageProps } from "native-base";

import { api } from "@services/api";
import defaultUserAvatar from '@assets/userPhotoDefault.png'

type Props = IImageProps & {
  size: number
  avatarPath: string;
}

export function Avatar({size, avatarPath,...rest}: Props) {
  return (
    <Image 
      w={size} 
      h={size} 
      rounded="full"
      borderWidth={3}
      borderColor="blue.500"
      source={avatarPath ? 
        { uri: `${api.defaults.baseURL}/images/${avatarPath}` } : 
        defaultUserAvatar }
      {...rest}
    />
  )
}