import {FC, PropsWithChildren} from 'react';
import { Avatar as ChakraAvatar } from '@chakra-ui/react'

interface AvatarProps {
    name?: string;
    src?: string;
}

export const Avatar: FC<PropsWithChildren<AvatarProps>> = ({ name, src, children }) => {
    return (
        <ChakraAvatar name={name} src={src}>
            {children}
        </ChakraAvatar>
    );
};
