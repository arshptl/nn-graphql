import { NextPage } from "next"
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from "../queries/queries";

type BookType = {
    name: any,
    id: string,
}

const BookList: NextPage = () => {
    const { loading, error, data } = useQuery(GET_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div>
            <ul id="book-list">
                {data.books.map((book: BookType) => {
                    return <li key={book.id}>
                        {book.name}
                    </li>
                })}
            </ul>
        </div>
    )
}

export default BookList