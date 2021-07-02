import { GetServerSidePropsContext } from 'next';

export default function About({ message }: any) {
    return <span>{message}</span>
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
    if (query?.id) {
        const { transactions } = await (await fetch(`https://financas-api-poc.herokuapp.com/api/transaction/${query.id}`)).json()
        return {
            props: {
                message: transactions.title
            }
        }
    }

    const message = `Olá ${query.nome}`;

    return {
        props: {
            message,
        }
    }
}