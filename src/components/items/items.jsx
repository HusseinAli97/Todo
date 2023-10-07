import { FormCheck } from 'react-bootstrap'
import styles from './items.module.css'
export default function Items() {
    return (
        <>
            <FormCheck
                type='checkbox'
                id='exampleCheck1'
                label='Check'
                className={`${styles.items} text-white`}
            >
            </FormCheck>
        </>
    )
}
