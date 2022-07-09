import styles from './Button.module.scss';



interface IButtonProps {
    title: string;
    onClick?: () => void;
}


const Button = ({ title, ...rest }: IButtonProps) => {
    return (
        <button type="button" className={styles.Button} {...rest}>
            {title}
        </button>
    )
}



export default Button;