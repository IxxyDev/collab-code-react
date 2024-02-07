import {useEffect, useState} from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/keymap/sublime'
import io from 'socket.io-client'
import { useToast } from '@chakra-ui/react'
import { createEditor, createWidget } from "@/features/editor/model/createEditor";
import './realtimeEditor.css';
import { Avatar, Button } from "@/shared/ui";
import { useStore } from "@/domain";

// TODO: prettier

const RealTimeEditor = () => {
    const { username, roomId } = useStore(({ username, roomId, setRoomId }) => ({
        username,
        roomId,
        setRoomId
    }));
    const [users, setUsers] = useState<string[] | null>(null);
    const toast = useToast();
    // const id = location.pathname.replace('/', '');
    //
    // useEffect(() => {
    //     setRoomId(id);
    // }, [id]);

    const handleCopyLink = async () => {
        const url = window.location.href + `${roomId}`;
        if (!navigator.clipboard) {
            return document.execCommand('copy', false, url);
        }

        try {
            await navigator.clipboard.writeText(url);
            toast({
                title: 'Text copied to clipboard',
                status: 'success',
                duration: 2000,
            })
            return true;
        } catch {
            return false;
        }
    }

    useEffect(() => {
        const editor = createEditor();
        createWidget();

        const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
            transports: ['websocket'],
        })

        socket.on('CODE_CHANGED', (code) => {
            editor?.setValue(code)
        })

        socket.on('connect_error', (err) => {
            console.log(`connect_error due to ${err.message}`)
        })

        socket.on('connect', () => {
            socket.emit('CONNECTED_TO_ROOM', { roomId, username })
        })

        socket.on('ROOM:CONNECTION', (users) => {
            setUsers(Array.from(new Set(users)));
        })

        socket.on('disconnect', () => {
            socket.emit('DISSCONNECT_FROM_ROOM', { roomId, username })
        })

        // @ts-ignore
        editor?.on('change', (instance: { getValue: () => any }, changes: { origin: any }) => {
            const { origin } = changes
            if (origin !== 'setValue') {
                socket.emit('CODE_CHANGED', instance.getValue())
            }
        })
        // editor.on('cursorActivity', (instance) => {
        //     // console.log(instance.cursorCoords())
        // })

        return () => {
            socket.emit('DISSCONNECT_FROM_ROOM', { roomId, username });
            editor.toTextArea();
        }
    }, [])

    return (
        <div className="realtimeEditor__container">
            <div className="editor-upper-wrapper">
                <Button onClick={handleCopyLink}>Copy link</Button>
                <div className="avatars-wrapper">
                    {users && users.map(user => <Avatar name={user ?? undefined} />)}
                </div>
            </div>
            <textarea id="ds" />
        </div>
    )
}

export default RealTimeEditor
