import styles from './Button.module.scss'

interface IButton {
  onClick: () => void;
  text: string;
}

const Button = (props: IButton) => {
  return (
    <button onClick={props.onClick} className={styles.Button}>
      {props.text}
    </button>
  );
};

export default Button;
