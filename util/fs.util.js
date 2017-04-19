const fs = require('fs-extra')
const path = require('path')
const uuidGen = require('uuid/v1');
const appConfig = require('../config/app/app.config')

module.exports = function () {
  return {
    generateFileTreePath(){
      let arr = Array.from(arguments)
      const day = new Date().getDate()
      const month = new Date().getMonth() + 1
      const year = new Date().getFullYear()
      let timeBasedDir = [year, month, day].map(String)
      arr.push(...timeBasedDir)
      return path.join(...arr)
    },
    generateFileName(ext){
      return `${uuidGen()}.${ext}`
    },
    ensureDirectoryExists(path){
      return new Promise((resolve, reject) => {
        fs.ensureDir(path, (error, data) => {
          if (error) return reject(error)
          return resolve()
        })
      })
    },
    writeFileToDisk(fileName, data){
      return new Promise((resolve, reject) => {
        fs.outputFile(fileName, data, (error) => {
          if (error) {
            console.log('writePicture error: ' + error)
            return reject('writePicture error: ' + error)
          }
          return resolve()
        })
      })
    },
    joinDirectory(){
      return path.join(...arguments)
    },
    getStoragePath(){
      return appConfig.storagePath
    }
  }
}