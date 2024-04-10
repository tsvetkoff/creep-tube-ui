import Graph from "./Graph";

const RadialGraph = function (props) {

    return (<>

            <Graph
                imageName={props.imageName}
                ordinates={props.ordinates}
                abscissa={props.abscissa}
                name={props.name}
                abscissaName="r"
                countGraphs={props.countGraphs}/>

    </>)
}
export default RadialGraph;