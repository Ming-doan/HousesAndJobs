import style from './style.module.scss'
import Logo from '../../assets/Logo.png'
import { Fragment } from 'react'
import Button from '../Buttons/button'
import Spacer from '../Utils/spacer'

function Navbar({ isAuth }) {
    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.brand}>
                    <img src={Logo} alt="logo" />
                    <span>House And Jobs</span>
                </div>
                <div className={style.actions}>
                    {!isAuth ? (
                        <Fragment>
                            <Button auto variant="flat">
                                Sign up
                            </Button>
                            <Spacer space={20} />
                            <Button auto>Sign in</Button>
                        </Fragment>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Navbar
