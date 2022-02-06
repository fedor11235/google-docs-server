const pgp = require('pg-promise')()
require('dotenv/config')

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

async function addPersonDb(req){
    const {login, password} = req
    const result = await db.any(
        `
        INSERT INTO persons (login, password) VALUES ($1, $2)
        ON CONFLICT(login) DO NOTHING
        RETURNING *;
        `
        , [login, password]
        )
    return result
}

async function loginPersonDb(req){
    const { login } = req
    const result = await db.any(
        `
        SELECT * FROM "persons" WHERE LOGIN=($1) LIMIT 1;
        `
        , [login]
        )
    return result
}

module.exports =  {addPersonDb, loginPersonDb, addPostDb}


