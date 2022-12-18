import style from './footer.module.scss'
import Text from '../../components/Utils/text'
import Spacer from '../../components/Utils/spacer'

function Footer() {
    return (
        <div className={style.footer}>
            <div className={style.wrapper}>
                <Text color="gray100" h2>
                    Houses And Jobs
                </Text>
                <Text color="gray100">Contributors</Text>
                <Text color="gray100" helper>
                    - Trần Tiến Thành
                </Text>
                <Text color="gray100" helper>
                    - Đoàn Quang Minh `quangminh57dng@gmail.com`
                </Text>
                <Text color="gray100" helper>
                    - Phan Gia Huy
                </Text>
                <Text color="gray100" helper>
                    - Đinh Ngọc Hà
                </Text>
                <Text color="gray100" helper>
                    - Nguyễn Vũ Gia Hân
                </Text>
                <Spacer space={20} />
                <Text color="gray100">Copyright 2022 - The Solution Team</Text>
            </div>
        </div>
    )
}

export default Footer
