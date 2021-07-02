import { Transaction } from "..";
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

export default function TransactionDetails({ title, amount, category, type }: Transaction) {
    const { isFallback } = useRouter();

    if (isFallback) {
        return (
            <div>
                <span>Carregando</span>
            </div>
        );
    }

    return (
        <div>
            <p>Titulo: {title}</p> <br />
            <p>Categoria: {category}</p> <br />
            <p>Tipo: {type}</p> <br />
            <p> amount: {amount}</p> <br />
        </div>
    )
}

export function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
    const { transactions = {} } = await (await fetch(`https://financas-api-poc.herokuapp.com/api/transaction/${params.id}`)).json()

    return {
        props: {
            ...transactions,
        },
        revalidate: 60
    }
}