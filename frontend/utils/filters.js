export function formatTime(time) {
  const dateTime = new Date(time)
  const parseTime = Date.parse(time)
  const getTime = Math.floor(parseTime / 1000)
  const now = Math.floor(Date.now() / 1000)
  const diff = now - getTime
  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  const just_now = 'Vừa xong',
    minutes_ago = 'phút trước',
    hours_ago = 'giờ trước',
    yesterday = 'Hôm qua',
    days_ago = 'ngày trước'

  if (diff == 0) {
    return just_now
  } else {
    const day_diff = Math.floor(diff / 86400)
    if (day_diff == 0) {
      if (diff < 120) return just_now
      else if (diff < 3600) return `${Math.floor(diff / 60)} ${minutes_ago}`
      else if (diff < 86400) return `${Math.floor(diff / 3600)} ${hours_ago}`
    }
    else if (day_diff == 1) return yesterday
    else if (day_diff <= 7) return `${day_diff} ${days_ago}`
    else return dateTime.toLocaleDateString('vi', options)
  }
}

export function websiteURL(domain, ssl) {
  const protocol = ssl ? 'https' : 'http'
  return `${protocol}://${domain}`
}