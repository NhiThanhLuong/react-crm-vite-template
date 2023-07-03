export function capitalizeFirstLetter(str?: string) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function youtube_parser(url: string) {
  if (!url) return false
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match?.[7]?.length == 11 ? match[7] : false
}
