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
                    - Trần Tiến Thành `trantienthanh2306@gmail.com`
                </Text>
                <Text color="gray100" helper>
                    - Đoàn Quang Minh `quangminh57dng@gmail.com`
                </Text>
                <Text color="gray100" helper>
                    - Phan Gia Huy `phanhuy30012003@gmail.com`
                </Text>
                <Text color="gray100" helper>
                    - Đinh Ngọc Hà `hadnds170325@fpt.edu.vn`
                </Text>
                <Text color="gray100" helper>
                    - Nguyễn Vũ Gia Hân `hannvgds170437@fpt.edu.vn`
                </Text>
                <Spacer space={20} />
                <Text color="gray100">Copyright 2022 - The Solution Team</Text>
            </div>
        </div>
    )
}

export default Footer
