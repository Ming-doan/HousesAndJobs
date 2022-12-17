import mockAvatar from '../assets/mock_avatar.png'
import imagePlacehoder from '../assets/image_placeholder.png'

function getDisplayName(email) {
    const emailParts = email.split('@')
    return emailParts[0]
}

function getUserAvatar(avatar) {
    return avatar || mockAvatar
}

function getPreviewImage(image) {
    return image || imagePlacehoder
}

function timeFormat(time) {
    let t = new Date(1970, 0, 1)
    t.setSeconds(time.seconds)

    let day = t.getDay()
    if (day === 0) day = 'Sun'
    else if (day === 1) day = 'Mon'
    else if (day === 2) day = 'Tue'
    else if (day === 3) day = 'Wed'
    else if (day === 4) day = 'Thu'
    else if (day === 5) day = 'Fri'
    else if (day === 6) day = 'Sat'

    let hour = t.getHours()
    if (hour < 10) hour = '0' + hour

    let minute = t.getMinutes()
    if (minute < 10) minute = '0' + minute

    return `${day} ${hour}:${minute}`
}

export { getDisplayName, getUserAvatar, getPreviewImage, timeFormat }
