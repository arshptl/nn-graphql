import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import BookList from '../components/BookList'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


// Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const Home: NextPage = () => {
  return (
    <ApolloProvider client={client}>
      <div className={styles.container}>
        <h1>{"Arsh's reading list"}</h1>
        <BookList />
      </div>
    </ApolloProvider>
  )
}

export default Home
