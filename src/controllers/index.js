const md5 = require('md5')
const {addPersonDb, loginPersonDb, addPostDb}  = require( '../db' )


function addPostController( req, res ) {
  const { content, login } = req.body
  addPostDb({login:login, content:content})

  return res.status(200).json({successfully: true})
}

function loginPersonController( req, res ) {
  const { login, password } = req.body
  const newLogin = loginPersonDb({login:login, password:md5(password)})

  if(newLogin===login)
    return res.status(200).json({successfully: true})

  else
    return res.status(400).json({successfully: false})
}

function addPersonController( req, res ) {
  const { login, password } = req.body
  const newLogin = addPersonDb({login:login, password:md5(password)})

  if(newLogin===login)
    return res.status(200).json({register: true})

  else
    return res.status(400).json({register: false})
}

module.exports =  {addPersonController, loginPersonController, addPostController}