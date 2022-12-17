import style from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setJobsCache } from '../../utils/appStorage'
import { readDocuments } from '../../apis/readDocuments'
import Button from '../../components/Buttons/button'
import Text from '../../components/Utils/text'
import CardItem from '../../components/Cards/items/item'
import Loading from '../../components/Utils/loading'
import { collectionPath } from '../../utils/Constants'
import HomeFilter from '../filters/homeFilter'

function Jobs() {
    const navigate = useNavigate()
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const jobsData = useSelector((state) => state.storage.jobsCache)
    const dispatch = useDispatch()

    function handleNavigateToDetail(id) {
        navigate(`/jobs/${id}`)
    }

    function handleGetData() {
        console.log('Get Data')
        readDocuments(collectionPath.jobs).then((data) => {
            dispatch(setJobsCache(data))
        })
    }

    if (!jobsData) {
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
                </div>
            </div>
            {jobsData ? (
                <div className={style.cards}>
                    {jobsData.map((data, index) => (
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

export default Jobs
