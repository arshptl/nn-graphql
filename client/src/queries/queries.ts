import { gql } from "@apollo/client";

const GET_AUTHORS = gql`
    {
        authors {
        id
        name
        }
    }
    `;

const GET_BOOKS = gql`
    {
        books {
        id
        name
        }
    }
    `;

const ADD_BOOK = gql`
mutation{
    addBook(name: "", genre: "", authorId: ""){
        name,
        genre,
        authorId
    }
}`;

export { GET_AUTHORS, GET_BOOKS, ADD_BOOK };
