import { useEffect, useRef } from 'react'
import {
    Input,
    Button,
    InputGroup,
    InputRightElement,
    useToast,
} from '@chakra-ui/react'
import { useMutation } from 'react-query'
import axios from 'axios'
import { useStore } from "@/domain";
import './enterName.css';

// TODO: TYPE USE MUTATION

export const EnterName = () => {
    // TODO: make input controlled
    const inputRef = useRef<HTMLInputElement>(null)
    const toast = useToast()
    const { setUsername, setRoomId } = useStore(({ setUsername, setRoomId }) => ({
        setUsername,
        setRoomId,
    }))
    const id = location.pathname.replace('/', '');

    useEffect(() => {
        if (!id) {
            return
        }

        setRoomId(id);
    }, [id]);

    const { mutateAsync } = useMutation<any, any, any>(({ username, roomId, uri }) => {
        // TODO: dotenv depends on environment
        return axios.post(`${import.meta.env.VITE_BACKEND_URL}${uri}`, {
            username,
            roomId,
        })
    })

    const createRoom = async () => {
        const value = inputRef.current?.value

        if (!value) {
            toast({
                title: 'Please enter your username',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return
        }
        if (!id) {
            await mutateAsync(
                { username: value, uri: 'create-room-with-user' },
                {
                    onSuccess: ({ data }) => {
                        setRoomId(data.roomId)
                        toast({
                            title: 'We created your username, you will find yourself in a room',
                            description: 'Share the room id with anyone',
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        })
                    },
                }
            )
            setUsername(value)
            return;
        }

        setUsername(value);
        setRoomId(id);
    }

    return (
        <div className="enterName-popup">
            <InputGroup size="lg">
                <Input
                    pr="4.5rem"
                    size="lg"
                    placeholder="Enter your name"
                    ref={inputRef}
                />
                <InputRightElement width="4.5rem">
                    <Button size="lg" onClick={createRoom}>
                        Go!
                    </Button>
                </InputRightElement>
            </InputGroup>
        </div>
    )
}
