function GestureDetector({ children, onPress }) {
    return (
        <div style={{ cursor: 'pointer' }} onClick={onPress}>
            {children}
        </div>
    )
}

export default GestureDetector
