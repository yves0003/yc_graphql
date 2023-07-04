import { ContactsApi, CreateContact, ContactsApiApiKeys, UpdateContact } from "@sendinblue/client"
import express, { Request, Response } from "express"
import { verifEmail } from "../helpers/verif_email.js"

const apiInstance = new ContactsApi()

apiInstance.setApiKey(ContactsApiApiKeys.apiKey, process.env.SENDINBLUE_API_KEY)
let createContact = new CreateContact()
let updateContact = new UpdateContact()

const router = express.Router()

router.post("/sendemail", async (req: Request, res: Response) => {
  try {
    const { method } = req
    const { email_field, locale, name_field, code_field } = req.body as {
      [x: string]: string
    }
    if (method !== "POST" || email_field === "" || !verifEmail(email_field)) {
      return res.status(400).json({ message: "Not allowed" })
    } else {
      try {
        if (name_field) {
          createContact.attributes = {
            FIRSTNAME: name_field.split(" ")[0],
            LASTNAME: name_field.split(" ")[1] || "",
            LOCALE: locale,
            CODE: code_field,
          }
        } else {
          createContact.attributes = {
            LOCALE: locale,
            CODE: code_field,
          }
        }
        createContact.email = email_field
        createContact.listIds = [16]
        await apiInstance.createContact(createContact)
        return res.status(200).json({ success: true })
      } catch (error: any) {
        if (error.response.body.code === "duplicate_parameter" && name_field && name_field !== "") {
          //delete contact
          await apiInstance.deleteContact(email_field)
          //créer de nouveau pour envoyer un email
          if (name_field) {
            createContact.attributes = {
              FIRSTNAME: name_field.split(" ")[0],
              LASTNAME: name_field.split(" ")[1] || "",
              LOCALE: locale,
              CODE: code_field,
            }
          } else {
            createContact.attributes = {
              LOCALE: locale,
              CODE: code_field,
            }
          }
          createContact.email = email_field
          createContact.listIds = [16]
          await apiInstance.createContact(createContact)
          // updateContact.attributes = {
          //   FIRSTNAME: name_field.split(" ")[0],
          //   LASTNAME: name_field.split(" ")[1] || "",
          //   CODE: code_field
          // };
          // await apiInstance.updateContact(email_field, updateContact);
          return res.status(200).send({ success: true })
        } else {
          return res.status(200).send({
            success: false,
            message: error,
          })
        }
      }
    }
  } catch (error) {
    return res.status(400).json({ message: "Error Not send Email" })
  }
})

export { router as sendemailRoute }
