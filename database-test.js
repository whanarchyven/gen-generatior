const sqlite = require('sqlite');

async function setup() {
    const db = await sqlite.open('./mydb.sqlite');
    await db.migrate({force: 'last'});

    const gen = await db.all('SELECT * FROM Gen');
    console.log('ALL PEOPLE', JSON.stringify(gen, null, 2));

}

setup();