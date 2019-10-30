const db = require('../db')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
    afterEach(() => {
        fs.clearMocks()
    })
    it('can read', async () => {
        let data = [{ title: 'test read', done: true }]
        fs.setReadMock('/xxx', null, JSON.stringify(data))
        const list = await db.read('/xxxz')
        expect(list).toStrictEqual(data);
    })
    it('can write', async () => {
        let fakeFile
        fs.setWriteMock('/yyy', (path, data, callback) => {
            fakeFile = data
            callback(null)
        })
        let list = [{ title: 'test write', done: true }]
        await db.write(list, '/yyy')
        expect(fakeFile).toStrictEqual(JSON.stringify(list) + '\n')
    })
})