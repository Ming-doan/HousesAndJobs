import style from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { readDocuments } from '../../apis/readDocuments'
import Button from '../../components/Buttons/button'
import Spacer from '../../components/Utils/spacer'
import Text from '../../components/Utils/text'
import CardItem from '../../components/Cards/items/item'
import Loading from '../../components/Utils/loading'

const COLLECTION_PATH = 'Houses'

function Houses() {
    const navigate = useNavigate()
    const [datas, setDatas] = useState(null)

    function handleNavigateToDetail(id) {
        navigate(`/houses/${id}`)
    }

    useEffect(() => {
        readDocuments(COLLECTION_PATH).then((data) => {
            setDatas(data)
        })
    }, [])

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
            {datas ? (
                <div className={style.cards}>
                    {datas.map((data, index) => (
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
