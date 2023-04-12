
export default function Button(props){

    return(
        <div className={props._type} onClick={props._onClick} id={props._id}>
            {props._text}
        </div>
    )
}