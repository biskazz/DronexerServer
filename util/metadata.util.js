const exifParser = require('exif-parser')

function filterMetadata(metadata) {
  let outputMetadata = {}
  if (metadata.hasOwnProperty('tags')) {
    outputMetadata.lat = metadata.tags.GPSLatitude
    outputMetadata.lng = metadata.tags.GPSLongitude
    outputMetadata.alt = metadata.tags.GPSAltitude
    outputMetadata.make = metadata.tags.Make
    outputMetadata.model = metadata.tags.Model
    outputMetadata.dateTaken = metadata.tags.DateTimeOriginal || metadata.tags.CreateDate
  }
  if (outputMetadata.lat) outputMetadata.lat = outputMetadata.lat.toFixed(5)
  if (outputMetadata.lng) outputMetadata.lng = outputMetadata.lng.toFixed(5)
  if (outputMetadata.alt) outputMetadata.alt = Math.round(outputMetadata.alt)
  return outputMetadata
}

module.exports = {
  extractMetadata(picture, fileType) {
    if (fileType.mime !== 'image/jpeg') {
      return {}
    }
    try {
      let metadata = exifParser.create(picture.buffer).parse()
      return filterMetadata(metadata)
    } catch (error) {
      console.error(error)
      return {}
    }
  },
  isGenuineDronePicture(metadata) {
    return (metadata &&
      metadata.hasOwnProperty('alt') &&
      metadata.hasOwnProperty('lng') &&
      metadata.hasOwnProperty('lat') &&
      metadata.hasOwnProperty('dateTaken'))
  }

}
