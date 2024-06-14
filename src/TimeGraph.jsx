import Graph from "./Graph";

const TimeGraph = function (props) {

    return (
        <>
            <Graph
                imageName={props.imageName} ordinates={props.ordinates}
                abscissa={props.abscissa}
                name={props.name}
                abscissaName="t"
                countGraphs={props.countGraphs}
            />
        </>
    )
}
export default TimeGraph;