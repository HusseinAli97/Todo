import TodoContainer from '../todoContainer/todoContainer'
import styles from './home.module.css'
export default function Home() {
    return (
        <>
            <div className={`${styles.bgPhoto}`}>
            </div>
            <TodoContainer />
        </>
    )
}
