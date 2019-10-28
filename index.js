const db = require('./db')
module.exports.add = async (title) => {
    const list = await db.read()
    list.push({ title, done: false })
    await db.write(list)
}