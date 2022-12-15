import loading from './loading.module.css'

function Loading() {
    return (
        <div className={loading.container}>
            <div className={loading.ldsEllipsis}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loading
