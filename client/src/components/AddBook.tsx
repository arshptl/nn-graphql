import { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client'

const GET_AUTHORS = gql`
{
    authors{
        id
        name
    }
}
`;

type AuthorType = {
    name: any,
    id: string,
}

const AddBook: NextPage = () => {
    const { loading, error, data } = useQuery(GET_AUTHORS);

    const displayAuthors = () => {
        if (data.loading) {
            return (<option disabled>Loading authors</option>);
        } else {
            return data.authors.map((author: AuthorType) => {
                return (<option key={author.id} value={author.id}>{author.name}</option>);
            });
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <form id="add-book">
            <div className="field">
                <label>Book name:</label>
                <input type="text" />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" />
            </div>
            <div className="field">
                <label>Author:</label>
                <select>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>

        </form>
    )
}

export default AddBook