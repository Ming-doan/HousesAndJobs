import style from './style.module.scss'
import { Fragment, useState } from 'react'
import Navbar from '../../components/Navbar/navbar'
import Spacer from '../../components/Utils/spacer'

function MapPage() {
    return (
        <div>
            <Navbar />
            <Spacer space={80} />
        </div>
    )
}

export default MapPage
