import style from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setHousesCache } from '../../utils/appStorage'
import { readDocuments } from '../../apis/readDocuments'
import Button from '../../components/Buttons/button'
import Spacer from '../../components/Utils/spacer'
import Text from '../../components/Utils/text'
import CardItem from '../../components/Cards/items/item'
import Loading from '../../components/Utils/loading'
import { collectionPath } from '../../utils/Constants'
import HomeFilter from '../filters/homeFilter'

function Houses() {
    const navigate = useNavigate()
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    let housesData = useSelector((state) => state.storage.housesCache)
    let searchedHouses = useSelector((state) => state.storage.searchedHouses)
    const dispatch = useDispatch()

    if (searchedHouses) {
        housesData = searchedHouses
    }

    function handleNavigateToRoommate() {
        navigate('/roommate')
    }

    function handleNavigateToDetail(id) {
        navigate(`/houses/${id}`)
    }

    function handleGetData() {
        console.log('Get Data')
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
                    <Button
                        auto
                        variant="flat"
                        onClick={() => setIsOpenFilter(true)}
                    >
                        Filter
                    </Button>
                    <Spacer space={10} />
                    <Button auto onClick={() => handleNavigateToRoommate()}>
                        Find roommate
                    </Button>
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
            {isOpenFilter ? (
                <HomeFilter onClose={() => setIsOpenFilter(false)} />
            ) : null}
        </div>
    )
}

export default Houses
