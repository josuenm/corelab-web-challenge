import styles from './Form.module.scss';



interface ICompleteInputProps {
    label: string;
    placeholder?: string;
    register?: any;
    error?: string;
    type?: string;
}


const deleteSpaces = (value: string) => value.replace(/\s/g, '')


const Label = ({ label }: { label: string }) => {

    const newLabel = deleteSpaces(label)

    return (
        <label className={styles.Label} htmlFor={newLabel}>{label}</label>
    )
}



const CompleteInput = ({ 
        label, placeholder = "", type = "text", register, error 
    }: ICompleteInputProps) => {

    const newLabel = deleteSpaces(label)

    return (
        <div className={styles.Complete_Input_Container}>
            <Label label={label} />
            <input 
                type={type} 
                placeholder={placeholder} 
                id={newLabel} 
                className={styles.Input} 
                {...register} />
            {!!error && <p className={styles.error}>{error}</p>}
        </div>
    )
}


const Submit = ({ title, disabled = false }: { title: string, disabled?: boolean }) => {
    return (
        <button 
            type="submit" 
            className={styles.Submit}
            data-disabled={disabled}>
                {title}
        </button>
    )
}


export { CompleteInput, Submit, Label };