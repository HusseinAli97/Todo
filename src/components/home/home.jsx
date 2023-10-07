import { useContext } from 'react'
import { ToggleModeContext } from '../../context/ToggleMode'
import TodoContainer from '../todoContainer/todoContainer'
import styles from './home.module.css'
export default function Home() {
    const { mode } = useContext(ToggleModeContext)
    return (
        <>
            <div className={`${mode === 'dark' ? styles.bgDarkPhoto : styles.bgLightPhoto}`}>
            </div>
            <TodoContainer />
        </>
    )
}
