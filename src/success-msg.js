function SuccessMsg(props){
    return(
        <div className="text-center mt-5 msg">
            <p> <span className="bg-success rounded p-1 text-white"> {props.msg} </span> </p>
        </div>
    )
}

export default SuccessMsg