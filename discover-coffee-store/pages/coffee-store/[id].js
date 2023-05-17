import { useRouter, useContext, useState, useEffect } from "next/router";
import Link from "next/link";
import Head from 'next/head';
import Image from 'next/image';
import cls from 'classnames';

// import coffeeStoresData from '../../data/coffee-stores.json';

import { fetchCoffeeStores } from "@/lib/coffee-store";

import styles from '../../styles/coffee-stores.module.css';

// import { StoreContext } from "../../store/store-context";

// import { isEmpty } from "@/utils";

export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    const coffeeStores = await fetchCoffeeStores();
    const findCoffeeStoreById = coffeeStores.find(coffeeStore => {
        return coffeeStore.id.toString() === params.id; //dynamic id
    });

    return {
        props: {
            coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {}
        }
    }
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();
    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.id.toString(),
            }
        }
    });

    return {
        paths,
        fallback: true,
    }
}

export default function CoffeeStore(initialProps) {
    const router = useRouter();
    console.log("router", router);
    // console.log('props', props);

    if (router.isFallback) return <div>Loading...</div>

    const id = router.query.id;

    // const [coffeeSore, setCoffeeStore] = useState(initialProps.coffeeStore);

    // const {
    //     state: { coffeeStores },
    //   } = useContext(StoreContext);

    const handleCreateCoffeeStores = async () => {
        try {
            const data = {
                id,
                name,
                voting,
                imgUrl,
                address,
                neighbourhood,
            }
            const response = await fetch('/api/createCoffeeStore', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        } catch (err) {
            console.error('Error creating coffee store', err);
        }
    }
    // useEffect(() => {
    //     if (isEmpty(initialProps.coffeeStore)) {
    //         if (coffeeStores.length > 0) {
    //             const findCoffeeStoreById = coffeeStores.find(coffeeStore => {
    //                 return coffeeStore.id.toString() === id; //dynamic id
    //             });
    //             setCoffeeStore(findCoffeeStoreById);
    //         }
    //     }
    // }, [id]);

    const { address, name, formatted_address, imgUrl } = initialProps;

    const handleUpvoteButton = () => {
        console.log("handle upvote");
    }

    return (
        <>
            <div className={styles.layout}>
                <Head>
                    <title>{name}</title>
                </Head>
                <div className={styles.container}>
                    <div className={styles.col1}>
                        <div className={styles.backToHomeLink}>
                            <Link href="/">Back to home</Link>
                        </div>
                        <div className={styles.nameWrapper}>
                            <h1 className={styles.name}>{name}</h1>
                        </div>
                        <Image src={imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} width={600} height={360} className={styles.storeImg} alt={name}></Image>
                    </div>

                    <div className={cls("glass", styles.col2)}>
                        {address && (
                            <div className={styles.iconWrapper}>
                                <Image src="/static/icons/places.svg" width="24" height="24"></Image>
                                <p className={styles.text}>{address}</p>
                            </div>
                        )}

                        {formatted_address && (
                            <div className={styles.iconWrapper}>
                                <Image src="/static/icons/nearMe.svg" width="24" height="24"></Image>
                                <p className={styles.text}>{formatted_address
                                }</p>
                            </div>
                        )}

                        <div className={styles.iconWrapper}>
                            <Image src="/static/icons/star.svg" width="24" height="24"></Image>
                            <p className={styles.text}>1</p>
                        </div>
                        <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Up vote!</button>
                    </div>
                </div>
            </div>
        </>
    );
}