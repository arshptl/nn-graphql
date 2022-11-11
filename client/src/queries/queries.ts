import { gql } from "@apollo/client";

// Queries
const GET_AUTHORS = gql`
    query GetAuthors{
        authors {
        id
        name
        }
    }
    `;

const GET_BOOKS = gql`
    query GetBooks{
        books {
        id
        name
        }
    }   
    `;

const GET_BOOK = gql`
    query GetBook($id: ID!) {
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    id
                    name
                }
            }
        }
    }`;

// Mutations
const ADD_BOOK = gql`
mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
        name,
        genre,
    }
}`;

export { GET_AUTHORS, GET_BOOKS, ADD_BOOK, GET_BOOK };
