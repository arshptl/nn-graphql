import { NextPage } from 'next';
import { useQuery, useMutation } from '@apollo/client'
import { GET_AUTHORS, ADD_BOOK } from '../queries/queries';
import { useReducer, useRef } from 'react';

type AuthorType = {
    name: any,
    id: string,
}

const AddBook: NextPage = () => {
    const { loading, error, data } = useQuery(GET_AUTHORS);
    const [addBook, { mutatedata, mutateloading, mutateerror }]: any = useMutation(ADD_BOOK);

    const inputGenreRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const inputAuthorIdRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
    const inputNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [bookData, dispatch] = useReducer(
        (state: any, action: any) => {
            switch (action.type) {
                case 'add':
                    return {
                        ...state,
                        name: action.name,
                        genre: action.genre,
                        authorId: action.authorId,
                    }
                default:
                    return state;
            }
        }, []
    );

    const displayAuthors = () => {
        if (data.loading) {
            return (<option disabled>Loading authors</option>);
        } else {
            return data.authors.map((author: AuthorType) => {
                return (<option key={author.id} value={author.id}>{author.name}</option>);
            });
        }
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        dispatch({
            type: 'add',
            name: inputNameRef.current.value,
            genre: inputGenreRef.current.value,
            authorId: inputAuthorIdRef.current.value
        });
        inputNameRef.current.value = '';
        inputGenreRef.current.value = '';
        inputAuthorIdRef.current.value = '';
        addBook({
            variables: {
                name: inputNameRef.current.value,
                genre: inputGenreRef.current.value,
                authorId: inputAuthorIdRef.current.value
            }
        });
    }


    if (loading || mutateloading) return <p>Loading...</p>;
    if (error || mutateerror) return <p>Error :(</p>;
    console.log(bookData);
    return (
        <form id="add-book" onSubmit={handleSubmit}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" ref={inputNameRef} />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" ref={inputGenreRef} />
            </div>
            <div className="field">
                <label>Author:</label>
                <select ref={inputAuthorIdRef}>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    )
}

export default AddBook