import { useQuery } from '@apollo/client';
import { GET_BOOK } from "../queries/queries";

interface props{
    bookId: string,
}

interface SingleBook {
    id: any,
    name: string,
    genre: string,
    author: {
        id: any,
        name: string,
        age: number,
        books: {
            id: any,
            name: string,
            genre: string,
        }[]
    }
}

interface AuthorBooks {
    id: any,
    name: string,
    genre: string,
}



const BookDetails = ({ bookId }: props) => {
    const { loading, error, data } = useQuery(GET_BOOK,
        {
            variables: {
                id: bookId
            }
        }
    );

    const displayBookDetails = (book: SingleBook) => {
        if (book !== undefined) {
            return <div>
                <h2>{book.name}</h2>
                <p>{book.genre}</p>
                <p>{book.author.name}</p>
                <p>All books by this author</p>
                <ul className="other-books">
                    {
                        book.author.books.map((item: AuthorBooks) => {
                            return <li key={item.id}>
                                {item.name}
                            </li>
                        })
                    }
                </ul>
            </div>
        
        }
        else {
            return <div>No book selected</div>
    }
    }

    if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;
    console.log(bookId, "In Book Details");
    console.log(data, "Book Details");
    
    
    return (
        <div id="book-details">
            <p>Output Book Details here</p>
            {/* {data.book.name} */}
            {displayBookDetails(data?.book)}
        </div>
    )
}

export default BookDetails