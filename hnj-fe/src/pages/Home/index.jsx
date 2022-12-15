import style from './style.module.scss'
import { Fragment, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
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

function HomeLayout({ isAuth }) {
    const [tabs, setTab] = useState(TABS[0])
    const navigate = useNavigate()

    function handleSetTab(tab) {
        setTab(tab)
        navigate(`/${tab.name}`)
    }

    return (
        <div>
            <Navbar isAuth={isAuth} />
            <Spacer space={80} />
            <div className={style.searchBox}>
                <Input
                    prefix={<FiSearch />}
                    className={style.searchBar}
                    placeholder="Search"
                    suffix={<Button auto>Search on map</Button>}
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
