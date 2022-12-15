import style from './style.module.scss'
import { useParams } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'
import { readDocument } from '../../apis/readDocuments'
import Navbar from '../../components/Navbar/navbar'
import Footer from '../../components/Utils/footer'
import Spacer from '../../components/Utils/spacer'
import Button from '../../components/Buttons/button'
import Text from '../../components/Utils/text'
import Loading from '../../components/Utils/loading'
import { CiLocationOn } from 'react-icons/ci'

const COLLECTION_PATH = 'Houses'
const TABS = [
    {
        name: 'descriptions',
        label: 'Descriptions',
    },
    {
        name: 'comments',
        label: 'Comments',
    },
]

function DetailPage() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    const [tabs, setTab] = useState(TABS[0])

    function handleSetTab(tab) {
        setTab(tab)
    }

    useEffect(() => {
        readDocument(COLLECTION_PATH, id).then((data) => {
            setIsLoading(false)
            setData(data)
        })
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <Navbar isAuth={false} />
            <Spacer space={80} />
            <Spacer space={40} />
            <div className={style.container}>
                <div className={style.wrapper}>
                    <div className={style.left}>
                        <div className={style.hero}>
                            <div className={style.preview}>
                                <img src={data.images[0]} alt="" />
                            </div>
                            <div className={style.images}>
                                {data.images.slice(1, 5).map((image, index) => (
                                    <div className={style.image} key={index}>
                                        <img src={image} alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Spacer space={40} />
                        <div className={style.tabbar}>
                            {TABS.map((tab, index) => {
                                return (
                                    <Fragment key={index}>
                                        <Button
                                            key={index}
                                            auto
                                            variant={
                                                tabs.name === tab.name
                                                    ? 'default'
                                                    : 'flat'
                                            }
                                            onClick={() => handleSetTab(tab)}
                                        >
                                            {tab.label}
                                        </Button>
                                        <Spacer space={10} />
                                    </Fragment>
                                )
                            })}
                        </div>
                        <div className={style.tabcontent}>
                            {tabs.name === 'descriptions' &&
                                data.descriptions.map((description, index) => (
                                    <Fragment key={index}>
                                        <Text>{description}</Text>
                                        <Spacer space={20} />
                                    </Fragment>
                                ))}
                        </div>
                    </div>
                    <Spacer space={40} />
                    <div className={style.right}>
                        <div className={style.title}>
                            <Text h1>{data.title}</Text>
                        </div>
                        <div className={style.location}>
                            <CiLocationOn />
                            <Text>{data.location}</Text>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DetailPage
