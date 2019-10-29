const db = require('./db')
module.exports.add = async (title) => {
    const list = await db.read()
    list.push({ title, done: false })
    await db.write(list).then(() => {
        console.log('添加成功')
    }, () => {
        console.log('添加失敗')
    })
}

module.exports.clear = async () => {
    await db.write([]).then(() => {
        console.log('清除成功')
    }, () => {
        console.log('清除失敗')
    })
}

module.exports.showAll = async () => {
    let list = await db.read()
    list.forEach((task, index) => {
        console.log(`${task.done ? `[x]` : `[_]`} ${index + 1} - ${task.title}`)
    })
}