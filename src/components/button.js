import React from 'react'
import { ButtonGroup } from '@mui/material'
import Button from '@mui/material/Button';


export default function ButtonMui() {
    return (
        <div>
            <ButtonGroup variant="text" aria-label="Basic button group">
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
            </ButtonGroup>
        </div>
    )
}
