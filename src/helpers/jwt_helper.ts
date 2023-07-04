import createError from "http-errors"
import JWT from "jsonwebtoken"
import { WithId } from "mongodb"
import { userInfo } from "os"

type PayLoadJWT = {
  UserInfo: {
    _id: string
    roles: ("Admin" | "Artisan" | "Indep" | "Influenceur" | "Entreprise" | "Etudiant" | "Public")[]
  }
}

export const signAccessToken = (user: PayLoadJWT): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = user
    const options = {
      //expiresIn: "15m",
      //expiresIn: "15s",
      expiresIn: "30s",
      issuer: process.env.ISSUER_JWT,
      audience: user.UserInfo._id, // ce jwt est pour ce client
    }
    JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, options, (error, token) => {
      if (error) {
        reject(new createError.InternalServerError())
      }
      resolve(token!)
    })
  })
}

export const verifyAccessToken = async (accessToken: string): Promise<PayLoadJWT> => {
  const optionJWT: any = (resolve: any, reject: any) => (err: any, payload: PayLoadJWT) => {
    if (err) {
      reject(err)
      //throw new Error("Token invalide/expiré");
    }
    resolve(payload)
  }
  return new Promise((resolve, reject) => {
    const optionVer = optionJWT(resolve, reject)
    JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, optionVer)
  })
}

// export const signRefreshToken = (user: UserInt): Promise<string> => {
export const signRefreshToken = (user: WithId<Partial<UserAdminType>>): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = user
    const options = {
      // expiresIn: "7d",
      //expiresIn: "30s",
      expiresIn: "1m",
      //expiresIn: "30m",
      issuer: process.env.ISSUER_JWT,
      audience: user._id,
    }
    JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET, options, (error, token: any) => {
      if (error) {
        reject(new createError.InternalServerError())
      }
      resolve(token)
    })
  })
}

export const verifyRefreshToken = (refreshToken: string): Promise<UserAdminType> => {
  const optionJWT: any = (resolve: any, reject: any) => (err: any, decodedValue: UserAdminType) => {
    if (err) {
      return reject(new createError.Unauthorized())
    }
    resolve(decodedValue)
  }
  return new Promise((resolve, reject) => {
    const optionVer = optionJWT(resolve, reject)
    JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, optionVer)
  })
}

export const verifyAccessTokenReq = async (req: RequestExtended): Promise<PayLoadJWT> => {
  const optionJWT: any = (resolve: any, reject: any) => (err: any, payload: PayLoadJWT) => {
    if (err) {
      return err
    }
    req.user = payload.UserInfo._id
    req.roles = payload.UserInfo.roles
    resolve(userInfo)
  }

  return new Promise((resolve, reject) => {
    if (!req.cookies.auth) {
      resolve(null!) /*next(new createError.Unauthorized())*/
      return
    }
    if (!req.user) {
      req.user = ""
      req.roles = []
      resolve({ UserInfo: { _id: "", roles: [] } })
    }
    const authHeader = req.cookies.auth
    const accessToken = authHeader.split("Bearer ")[1]
    JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, optionJWT)
  })
}
