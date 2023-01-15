import React from 'react'
import "./CardUsuario.css"
import { Card } from 'react-bootstrap'

function CardUsuario(props) {
    return (
        <Card className="mb-2">
            <Card.Body>
                <Card.Title>{props.usuario.login}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Id: {props.usuario.id}
                </Card.Subtitle>
                <Card.Link href={props.usuario.avatar_url}>{props.usuario.avatar_url}</Card.Link>
            </Card.Body>
        </Card>
    )
}

export default CardUsuario