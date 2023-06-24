type CoursType = {
  _id?: string
  title: string
  prof: string
  categorie: string
  excerpt: string
  description: string
  prix: string
  tags: string[]
  link_image: string
  nbEleves: number
  nbSeances: number
  nbEleveListeAttente: number
  idStripe: string
  dateCreation?: Date
  dateUpdate?: Date
}
