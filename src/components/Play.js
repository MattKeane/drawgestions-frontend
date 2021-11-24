import { useState } from 'react'
import Suggestions from './Suggestions'

export default function Play(props) {
    const [drawThis, setDrawThis] = useState('')

    return (
        <>
            {
                drawThis
                ?
                <p>{ drawThis }</p>
                :
                <Suggestions socket={ props.socket } />
            }
        </>
    )
}