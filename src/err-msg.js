function ErrorMsg(props){
    return(
        <div className="text-center mt-5 msg">
            <p> <span className="bg-danger rounded p-1 text-white"> {props.msg} </span> </p>
        </div>
    )
}

export default ErrorMsg