const program = require('commander');

const {
  createProject,
  addComponent,
  addPage,
  addVue3Page,
  addVue3PageSetup,
  add,
  addAll,
  addStore
} = require('./actions');

const createCommands = () => {
  // 创建项目指令
  program
    .command('create <project> [otherArgs...]')
    .description('clone a repository into a newly created directory')
    .action(createProject);

  program
    .command('addcpn <name>')
    .description('add vue component, 例如: lt addcpn NavBar [-d src/components]')
    .action(name => addComponent(name, program.dest || 'src/components'))

  program
    .command('addpage <name>')
    .description('add vue page, 例如: lt addpage Home [-d dest]')
    .action(name => {
      addPage(name, program.dest || `src/pages/${name}`)
    })

  program
    .command('add3page <name>')
    .description('add vue page, 例如: lt add3page Home [-d dest]')
    .action(name => {
      addVue3Page(name, program.dest || `src/views/${name}`)
    })

  program
    .command('add3page_setup <name>')
    .description('add vue page and router, 例如: lt add3page_setup Home [-d dest]')
    .action(name => {
      addVue3PageSetup(name, program.dest || `src/views/${name}`)
    })

  program
    .command('add <name>')
    .description('add vue page and router, 例如: lt add Home [-d dest]')
    .action(name => {
      add(name, program.dest || `src/views/${name}`)
    })

  program
    .command('addAll <name>')
    .description('add vue page, router and store, 例如: lt addAll Home [-d dest]')
    .action(name => {
      addAll(name, program.dest || `src/views/${name}`)
    })

  program
    .command('addstore <name>')
    .description('add vue store, 例如: lt addstore favor [-d dest]')
    .action(name => {
      addStore(name, program.dest || `src/store/${name}`)
    })

  // 添加monorepo项目的新命令
  program
    .command('madd <name> <project>')
    .description('add vue page for monorepo project, 例如: lt madd Home cms-changed [-d views]')
    .action((name, project) => {
      const defaultPath = `apps/${project}/src/views/${name}`;
      add(name, program.dest ? `apps/${project}/src/${program.dest}` : defaultPath);
    });

  program
    .command('maddAll <name> <project>')
    .description('add vue page, router and store for monorepo project, 例如: lt maddAll Home cms-changed [-d views]')
    .action((name, project) => {
      const defaultPath = `apps/${project}/src/views/${name}`;
      addAll(name, program.dest ? `apps/${project}/src/${program.dest}` : defaultPath);
    });

  program
    .command('maddstore <name> <project>')
    .description('add vue store for monorepo project, 例如: lt maddstore favor cms-changed [-d store]')
    .action((name, project) => {
      const defaultPath = `apps/${project}/src/store/${name}`;
      addStore(name, program.dest ? `apps/${project}/src/${program.dest}` : defaultPath);
    });

  program
    .command('maddcpn <name> <project>')
    .description('add vue component for monorepo project, 例如: lt maddcpn NavBar cms-changed [-d components]')
    .action((name, project) => {
      const defaultPath = `apps/${project}/src/components`;
      addComponent(name, program.dest ? `apps/${project}/src/${program.dest}` : defaultPath);
    });

  program.command('test').action(() => {
    // terminal.spawn("npm", ['--version']);
    // terminal.exec("npm --version");
    // open('http://localhost:8080/');`
  })
}

module.exports = createCommands;
