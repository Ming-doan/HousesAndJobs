import style from './style.module.scss'
import { Fragment, useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchedHouses, setSearchedJobs } from '../../utils/appStorage'
import Loading from '../../components/Utils/loading'
import Button from '../../components/Buttons/button'
import Spacer from '../../components/Utils/spacer'
import Input from '../../components/Inputs/input'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'
import Expanded from '../../components/Utils/expanded'
import Text from '../../components/Utils/text'
import seach from '../../utils/searchEngine'

const TABS = [
    {
        name: 'houses',
        label: 'Accomodations',
    },
    {
        name: 'jobs',
        label: 'Jobs',
    },
]
let feedingIndex = 0
const TextEllipsis = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}

function Map({ feed, center }) {
    return (
        <GoogleMap zoom={15} center={center} mapContainerClassName={style.map}>
            {feed.map((item) => {
                console.log(item.latitude, item.longitude)
                return (
                    <Marker
                        position={{ lat: item.latitude, lng: item.longitude }}
                    />
                )
            })}
        </GoogleMap>
    )
}

function MapPage() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })
    const navigate = useNavigate()
    const [tabs, setTab] = useState(TABS[0])
    const [feeding, setFeeding] = useState([])
    const [searchingValue, setSearchingValue] = useState('')
    const [center, setCenter] = useState({ lat: 15.9684812, lng: 108.2583627 })
    const storage = useSelector((state) => state.storage)

    function handleSetTab(tab) {
        setTab(tab)
    }

    function handleNavigateToDetail() {
        if (tabs.name === 'houses') {
            navigate(`/houses/${feeding[feedingIndex].id}`)
        } else if (tabs.name === 'jobs') {
            navigate(`/jobs/${feeding[feedingIndex].id}`)
        }
    }

    function handleSetCenter() {
        if (feedingIndex < 0) {
            feedingIndex = 0
        } else if (feedingIndex >= feeding.length) {
            feedingIndex = feeding.length - 1
        }
        console.log(feedingIndex)
        if (feeding.length === 0) return
        setCenter({
            lat: feeding[feedingIndex].latitude,
            lng: feeding[feedingIndex].longitude,
        })
    }

    function handleSearchingValue() {
        if (searchingValue) {
            if (tabs.name === 'houses') {
                const searchedHouses = seach(
                    storage.housesCache,
                    searchingValue
                )
                setFeeding(searchedHouses)
            } else if (tabs.name === 'jobs') {
                const searchedJobs = seach(storage.jobsCache, searchingValue)
                setFeeding(searchedJobs)
            } else {
                setFeeding([])
            }
        } else {
            if (tabs.name === 'houses') {
                setFeeding(storage.housesCache)
            } else if (tabs.name === 'jobs') {
                setFeeding(storage.jobsCache)
            } else {
                setFeeding([])
            }
        }
    }

    function handleNavigateToHome() {
        navigate('/')
    }

    useEffect(() => {
        handleSearchingValue(searchingValue)
    }, [])

    if (!isLoaded) return <Loading />

    return (
        <div className={style.container}>
            <Map feed={feeding} center={center} />
            <div className={style.overlay}>
                <Button
                    auto
                    variant="flat"
                    onClick={() => handleNavigateToHome()}
                >
                    <BsArrowLeft />
                </Button>
                <Spacer space={20} />
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
                <Spacer space={10} />
                <Input
                    onChange={(e) => setSearchingValue(e.target.value)}
                    value={searchingValue}
                    suffix={
                        <Button
                            auto
                            variant="flat"
                            onClick={() => handleSearchingValue()}
                        >
                            <FiSearch />
                        </Button>
                    }
                />
                <Spacer space={40} />
                <Text h3>{feeding[feedingIndex].title}</Text>
                <Spacer space={10} />
                <div className={style.content}>
                    {feeding[feedingIndex].descriptions.map(
                        (description, index) => (
                            <Text key={index} helper style={TextEllipsis}>
                                {description}
                            </Text>
                        )
                    )}
                </div>
                <Spacer space={10} />
                <Button expanded onClick={() => handleNavigateToDetail()}>
                    See detail
                </Button>
                <Spacer space={40} />
                <div className={style.flex}>
                    <Button
                        auto
                        variant="flat"
                        onClick={() => {
                            feedingIndex--
                            handleSetCenter()
                        }}
                    >
                        <BsArrowLeft />
                    </Button>
                    <Spacer space={10} />
                    <Button
                        auto
                        variant="flat"
                        onClick={() => {
                            feedingIndex++
                            handleSetCenter()
                        }}
                    >
                        <BsArrowRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default MapPage
