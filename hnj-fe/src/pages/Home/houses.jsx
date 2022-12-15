import style from './style.module.scss'
import Button from '../../components/Buttons/button'
import Spacer from '../../components/Utils/spacer'
import Text from '../../components/Utils/text'
import CardItem from '../../components/Cards/items/item'

const MOCK_DATA = [
    {
        imageUrl:
            'https://cafeland.vn/image-data/720-480/static1.cafeland.vn/cafelandnew/hinh-anh/2021/06/04/144/image-20210604083343-1.png',
        title: 'House 1',
        descriptions: ['Chủ nhà trọ: Nguyễn Văn A', 'Giá: 2.000.000đ'],
        location: 'Jakarta',
    },
    {
        imageUrl:
            'https://cafeland.vn/image-data/720-480/static1.cafeland.vn/cafelandnew/hinh-anh/2021/06/04/144/image-20210604083343-1.png',
        title: 'House 2',
        descriptions: ['Chủ nhà trọ: Nguyễn Văn A', 'Giá: 2.000.000đ'],
        location: 'Jakarta',
    },
    {
        imageUrl:
            'https://cafeland.vn/image-data/720-480/static1.cafeland.vn/cafelandnew/hinh-anh/2021/06/04/144/image-20210604083343-1.png',
        title: 'House 3',
        descriptions: ['Chủ nhà trọ: Nguyễn Văn A', 'Giá: 2.000.000đ'],
        location: 'Jakarta',
    },
    {
        imageUrl:
            'https://cafeland.vn/image-data/720-480/static1.cafeland.vn/cafelandnew/hinh-anh/2021/06/04/144/image-20210604083343-1.png',
        title: 'House 3',
        descriptions: ['Chủ nhà trọ: Nguyễn Văn A', 'Giá: 2.000.000đ'],
        location: 'Jakarta',
    },
    {
        imageUrl:
            'https://cafeland.vn/image-data/720-480/static1.cafeland.vn/cafelandnew/hinh-anh/2021/06/04/144/image-20210604083343-1.png',
        title: 'House 3',
        descriptions: ['Chủ nhà trọ: Nguyễn Văn A', 'Giá: 2.000.000đ'],
        location: 'Jakarta',
    },
    {
        imageUrl:
            'https://cafeland.vn/image-data/720-480/static1.cafeland.vn/cafelandnew/hinh-anh/2021/06/04/144/image-20210604083343-1.png',
        title: 'House 3',
        descriptions: ['Chủ nhà trọ: Nguyễn Văn A', 'Giá: 2.000.000đ'],
        location: 'Jakarta',
    },
    {
        imageUrl:
            'https://cafeland.vn/image-data/720-480/static1.cafeland.vn/cafelandnew/hinh-anh/2021/06/04/144/image-20210604083343-1.png',
        title: 'House 3',
        descriptions: ['Chủ nhà trọ: Nguyễn Văn A', 'Giá: 2.000.000đ'],
        location: 'Jakarta',
    },
]

function Houses() {
    return (
        <div className={style.content}>
            <div className={style.topActions}>
                <div className={style.left}>
                    <Text h3>Recommend for you</Text>
                </div>
                <div className={style.right}>
                    <Button auto variant="flat">
                        Filter
                    </Button>
                    <Spacer space={10} />
                    <Button auto>Find roommate</Button>
                </div>
            </div>
            <div className={style.cards}>
                {MOCK_DATA.map((data, index) => (
                    <CardItem
                        key={index}
                        imageUrl={data.imageUrl}
                        title={data.title}
                        descriptions={data.descriptions}
                        location={data.location}
                    />
                ))}
            </div>
        </div>
    )
}

export default Houses
