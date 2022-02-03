import md5 from "md5"
import {addPerson, loginPerson, addPost} from "controllers"


export function addPost( req, res ) {
  const { content, login } = req.body
  addPost({login:login, content:content})

  return res.status(200).json({successfully: true})
}

export function loginPerson( req, res ) {
  const { login, password } = req.body
  const newLogin = loginPerson({login:login, password:md5(password)})

  if(newLogin===login)
    return res.status(200).json({successfully: true})

  else
    return res.status(400).json({successfully: false})
}

export function addPerson( req, res ) {
  const { login, password } = req.body
  const newLogin = addPerson({login:login, password:md5(password)})

  if(newLogin===login)
    return res.status(200).json({register: true})

  else
    return res.status(400).json({register: false})
}