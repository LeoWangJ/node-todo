const fs = jest.genMockFromModule('fs');
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

let readMocks = {}

fs.setReadMock = (path, error, data) => {
    readMocks[path] = [error, data]
}

fs.readFile = (path, options, callback) => {
    if (callback === undefined) {
        callback = options
    }
    if (readMocks[path]) {
        callback(...readMocks[path])
    } else {
        _fs.readFile(path, options, callback)
    }
}

let writeMocks = {}

fs.setWriteMocks = (path, fn) => {
    writeMocks[path] = fn
}
fs.writeFile = (path, data, options, callback) => {
    if (callback === undefined) {
        callback = options
    }

    if (writeMocks[path]) {
        writeMocks[path](path, data, options, callback)
    } else {
        _fs.writeFile(path, data, options, callback)
    }
}

fs.clearMocks = () => {
    readMocks = {}
    writeMocks = {}
}

module.exports = fs