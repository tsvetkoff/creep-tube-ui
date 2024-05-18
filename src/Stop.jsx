import React from "react";

const Stop = function (props) {
    const onClick = async function () {
        await fetch(
            `${process.env.REACT_APP_REST_URL}/stop`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            }
        )
            .then((response) => {
                console.log(response)
                props.shutDown()
            })
    }
    return (
        <>
            <button disabled={props.disabled} className={"btn btn-danger rounded-pill px-3 mt-3 ml-3"}
                    onClick={onClick}> Остановить
            </button>
        </>
    )
}
export default Stop;