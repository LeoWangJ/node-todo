const db = require('./db')
const inquirer = require('inquirer');

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

function askForCreateTask(list) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: '輸入任務標題',
      }
    ]).then(answer => {
      list.push({
        title: answer.title,
        done: false
      })
      db.write(list)
    })
}

function markAsDone(list, index) {
  list[index].done = true
  db.write(list)
}

function markAsUndone(list, index) {
  list[index].done = false
  db.write(list)
}

function editTitle(list, index) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: '新的標題',
        default: list[index].title,
      }
    ]).then(answer => {
      list[index].title = answer.title
      db.write(list)
    })
}
function remove(list, index) {
  list.splice(index, 1)
  db.write(list)
}
function askForAction(list, index) {
  let actions = { markAsDone, markAsUndone, editTitle, remove }
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: '請選擇操作',
        choices: [
          { name: '已完成', value: 'markAsDone' },
          { name: '未完成', value: 'markAsUndone' },
          { name: '改標題', value: 'editTitle' },
          { name: '刪除', value: 'remove' },
          { name: '退出', value: 'quit' }]
      }
    ]).then(answer => {
      let action = actions[answer.action]
      action && action(list, index)
    })
}

function printTasks(list) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'index',
        message: '請選擇您要操作的任務',
        choices: [{ name: '+ 創建任務', value: '-2' }, ...list.map((task, index) => {
          return {
            name: `${task.done ? `[x]` : `[_]`} ${index + 1} - ${task.title}`,
            value: index.toString()
          }
        }), { name: '退出', value: '-1' }]
      }
    ])
    .then(answer => {
      let index = parseInt(answer.index)
      if (index >= 0) {
        askForAction(list, index)
      } else if (index === -2) {
        //創建任務
        askForCreateTask(list)
      }
    });
}

module.exports.showAll = async () => {
  let list = await db.read()
  printTasks(list)
}