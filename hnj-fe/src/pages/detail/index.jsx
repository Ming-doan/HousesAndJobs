import style from './style.module.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setData, setIsOpenChat, setMessagesRoom } from './reducer'
import { readDocument } from '../../apis/readDocuments'
import { writeDocument } from '../../apis/writeDocument'
import { updateDocument } from '../../apis/updateDocument'
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
import ReactStars from 'react-rating-stars-component'
import Link from '../../components/Buttons/link'
import ImageModal from '../modal/imageModal'

function DetailPage() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [tabs, setTab] = useState(detailPageTabs[0])
    const [houseOption, setHouseOption] = useState(0)
    const [comments, setComments] = useState(null)
    const [ratingComment, setRatingComment] = useState({ star: 0, comment: '' })
    const [isOpenImageModal, setIsOpenImageModal] = useState(false)
    const data = useSelector((state) => state.detail.data)
    const user = useSelector((state) => state.storage.currentUser)
    const isOpenChat = useSelector((state) => state.detail.isOpenChat)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function priceFormat(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    function handleNavigateToLogIn() {
        navigate('/login')
    }

    function handleNavigateToBooking() {
        navigate('/booking')
    }

    function handleOpenImageModal() {
        setIsOpenImageModal(true)
    }

    function handleCloseImageModal() {
        setIsOpenImageModal(false)
    }

    function handleSetTab(tab) {
        setTab(tab)
        if ((tab.name === 'comments') & !comments) {
            getComments()
        }
    }

    function handleSetHouseOption(index) {
        setHouseOption(index)
    }

    function handleOpenChat() {
        getMessagesRoom().then((room) => {
            dispatch(setMessagesRoom(room))
            dispatch(setIsOpenChat(true))
        })
    }

    function handleSetRatingCommentAndStar(star, comment) {
        setRatingComment({ star: star, comment: comment })
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

    async function getComments() {
        console.log('Fetching comments')
        let commentsDoc = []
        for (let i = 0; i < data.houses.comments.length; i++) {
            const comment = await readDocument(
                collectionPath.comments,
                data.houses.comments[i]
            )
            const commentUser = await readDocument(
                collectionPath.users,
                comment.from
            )
            const commentData = {
                ...comment,
                user: {
                    id: commentUser.id,
                    name: commentUser.name,
                    avatar: commentUser.avatar,
                },
            }
            commentsDoc.push(commentData)
        }
        setComments(commentsDoc)
    }

    async function handleSendComment() {
        const comment = {
            from: user.id,
            rating: ratingComment.star,
            comment: ratingComment.comment,
        }
        const commentId = await writeDocument(collectionPath.comments, comment)

        await updateDocument(collectionPath.houses, data.houses.id, {
            comments: [commentId, ...data.houses.comments],
        })
        setRatingComment({ star: 0, comment: '' })
        const commentData = {
            ...comment,
            user: {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
            },
        }
        setComments([commentData, ...comments])
    }

    function getTabContent() {
        switch (tabs.name) {
            case 'descriptions':
                return data.houses.descriptions.map((description, index) => (
                    <Fragment key={index}>
                        <Text>{description}</Text>
                        <Spacer space={20} />
                    </Fragment>
                ))
            case 'comments':
                if (!comments) {
                    return null
                }
                return (
                    <Fragment>
                        {user ? (
                            <div className={style.writeComment}>
                                <Text h3>Leave your comments</Text>
                                <div className={style.rating}>
                                    <ReactStars
                                        count={5}
                                        value={ratingComment.star}
                                        onChange={(value) =>
                                            handleSetRatingCommentAndStar(
                                                value,
                                                ratingComment.comment
                                            )
                                        }
                                        size={32}
                                    />
                                    <Spacer space={20} />
                                    <Text>{ratingComment.star} star</Text>
                                </div>
                                <Spacer space={20} />
                                <div className={style.textField}>
                                    <textarea
                                        placeholder="Write your comment here"
                                        value={ratingComment.comment}
                                        onChange={(e) =>
                                            handleSetRatingCommentAndStar(
                                                ratingComment.star,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <Spacer space={20} />
                                <div className={style.actions}>
                                    <Button
                                        auto
                                        disabled={
                                            !ratingComment.comment |
                                            !ratingComment.star
                                        }
                                        onClick={() => handleSendComment()}
                                    >
                                        Comment
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Link
                                message={'Sign in to comment'}
                                onPress={() => handleNavigateToLogIn()}
                            />
                        )}
                        <Spacer space={40} />
                        {comments.map((comment, index) => (
                            <Fragment key={index}>
                                <div className={style.comment}>
                                    <div className={style.user}>
                                        <div className={style.avatar}>
                                            <img
                                                src={comment.user.avatar}
                                                alt=""
                                            />
                                        </div>
                                        <Spacer space={10} />
                                        <Text b>{comment.user.name}</Text>
                                        <Spacer space={20} />
                                        <Text>{comment.rating} star</Text>
                                        <Spacer space={10} />
                                        <ReactStars
                                            count={5}
                                            value={comment.rating}
                                            size={24}
                                            edit={false}
                                        />
                                    </div>
                                    <Spacer space={20} />
                                    <div className={style.info}>
                                        <Text>{comment.comment}</Text>
                                    </div>
                                </div>
                                <Spacer space={40} />
                            </Fragment>
                        ))}
                    </Fragment>
                )
            default:
                return null
        }
    }

    useEffect(() => {
        if (!data) {
            getData()
        }

        if (data) {
            setIsLoading(false)
        }
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <Navbar />
            <Spacer space={80} />
            <Spacer space={40} />
            <div className={style.container}>
                <div className={style.wrapper}>
                    <div className={style.left}>
                        <div className={style.hero}>
                            <div
                                className={style.preview}
                                onClick={() => handleOpenImageModal()}
                            >
                                <img src={data.houses.images[0]} alt="" />
                            </div>
                            <div className={style.images}>
                                {data.houses.images
                                    .slice(1, 5)
                                    .map((image, index) => (
                                        <div
                                            className={style.image}
                                            key={index}
                                            onClick={() =>
                                                handleOpenImageModal()
                                            }
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
                            {user ? (
                                user.id === data.houses.owner ? (
                                    <Button auto>Booked List</Button>
                                ) : (
                                    <Button
                                        variant="flat"
                                        auto
                                        onClick={() => handleOpenChat()}
                                    >
                                        <AiOutlineMessage />
                                    </Button>
                                )
                            ) : (
                                <Link
                                    message={'Sign in to chat'}
                                    onPress={() => handleNavigateToLogIn()}
                                />
                            )}
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
                            {getTabContent()}
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
                                <Button
                                    expanded
                                    onClick={() => handleNavigateToBooking()}
                                >
                                    Booking
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {isOpenChat ? <ChatPopUp /> : null}
            {isOpenImageModal ? (
                <ImageModal
                    images={data.houses.images}
                    onClose={() => handleCloseImageModal()}
                />
            ) : null}
        </div>
    )
}

export default DetailPage
