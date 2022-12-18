import style from './style.module.scss'
import Logo from '../../assets/Logo.png'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    getCurrentUser,
    fetchUserData,
    logout,
} from '../../apis/authentication'
import {
    setCurrentUser,
    setHousesCache,
    setJobsCache,
} from '../../utils/appStorage'
import { getUserAvatar } from '../../utils/utils'
import Button from '../Buttons/button'
import Spacer from '../Utils/spacer'
import { HiOutlineLogout } from 'react-icons/hi'

function Navbar() {
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.storage.currentUser)
    const dispatch = useDispatch()

    function clearCache() {
        dispatch(setHousesCache(null))
        dispatch(setJobsCache(null))
    }

    function handleNavigateToHome() {
        navigate('/')
        clearCache()
    }

    function handleNavigateToMap() {
        navigate('/map')
    }

    function handleNavigateToLogIn() {
        navigate('/login')
    }

    async function fetchUser(uid) {
        const user = await fetchUserData(uid)
        dispatch(setCurrentUser(user))
    }

    async function handleLogout() {
        logout()
        dispatch(setCurrentUser(null))
    }

    function getActionsUI() {
        if (getCurrentUser()) {
            if (currentUser) {
                return (
                    <Fragment>
                        <Button
                            auto
                            variant="outline"
                            onClick={() => handleNavigateToMap()}
                        >
                            Search on Map
                        </Button>
                        <Spacer space={40} />
                        <div className={style.avatar}>
                            <img
                                src={getUserAvatar(currentUser.avatar)}
                                alt=""
                            />
                        </div>
                        <Spacer space={10} />
                        <Button auto variant="flat" onClick={handleLogout}>
                            <HiOutlineLogout />
                        </Button>
                    </Fragment>
                )
            } else {
                const user = getCurrentUser()
                fetchUser(user.uid)
            }
        } else {
            return (
                <Fragment>
                    <Button
                        auto
                        variant="outline"
                        onClick={() => handleNavigateToMap()}
                    >
                        Search on Map
                    </Button>
                    <Spacer space={10} />
                    <Button auto onClick={() => handleNavigateToLogIn()}>
                        Sign in
                    </Button>
                </Fragment>
            )
        }
    }

    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.brand} onClick={handleNavigateToHome}>
                    <img src={Logo} alt="logo" />
                    <span>Houses And Jobs</span>
                </div>
                <div className={style.actions}>{getActionsUI()}</div>
            </div>
        </div>
    )
}

export default Navbar
