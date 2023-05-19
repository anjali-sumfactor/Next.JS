import Link from "next/link";
import Image from "next/image";
import cls from "classnames";

import styles from './card.module.css';

export function Card(props) {
    return (
        <>
            <Link href={props.href}>
                <div className={styles.cardLink}>
                    <div className={cls("glass", styles.container)}>
                        <div className={styles.cardHeaderWrapper}>
                            <h2 className={styles.cardHeader}>{props.name}</h2>
                        </div>
                        <div className={styles.cardHeaderWrapper}>
                            <Image className={styles.cardImage} src={props.imageUrl} width={260} height={160} alt={props.name}></Image>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}