import { verifyAccessToken } from "./jwt_helper.js"

export const checkAuth = async (context: any) => {
  try {
    const authHeader = context.req.headers.authorization
    if (authHeader) {
      const accessToken = authHeader.split("Bearer ")[1]
      if (accessToken) {
        try {
          //const user = jwt.verify(accessToken, config.server.accessToken);
          const user = await verifyAccessToken(accessToken)
          return user
        } catch (error) {
          throw new Error("Token invalide/expiré")
        }
      }
      throw new Error(`le token d'authentification doit être au format Bearer [token]`)
    } else {
      throw new Error(
        `le token d'autorisation dans le header doit être renseigné : authHeader = ${authHeader}`
      )
    }
  } catch (error) {
    throw new Error(`le token d'autorisation dans le header doit être renseigné .... ${error}`)
  }
}
