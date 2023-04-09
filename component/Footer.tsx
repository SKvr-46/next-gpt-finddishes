import styles from "styles/footer.module.scss"
import { Layout } from "./Layout"

export const Footer = () => {


    return (
        <div className={styles.footer}>
            <Layout>
                <div className={styles.flexcontainer}>
                    <a href="https://github.com/SKvr-46">Github: https://github.com/SKvr-46</a>
                    <address>koeich4@gmail.com</address>
                </div>
            </Layout>
        </div>
    )
}