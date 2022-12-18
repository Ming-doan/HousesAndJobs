import style from './style.module.scss'
import { useState, useEffect } from 'react'
import { readDocuments, readDocument } from '../../apis/readDocuments'
import Navbar from '../../components/Navbar/navbar'
import Spacer from '../../components/Utils/spacer'
import Loading from '../../components/Utils/loading'
import RoommateCard from '../../components/Cards/roommates/roomate'
import { collectionPath } from '../../utils/Constants'

function RoommatePage() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)

    async function getData() {
        const data = await readDocuments(collectionPath.sharedHouse)
        for (let i = 0; i < data.length; i++) {
            const user = await readDocument(collectionPath.users, data[i].from)
            const house = await readDocument(
                collectionPath.houses,
                data[i].house
            )
            data[i].user = {
                avatar: user.avatar,
                name: user.name,
            }
            data[i].location = house.location
            data[i].slot = data[i].sharedAmount - data[i].sharing.length
        }
        setData(data)
        setIsLoading(false)
    }

    if (isLoading) {
        getData()
        return <Loading />
    }
    return (
        <div>
            <Navbar />
            <Spacer space={80} />
            <Spacer space={60} />
            <div className={style.container}>
                <div className={style.wrapper}>
                    <div className={style.list}>
                        {data.map((item, index) => {
                            return (
                                <RoommateCard
                                    key={index}
                                    name={item.user.name}
                                    avatar={item.user.avatar}
                                    location={item.location}
                                    descriptions={item.descriptions}
                                    slot={item.slot}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoommatePage
