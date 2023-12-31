# Exemple de codes

## Table des Cours

### Query

#### FindOneCours

    query FindOneCours($coursId: String!) {
        findOneCours(coursId: $coursId) {
            ... on Cours {
            categorie
            dateCreation
            dateUpdate
            description
            excerpt
            _id
            tags
            idStripe
            }
        }
    }
    //inputs
    {
        "coursId": "oh0GHAOBQ93esIkp22aPj"
    }

### Mutation

#### CreateCours

    mutation Mutation($inputCours: CoursInput) {
        createCours(inputCours: $inputCours) {
            ... on Cours {
            categorie
            dateCreation
            dateUpdate
            description
            }
        }
    }
    //inputs
    {
        "inputCours": {
            "categorie": "abonnement",
            "description": "je decris ce que je vois",
            "excerpt": "alors tu dis quoi",
            "idStripe": "tghlkls",
            "link_image": "/link/image",
            "nbEleveListeAttente": 5,
            "nbEleves": 6,
            "nbSeances": 2,
            "prix": 25,
            "prof": "Yin",
            "tags": ["teste"],
            "title": "Premiere fois"
        }
    }

#### DeleteCours

    mutation DeleteCours($coursId: String!) {
        deleteCours(coursId: $coursId)
    }
    //inpput
    {
        "coursId": "XoAooDTd7WwvTxH-322ga"
    }

#### UpdateCOurs

    mutation UpdateCours($inputCours: CoursInput, $coursId: String) {
        updateCours(inputCours: $inputCours, coursId: $coursId) {
            ... on Cours {
            categorie
            dateCreation
            dateUpdate
            description
            excerpt
            tags
            }
        }
    }
    //inputs
    {
        "inputCours": {
            "categorie": "Nouvelle catégorie",
            "description": "décris le moi",
            "excerpt": "exemple de code",
            "tags": ["abonnement","enfant"]
        },
        "coursId": "1vIIfEaJzMXy8euZMdpaW"
    }

## Table des CoursByDate

### Mutation CoursByDate

#### CreateCoursByDate

    mutation CreateCoursByDate($inputCoursByDate: CoursByDateInput) {
        createCoursByDate(inputCoursByDate: $inputCoursByDate) {
            ... on CoursByDate {
                dateCreation
                dateJ
                dateUpdate
                eventHeureDebut
                eventHeureFin
                idEvent
                listInscrit
                listInteressee
                status
                _id
                title
            }
            ... on CoursByDateCreateErr {
                messageErrorCoursByDateCreateErr
            }
        }
    }
    // inputs
    {
        "inputCoursByDate": {
            "dateJ": "2023-06-26T22:12:31.286Z",
            "eventHeureDebut": "10:00:30Z",
            "eventHeureFin": "12:00:30Z",
            "idEvent": "xfdsrtyb",
            "listInscrit": [
                    "rtyddfhgfe",
                    "XvgrtyFDRg"
                ],
            "listInteressee": [
                    "rgygXddff"
                ],
            "status": "cancel",
            "title": "cours de police"
        }
    }

#### deleteCoursByDate

    mutation DeleteCoursByDate($coursByDateId: String!) {
        deleteCoursByDate(coursByDateId: $coursByDateId)
    }

    {
        "coursByDateId": "id to delete"
    }

#### updateCoursByDate

    mutation UpdateCoursByDate($inputCoursByDate: CoursByDateInput, $coursByDateId: String) {
        updateCoursByDate(inputCoursByDate: $inputCoursByDate, coursByDateId: $coursByDateId) {
            ... on CoursByDate {
                listInteressee
                listInscrit
                status
                title
                eventHeureFin
            }
            ... on CoursByDateCreateErr {
                messageErrorCoursByDateCreateErr
            }
            ... on CoursByDateUpdateErr {
                messageErrorCoursByDateUpdateErr
            }
            ... on CoursByDateDeleteErr {
                messageErrorCoursByDateDeleteErr
            }
            ... on CoursByDateFindErr {
                messageErrorCoursByDateFindErr
            }
        }
    }

    //input & valToUpdate
    {
        "coursByDateId": "0ZtUPC6iUR1CKz1nrSk1b",
        "inputCoursByDate": {
            "listInteressee": ["yves@test.com"],
            "status": "inscrit"
        }
    }

