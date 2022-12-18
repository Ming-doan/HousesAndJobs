import style from './style.module.scss'
import { Fragment, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchedHouses, setSearchedJobs } from '../../utils/appStorage'
import seach from '../../utils/searchEngine'
import Navbar from '../../components/Navbar/navbar'
import Input from '../../components/Inputs/input'
import Button from '../../components/Buttons/button'
import Spacer from '../../components/Utils/spacer'
import Footer from '../../components/Utils/footer'
import { FiSearch } from 'react-icons/fi'

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

function HomeLayout() {
    const [tabs, setTab] = useState(TABS[0])
    const [searchingValue, setSearchingValue] = useState('')
    const housesData = useSelector((state) => state.storage.housesCache)
    const jobsData = useSelector((state) => state.storage.jobsCache)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleSetTab(tab) {
        setTab(tab)
        setSearchingValue('')
        dispatch(setSearchedHouses(null))
        dispatch(setSearchedJobs(null))
        navigate(`/${tab.name}`)
    }

    function handleSearchingValue() {
        if (searchingValue) {
            if (tabs.name === 'houses') {
                const searchedHouses = seach(housesData, searchingValue)
                dispatch(setSearchedHouses(searchedHouses))
            } else if (tabs.name === 'jobs') {
                const searchedJobs = seach(jobsData, searchingValue)
                dispatch(setSearchedJobs(searchedJobs))
            } else {
                return
            }
        } else {
            dispatch(setSearchedHouses(null))
            dispatch(setSearchedJobs(null))
        }
    }

    return (
        <div>
            <Navbar />
            <Spacer space={80} />
            <div className={style.searchBox}>
                <Input
                    className={style.searchBar}
                    placeholder="Search"
                    suffix={
                        <Button
                            auto
                            variant="flat"
                            onClick={() => handleSearchingValue()}
                        >
                            <FiSearch />
                        </Button>
                    }
                    value={searchingValue}
                    onChange={(e) => {
                        setSearchingValue(e.target.value)
                    }}
                />
                <div className={style.decoration}></div>
            </div>
            <div className={style.container}>
                <div className={style.wrapper}>
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
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HomeLayout
