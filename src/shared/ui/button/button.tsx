import {ButtonHTMLAttributes, forwardRef, PropsWithChildren} from 'react';
import { Button as ChakraButton } from '@chakra-ui/react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'xs' | 'sm' | 'md' | 'lg';
}

export type Ref = HTMLButtonElement;

export const Button = forwardRef<Ref, PropsWithChildren<ButtonProps>>(({ size, children, ...props }, ref) => {
    return (
        <ChakraButton size={size} {...props} ref={ref}>
            {children}
        </ChakraButton>
    );
});
