import style from './style.module.scss'
import Logo from '../../assets/Logo.png'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Buttons/button'
import Spacer from '../Utils/spacer'

function Navbar({ isAuth }) {
    const navigate = useNavigate()

    function handleNavigateToHome() {
        navigate('/')
    }

    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.brand} onClick={handleNavigateToHome}>
                    <img src={Logo} alt="logo" />
                    <span>Houses And Jobs</span>
                </div>
                <div className={style.actions}>
                    {!isAuth ? (
                        <Fragment>
                            <Button auto variant="flat">
                                Sign up
                            </Button>
                            <Spacer space={10} />
                            <Button auto>Sign in</Button>
                        </Fragment>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Navbar
