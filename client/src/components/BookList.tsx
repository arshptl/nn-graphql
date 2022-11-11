import { useQuery } from '@apollo/client';
import { GET_BOOKS } from "../queries/queries";
import BookDetails from "./BookDetails";
import { useState } from "react";

type BookType = {
    name: any,
    id: string,
}

const BookList = () => {
    const { loading, error, data } = useQuery(GET_BOOKS);
    const [selectedBook, setSelectedBook] = useState("");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(selectedBook);
    return (
        <div>
            <ul id="book-list">
                {data.books.map((book: BookType) => {
                    return <li key={book.id} onClick={() => setSelectedBook(book.id)}>
                        {book.name}
                    </li>
                })}
            </ul>
            <BookDetails bookId={selectedBook} />
        </div>
    )
}

export default BookList