const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function openDb() {
    return sqlite.open({
        filename: './database.sqlite',
        driver: sqlite3.Database,
    });
}

async function setup() {
    const db = await openDb();
    // await db.migrate(
    //     {
    //         migrationsPath: './migrations', //add cutom path to your migrations
    //         force: 'last'
    //     }
    // );

    const gens= await db.all('SELECT * FROM Gen');
    console.log(gens);
}

setup();