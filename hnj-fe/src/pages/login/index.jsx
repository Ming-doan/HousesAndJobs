import style from './style.module.scss'
import logo from '../../assets/Logo.png'
import loginImage from '../../assets/login_image.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, loginWithGoogle } from '../../apis/authentication'
import Text from '../../components/Utils/text'
import Input from '../../components/Inputs/input'
import Button from '../../components/Buttons/button'
import Spacer from '../../components/Utils/spacer'
import GestureDetector from '../../components/Utils/gestureDetector'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleLogin() {
        await login(email, password)
        navigate('/houses')
    }

    async function handleLoginWithGoogle() {
        await loginWithGoogle()
        navigate('/houses')
    }

    return (
        <div className={style.page}>
            <div className={style.form}>
                <div className={style.formWrapper}>
                    <div>
                        <img src={logo} alt="logo" />
                    </div>
                    <Spacer space={20} />
                    <Text h1>Welcome</Text>
                    <Spacer space={20} />
                    <div className={style.input}>
                        <Text>Email</Text>
                        <Spacer space={5} />
                        <Input
                            prompt="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <Spacer space={20} />
                    <div className={style.input}>
                        <Text>Password</Text>
                        <Spacer space={5} />
                        <Input
                            prompt="Enter your password"
                            type={showPassword ? 'text' : 'password'}
                            suffix={
                                <GestureDetector
                                    onPress={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <AiOutlineEye />
                                    ) : (
                                        <AiOutlineEyeInvisible />
                                    )}
                                </GestureDetector>
                            }
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Spacer space={60} />
                    <Button onClick={() => handleLogin()}>Sign in</Button>
                    <Spacer space={20} />
                    <Button
                        variant="outline"
                        onClick={() => handleLoginWithGoogle()}
                    >
                        <FcGoogle />
                        <Spacer space={5} />
                        Sign in with Google
                    </Button>
                </div>
            </div>
            <div className={style.image}>
                <img src={loginImage} alt="login" />
            </div>
        </div>
    )
}

export default LoginPage
