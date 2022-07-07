import styles from './Form.module.scss';



interface CompleteInputProps {
    label: string;
    placeholder?: string;
    register?: any;
    error?: string;
    type?: string;
}

type ItemProps = {
    id: number, 
    value: string, 
    title: string
}


interface CompleteSelectProps {
    label: string;
    data: ItemProps[];
}


interface InputProps {
    type: string;
    placeholder?: string;
}



const Input = ({ type, placeholder = "" }: InputProps) => {
    return (
        <input 
            type={type} 
            className={styles.Input} 
            placeholder={placeholder} />
    )
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
    }: CompleteInputProps) => {

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



const Select = ({ label, data }: CompleteSelectProps) => {

    const newLabel = deleteSpaces(label)

    return (
        <div className={styles.Complete_Select_Container}>
            <Label label={label} />

            <select name="" id={newLabel}>
            {data.map((item) => (
                <option value={item.value} key={item.id}>{item.title}</option>
            ))}
            </select>
        </div>
    )
}


const Submit = ({ title }: { title: string }) => {
    return (
        <button type="submit" className={styles.Submit}>{title}</button>
    )
}


export { CompleteInput, Select, Submit, Label, Input };