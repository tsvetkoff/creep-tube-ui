import TimeGraph from "./TimeGraph";
import RadialGraph from "./RadialGraph";
import Stop from "./Stop";

const ExampleObject = function () {
    const dataKey = {
        "graphDto": {
            "sigma": {
                "time1": [1.0, 2.0, 3.0],
                "time2": [1.0, 2.0, 89.9095889489859895],
                "time3": [1.0, 2.0, 7],
                "time4": [1.0, 2.0, 12],
                "time5": [1.0, 2.0, 8],
            },
            "sigma2": {"time1": [1.0, 2.0, 3.0], "time2": [1.0, 2.0, 3.0]}
        }, "r": [1.0, 2.0, 3.0], "t": [1.0, 2.0, 3.0]
    };
    const r = dataKey.r;
    const t = dataKey.t
    return (
        <>
            <Stop/>
            {/*
            <TimeGraph ordinates={dataKey['graphDto']['sigma2']} abscissa={t} name={'\\Large \\tau'} countGraphs={1}/>
*/}
            <RadialGraph ordinates={dataKey['graphDto']['sigma']} abscissa={r} name={'\\Large \\sigma'}
                         countGraphs={2}/>
        </>
    )
}

export default ExampleObject;