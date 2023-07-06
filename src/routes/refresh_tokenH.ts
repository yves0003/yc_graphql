import express, { Request, Response } from "express"
import { Db } from "mongodb"
import { signAccessToken, signRefreshToken } from "../helpers/jwt_helper.js"
import { verifyRefreshToken } from "../helpers/jwt_helper.js"
import { adminUsers } from "../DB/Tables.js"

const router = express.Router()
const refreshTokenRouteDB = (db: Db) => {
  return router.post("/refresh_tokenH", async (req: Request, res: Response) => {
    const auth = req.cookies?.jid
    if (!auth || auth === "undefined") {
      return res.send({ success: false, accessToken: "" })
    }
    try {
      const payload = await verifyRefreshToken(auth)
      const foundUser = await adminUsers.findOne(db, {
        _id: payload._id,
      })
      if (!foundUser) {
        return res.send({ sucess: false, accessToken: "" })
      }
      if (foundUser.tokenVersion !== payload.tokenVersion) {
        return res.send({ sucess: false, accessToken: "" })
      }
      const roles = Object.values(foundUser.roles!)
      const accessToken = await signAccessToken({
        UserInfo: { _id: foundUser!._id!, roles },
      })
      const newRefreshToken = await signRefreshToken({
        _id: payload._id,
        tokenVersion: foundUser.tokenVersion,
      })
      res.cookie("jid", newRefreshToken, {
        httpOnly: true,
      })
      res.json({
        accessToken,
        refreshToken: newRefreshToken,
      })
      return
    } catch (error) {
      return res.send({ success: false, accessToken: "", refreshToken: "" })
    }
  })
}

export { refreshTokenRouteDB as refreshTokenRoute }
