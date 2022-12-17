import style from './style.module.scss'
import { useParams } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setData, setIsOpen, setMessagesRoom } from './reducer'
import { readDocument } from '../../apis/readDocuments'
import { queryDocuments } from '../../apis/queryDocuments'
import Navbar from '../../components/Navbar/navbar'
import Footer from '../../components/Utils/footer'
import Spacer from '../../components/Utils/spacer'
import Button from '../../components/Buttons/button'
import Ratio from '../../components/Ratio/ratio'
import Text from '../../components/Utils/text'
import Loading from '../../components/Utils/loading'
import Expanded from '../../components/Utils/expanded'
import ChatPopUp from '../chatPopup'
import { CiLocationOn } from 'react-icons/ci'
import { AiOutlineMessage } from 'react-icons/ai'
import { collectionPath } from '../../utils/Constants'
import { detailPageTabs } from './constants'

function DetailPage() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [tabs, setTab] = useState(detailPageTabs[0])
    const [houseOption, setHouseOption] = useState(0)
    const data = useSelector((state) => state.detail.data)
    const user = useSelector((state) => state.storage.currentUser)
    const isOpenChat = useSelector((state) => state.detail.isOpen)
    const dispatch = useDispatch()

    function priceFormat(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    function handleSetTab(tab) {
        setTab(tab)
    }

    function handleSetHouseOption(index) {
        setHouseOption(index)
    }

    function handleOpenChat() {
        getMessagesRoom().then((room) => {
            dispatch(setMessagesRoom(room))
            dispatch(setIsOpen(true))
        })
    }

    async function getMessagesRoom() {
        const messageRoom = await queryDocuments(
            collectionPath.messages,
            'members',
            'array-contains-any',
            [user.id, data.owner.id],
            1
        )
        return messageRoom[0]
    }

    async function getData() {
        const houses = await readDocument(collectionPath.houses, id)
        const owner = await readDocument(collectionPath.users, houses.owner)
        let options = []
        for (let i = 0; i < houses.options.length; i++) {
            const option = await readDocument(
                collectionPath.options,
                houses.options[i]
            )
            options.push(option)
        }
        dispatch(
            setData({
                houses: houses,
                owner: owner,
                options: options,
            })
        )
        setIsLoading(false)
        console.log('Fetching')
    }

    useEffect(() => {
        getData()
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
                                <img src={data.houses.images[0]} alt="" />
                            </div>
                            <div className={style.images}>
                                {data.houses.images
                                    .slice(1, 5)
                                    .map((image, index) => (
                                        <div
                                            className={style.image}
                                            key={index}
                                        >
                                            <img src={image} alt="" />
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <Spacer space={40} />
                        <div className={style.owner}>
                            <div className={style.avatar}>
                                <img src={data.owner.avatar} alt="" />
                            </div>
                            <Spacer space={10} />
                            <div className={style.info}>
                                <Text b>{data.owner.name}</Text>
                                <Text helper>{data.owner.email}</Text>
                            </div>
                            <Expanded />
                            <Button
                                variant="flat"
                                auto
                                onClick={() => handleOpenChat()}
                            >
                                <AiOutlineMessage />
                            </Button>
                        </div>
                        <Spacer space={60} />
                        <div className={style.tabbar}>
                            {detailPageTabs.map((tab, index) => {
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
                                data.houses.descriptions.map(
                                    (description, index) => (
                                        <Fragment key={index}>
                                            <Text>{description}</Text>
                                            <Spacer space={20} />
                                        </Fragment>
                                    )
                                )}
                        </div>
                    </div>
                    <Spacer space={40} />
                    <div className={style.right}>
                        <div className={style.title}>
                            <Text h1>{data.houses.title}</Text>
                        </div>
                        <div className={style.location}>
                            <CiLocationOn />
                            <Text>{data.houses.location}</Text>
                        </div>
                        <Spacer space={40} />
                        <div className={style.options}>
                            {data.options.map((option, index) => (
                                <Fragment key={index}>
                                    <div className={style.option}>
                                        <Ratio
                                            isChecked={houseOption === index}
                                            onChange={() =>
                                                handleSetHouseOption(index)
                                            }
                                        />
                                        <Spacer space={10} />
                                        <div className={style.info}>
                                            <Text>{option.title}</Text>
                                            <Text helper>
                                                {option.descriptions[0]}
                                            </Text>
                                        </div>
                                        <Spacer space={10} />
                                        <div className={style.price}>
                                            <Text h4>
                                                {priceFormat(option.price)}
                                            </Text>
                                            <Text helper>{option.unit}</Text>
                                        </div>
                                    </div>
                                    <Spacer space={20} />
                                </Fragment>
                            ))}
                            <Spacer space={40} />
                            <div className={style.actions}>
                                <Button expanded variant="flat">
                                    Find roommate
                                </Button>
                                <Spacer space={10} />
                                <Button expanded>Booking</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {isOpenChat ? <ChatPopUp /> : null}
        </div>
    )
}

export default DetailPage
