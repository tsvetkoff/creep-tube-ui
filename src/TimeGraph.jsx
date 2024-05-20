import Graph from "./Graph";

const TimeGraph = function (props) {

    return (
        <>
            <div className={"container pt-5"}>
                <Graph
                    imageName={props.imageName} ordinates={props.ordinates}
                    abscissa={props.abscissa}
                    name={props.name}
                    abscissaName="t"
                    countGraphs={props.countGraphs}
                />
            </div>

        </>
    )
}
export default TimeGraph;