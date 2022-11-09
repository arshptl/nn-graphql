import { NextPage } from "next"
import { gql } from "@apollo/client"

const getBooksQuery = gql`
{
    books{
        id
        name
    }
}
`;

const BookList: NextPage = () => {
    return (
        <div>
            <ul id="book-list">
                <li>
                    Book Name
                </li>
            </ul>
        </div>
    )
}

export default BookList