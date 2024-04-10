import React from "react";

const Stop = function (props) {
    const onClick = async function () {
        await fetch(
            "http://localhost:8080/stop",
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
            <button className={"btn btn-danger rounded-pill px-3"} onClick={onClick}> Остановить</button>
        </>
    )
}
export default Stop;