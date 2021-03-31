// Number formatter
export function formatDistance(distanceString) {
  const distance = Number(distanceString)

  if (distance < 0) {
    return null
  } else if (distance >= 0 && distance < 300) {
    return '< 300 m'
  } else if (distance >= 300 && distance < 1000) {
    return(new Intl.NumberFormat('en-GB',  { style: 'unit', maximumSignificantDigits: 2,  unit: 'meter' }).format(distance))
  } else if (distance >= 1000 && distance < 20000) {
    return(new Intl.NumberFormat('en-GB',  { style: 'unit', maximumSignificantDigits: 3,  unit: 'kilometer' }).format(distance / 1000))
  } else if (distance >= 20000) {
    return '> 20 km'
  }
}

export function formatPrice(priceString) {
  const price = Number(priceString);

  return(new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price))
}

export function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString)

  return(new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' }).format(dateTime))
}
