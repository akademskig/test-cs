import { blacklist, blacklistedActivity, blacklistedPayment, blacklistedPlatform, emojiRegex, emailRegex, linkRegex, allowedLinksRegex } from './constants'

const filterBlacklisted = (text) => {
  let formatted = text.toLowerCase().replace('@', 'a').replace(/[^a-zA-Z0-9\s]/g, '').trim()
  const formattedList = formatted.split(' ').filter(w => !!w)
  const formattedJoined = formattedList.join('')

  for (let word of blacklistedActivity) {
    if (formattedJoined.match(word)) {
      return 'activity forbidden'
    }
  }
  for (let word of blacklistedPayment) {
    if (formattedJoined.match(word)) {
      return 'payment forbidden'
    }
  }
  for (let word of blacklistedPlatform) {
    if (formattedJoined.match(word)) {
      return 'platform forbidden'
    }
  }
  for (var category in blacklist) {
    for (var word of blacklist[category]) {
      for (var wordM of formattedList) {
        if (wordM.indexOf(word) !== -1) { return category + ' forbidden' }
      }
    }
  }
  return 'allowed'
}

const filterEmail = (text) => {
  const normalized = normalize(text).replace(/[^a-zA-Z0-9@.]/g, '')
  if (normalized.match(emailRegex)) {
    return 'email forbidden'
  }
  return 'allowed'
}

const filterLink = (text) => {
  let normalized = normalize(text).replace(/\s/g, ' ')
  let splitted = normalized.split(' ')
  if (normalized.match(linkRegex)) {
    if (!normalized.match(allowedLinksRegex)) {
      return 'link forbidden'
    }
  }
  for (var word of splitted) {
    if (word.match(linkRegex)) {
      if (!word.match(allowedLinksRegex)) {
        return 'link forbidden'
      }
    }
  }
  return 'allowed'
}
const filterForbidden = (original) => {
  const text = removeEmoji(original)
  const resBlacklisted = filterBlacklisted(text)
  if (resBlacklisted !== 'allowed') {
    return resBlacklisted
  }
  const resEmail = filterEmail(text)
  if (resEmail !== 'allowed') {
    return resEmail
  }

  const resLink = filterLink(text)
  if (resLink !== 'allowed') {
    return resLink
  }
  return 'allowed'
}

const removeEmoji = (text) => {
  return text.replace(emojiRegex, '')
}

const normalize = (text) => {
  return text.toLowerCase().trim()
}

export {
  filterForbidden
}
