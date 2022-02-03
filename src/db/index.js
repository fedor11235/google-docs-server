const pgp = require('pg-promise')();
require('dotenv/config');

const db = pgp({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
})

async function addPostDb(content, login){
    const result = await db.any(
        `
        INSERT INTO posts (content, person_login) VALUES ($1, $2)
        `
        , [content, login]
        )
    console.log(result)
}

async function addPersonDb(login, password){
    const result = await db.any(
        `
        INSERT INTO persons (login, password) VALUES ($1, $2)
        ON CONFLICT(login) DO NOTHING
        RETURNING (login);
        `
        , [login, password]
        )
    return result
}


async function loginPersonDb(login, password){
    const result = await db.any(`
        SELECT "login" FROM "persons" WHERE LOGIN=($1) LIMIT 1;
        `
        , [login, password]
        )
    return result
}

module.exports =  {addPersonDb, loginPersonDb, addPostDb}


