import style from './style.module.scss'
import Button from '../../components/Buttons/button'
import { GrClose } from 'react-icons/gr'

function ImageModal({ images, onClose }) {
    return (
        <div className={style.container}>
            <div className={style.close}>
                <Button auto variant="flat" onClick={onClose}>
                    <GrClose />
                </Button>
            </div>
            <div className={style.imageContainer}>
                {images.map((image, index) => (
                    <div className={style.image} key={index}>
                        <img src={image} alt="image" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImageModal
