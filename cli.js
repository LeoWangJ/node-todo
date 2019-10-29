const program = require('commander');
const api = require('./index.js')
program
    .option('-x, --xxx', 'what the x')
program
    .command('add')
    .description('add a task')
    .action((...args) => {
        let words = args.slice(0, -1).join(' ')
        api.add(words)
    });
program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        api.clear()
    });
program.parse(process.argv);


if (process.argv.length === 2) {
    api.showAll()
}