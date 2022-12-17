import style from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setHousesCache } from '../../utils/appStorage'
import { readDocuments } from '../../apis/readDocuments'
import Button from '../../components/Buttons/button'
import Spacer from '../../components/Utils/spacer'
import Text from '../../components/Utils/text'
import CardItem from '../../components/Cards/items/item'
import Loading from '../../components/Utils/loading'
import { collectionPath } from '../../utils/Constants'

function Houses() {
    const navigate = useNavigate()
    const housesData = useSelector((state) => state.storage.housesCache)
    const dispatch = useDispatch()

    function handleNavigateToDetail(id) {
        navigate(`/houses/${id}`)
    }

    function handleGetData() {
        readDocuments(collectionPath.houses).then((data) => {
            dispatch(setHousesCache(data))
        })
    }

    if (!housesData) {
        handleGetData()
    }

    return (
        <div className={style.content}>
            <div className={style.topActions}>
                <div className={style.left}>
                    <Text h3>Recommend for you</Text>
                </div>
                <div className={style.right}>
                    <Button auto variant="flat">
                        Filter
                    </Button>
                    <Spacer space={10} />
                    <Button auto>Find roommate</Button>
                </div>
            </div>
            {housesData ? (
                <div className={style.cards}>
                    {housesData.map((data, index) => (
                        <CardItem
                            key={index}
                            imageUrl={data.images[0]}
                            title={data.title}
                            descriptions={data.descriptions.slice(0, 2)}
                            location={data.location}
                            onPress={() => handleNavigateToDetail(data.id)}
                        />
                    ))}
                </div>
            ) : (
                <Loading />
            )}
        </div>
    )
}

export default Houses
