import style from './style.module.scss'
import Button from '../../components/Buttons/button'
import Text from '../../components/Utils/text'
import CardItem from '../../components/Cards/items/item'

const MOCK_DATA = [
    {
        imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb_Aj78Ape4qECaMSoPj2qfqD32pO5-y4rCQ&usqp=CAU',
        title: 'Job 1',
        descriptions: ['Chủ nhà trọ: Nguyễn Văn A', 'Giá: 2.000.000đ'],
        location: 'Jakarta',
    },
    {
        imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb_Aj78Ape4qECaMSoPj2qfqD32pO5-y4rCQ&usqp=CAU',
        title: 'Job 2',
        descriptions: ['Chủ nhà trọ: Nguyễn Văn A', 'Giá: 2.000.000đ'],
        location: 'Jakarta',
    },
    {
        imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb_Aj78Ape4qECaMSoPj2qfqD32pO5-y4rCQ&usqp=CAU',
        title: 'Job 3',
        descriptions: ['Chủ nhà trọ: Nguyễn Văn A', 'Giá: 2.000.000đ'],
        location: 'Jakarta',
    },
    {
        imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb_Aj78Ape4qECaMSoPj2qfqD32pO5-y4rCQ&usqp=CAU',
        title: 'Job 3',
        descriptions: ['Chủ nhà trọ: Nguyễn Văn A', 'Giá: 2.000.000đ'],
        location: 'Jakarta',
    },
    {
        imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb_Aj78Ape4qECaMSoPj2qfqD32pO5-y4rCQ&usqp=CAU',
        title: 'Job 3',
        descriptions: ['Chủ nhà trọ: Nguyễn Văn A', 'Giá: 2.000.000đ'],
        location: 'Jakarta',
    },
    {
        imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb_Aj78Ape4qECaMSoPj2qfqD32pO5-y4rCQ&usqp=CAU',
        title: 'Job 3',
        descriptions: ['Chủ nhà trọ: Nguyễn Văn A', 'Giá: 2.000.000đ'],
        location: 'Jakarta',
    },
    {
        imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb_Aj78Ape4qECaMSoPj2qfqD32pO5-y4rCQ&usqp=CAU',
        title: 'Job 3',
        descriptions: ['Chủ nhà trọ: Nguyễn Văn A', 'Giá: 2.000.000đ'],
        location: 'Jakarta',
    },
]

function Jobs() {
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

export default Jobs
