const md5 = require('md5')
const {addPersonDb, loginPersonDb, addPostDb}  = require( '../db' )

function addPostController( req, res ) {
  const { content, login } = req.body
  addPostDb({login:login, content:content})

  return res.status(200).json({successfully: true})
}

async function loginPersonController( req, res ) {
  const { login, password } = req.body
  const oldPerson = await loginPersonDb({ login:login })

  if( oldPerson[0]?.login === login && oldPerson[0].password === md5(password))
    return res.status(200).json({successfully: true, id:oldPerson[0].id})

  else
    return res.status(200).json({successfully: false})
}

async function addPersonController( req, res ) {

  const { login, password } = req.body
  const newPerson = await addPersonDb({login:login, password:md5(password)})

  if(newPerson[0]?.login === login)
    return res.status(200).json({successfully: true, id:newPerson[0].id})

  else return res.status(200).json({successfully: false})
}

module.exports =  {addPersonController, loginPersonController, addPostController}