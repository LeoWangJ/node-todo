const homedir = require('os').homedir()
const fs = require('fs')
const p = require('path')
const dbPath = p.join(homedir, '.todo')

const db = {
    read: (path = dbPath) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, {
                flag: 'a+'
            }, (err, data) => {
                if (err) return reject(err)
                let list
                try {
                    list = JSON.parse(data.toString())
                } catch (error) {
                    list = []
                }
                resolve(list)
            })
        })
    },
    write: (list, path = dbPath) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(list) + '\n', (err) => {
                if (err) return reject(err)
                resolve()
            })
        })
    }
}
module.exports = db;