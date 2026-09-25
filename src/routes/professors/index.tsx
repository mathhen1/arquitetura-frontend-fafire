import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { professorsMock } from '../../lib/mockdb'

export const Route = createFileRoute('/professors/')({
    component: RouteComponent,
})

function RouteComponent() {

    const [professors, setProfessors] = useState([])

    useEffect(() => {
        // setProfessors()
    }, [])

    return <div>
        <table>
            
        </table>
    </div>
}
