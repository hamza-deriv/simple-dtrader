import "../../styles/button.css";

type TButtonProps = {
    title: string,
    className: string
}
const Button:React.FC<TButtonProps> = (props:TButtonProps) => {

const buttonHandler = () => {
    alert(`Contract ${props.title}`)
};

return (
    <>
        <button className={props.className} onClick={buttonHandler}>
        <span>{props.title}</span>
        </button>
    </>

)
    
};

export default Button;