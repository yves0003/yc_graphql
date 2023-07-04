import express, { Request, Response } from "express"
const router = express.Router()
import jwtDecode, { JwtPayload } from "jwt-decode"

router.post("/verif_tokenH", async (req: Request, res: Response) => {
  try {
    const auth = req.cookies.jid
    const { exp } = jwtDecode<JwtPayload>(auth)
    if (exp && exp * 1000 < Date.now()) {
      return res.status(200).json({
        expired: true,
      })
    } else {
      return res.status(200).json({
        expired: false,
      })
    }
  } catch (error) {
    return res.status(200).json({
      expired: false,
    })
  }
})

export { router as verifTokenRoute }