## Users

    mutation CreateUser($inputUser: UserInput) {
        createUser(inputUser: $inputUser) {
            ... on User {
                name
                firstname
                numTel
                email
                dateCreation
                dateUpdate
                coursPaye {
                        idCours
                        datePayment
                        selectedDate {
                        idCoursbyDate
                        status
                        cancelDate
                        cancelReason
                    }
                }
                dateLastConnexion
                _id
            }
            ... on UserCreateErr {
                messageErrorUserCreateErr
            }
        }
    }
    //input
    {
        "inputUser": {
            "name": "Yves",
            "firstname": "Test",
            "numTel": "0669205648",
            "email": "test@yahoo.fr",
            "coursPaye": [
            {
                "idCours": "test",
                "datePayment": "2023-06-26T22:12:31.286Z",
                "selectedDate": {
                "idCoursbyDate": "titiuty",
                "status": "inscrit",
                "cancelDate": "2023-06-26T22:12:31.286Z",
                "cancelReason": "gf"
                }
            }
            ],
            "dateLastConnexion": "2023-06-26T22:12:31.286Z"
        }
    }


## Event

### Mutation create 

    mutation CreateEvent($inputEvent: EventInput) {
    createEvent(inputEvent: $inputEvent) {
        ... on Event {
        _id
        type
        selectedDate
        dateCreation
        dateUpdate
        dateDebut
        dateFin
        data {
            description {
            eventTitle
            categorie
            eventLocation
            }
            journeePeriode {
            allDay
            eventDateDebut
            eventHeureDebut
            eventDateFin
            eventHeureFin
            }
            ecartType {
            periodicite
            }
            ecartChoix {
            dayHebdo {
                dim
                jeu
                lun
                mar
                mer
                sam
                ven
            }
            nbMois
            nbPeriode
            periodicite
            selectedMonthAnnee
            }
            infosCompl {
            textDescription
            }
        }
        }
        ... on EventCreateErr {
        messageErrorEventCreateErr
        }
    }
    }

    //input
    {
    "inputEvent": {
        "type": "recurrent",
        "dateDebut": "2021-08-23T00:00:00.000+00:00",
        "dateFin": "2021-08-23T00:00:00.000+00:00",
        "data": {
        "description": {
            "eventTitle": "Messe Dominicale",
            "categorie": "01",
            "eventLocation": "Eleveur ngousso"
        },
        "journeePeriode": {
            "allDay": false,
            "eventDateDebut": "2021-08-23T00:00:00.000+00:00",
            "eventHeureDebut": "10:00:00Z",
            "eventDateFin": "2021-08-23T00:00:00.000+00:00",
            "eventHeureFin": "11:00:00Z"
        },
        "ecartType": {
            "periodicite": "semaine"
        },
        "ecartChoix": {
            "periodicite": "1_semaine",
            "selectedMonthAnnee": "",
            "nbPeriode": "1",
            "dayHebdo": {
            "lun": false,
            "mar": false,
            "mer": false,
            "jeu": false,
            "ven": false,
            "sam": false,
            "dim": true
            },
            "nbMois": "JourDuMois"
        },
        "infosCompl": {
            "textDescription": ""
        }
        },
        "selectedDate": ["test"]
    }
    }
    


https://www.mongodb.com/docs/manual/tutorial/model-embedded-one-to-one-relationships-between-documents/

https://www.mongodb.com/community/forums/t/how-to-update-a-subdocument-ref/145489

//Inscription

//input
    {
        "input": {
            "roles": ["admin"],
            "userCompleteName": "ZENDJA Yves",
            "userEmail": "zendjayves@gmail.com",
            "userPassCode": {
            "code": "TEST",
            "reason": ["Inscription"],
            "sendAt": "2023-06-26T22:12:31.286Z"
            },
            "userPassword": "test",
            "userPreferLang": "fr",
        }
    }

ensuite, aller dans la base de donnée et mettre true pour vérif