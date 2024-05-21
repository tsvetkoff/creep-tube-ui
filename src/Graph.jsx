import {CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis} from "recharts";
import parse from 'html-react-parser';
import TeXToSVG from "tex-to-svg";
import {GostColors} from "./GostColors";
import {Button, Col, Row} from "antd";
import {CSVLink} from "react-csv";
import React, {useRef} from "react";
import {saveAs} from 'file-saver'
import html2canvas from "html2canvas";


const Graph = function (props) {
    const chartRef = useRef()
    const data = []
    const abscissa = props.abscissa
    const abscissaName = props.abscissaName
    const ordinates = props.ordinates
    const yAxisName = props.name;
    if (!props.ordinates) {
        return (<></>)
    }
    const graphDataKeys = Object.keys(ordinates)
    for (let i = 0; i < abscissa.length; i++) {
        let point = {}
        point[abscissaName] = abscissa[i]
        for (const [ordinatesKey, ordinateValue] of Object.entries(ordinates)) {
            point[ordinatesKey] = ordinateValue[i]
        }
        data.push(point)
    }

    const lines = () => {
        const length = Object.keys(GostColors).length;
        return graphDataKeys.map((key, index) => {
            return (
                <Line key={key} strokeWidth={3} type="monotone" dataKey={key} fill="#8884d8"
                      stroke={generateGostColors(index % length)} dot={false}/>)
        })

    }

    function generateGostColors(index) {
        return GostColors[index]
    }


    const YaxisLabel = () => {
        return (
            <svg style={{position: "absolute"}}
                 transform={`translate(10,-30)`}>{parse(TeXToSVG(yAxisName))}</svg>
        )
    };

    const exportChartAsPng = async () => {
        const chartNode = chartRef.current;
        const copyChartNode = chartNode.cloneNode(true)
        const firstElementChild = copyChartNode.firstElementChild;
        copyChartNode.style.background = 'white'
        copyChartNode.style.padding = '45px'
        firstElementChild.style.left = '10px'
        firstElementChild.style.padding = '10px'
        firstElementChild.style.position = 'absolute'
        console.log(copyChartNode)
        try {
            let iframe = document.createElement("iframe");
            iframe.style.visibility = "hidden";
            document.body.appendChild(iframe);
            let iframedoc = iframe.contentDocument || iframe.contentWindow.document;
            iframedoc.body.innerHTML = copyChartNode.outerHTML;
            let canvas = await html2canvas(iframedoc.body, {});
            let imgData = canvas.toDataURL("image/png");

            saveAs(imgData, `${props.imageName}.png`);
            document.body.removeChild(iframe);
        } catch (error) {
            console.error('Ошибка при экспорте PNG', error);
        }
    };

    return (
        <div>
            <div ref={chartRef} className={"container pt-5"}>
                <YaxisLabel/>
                <ComposedChart width={404} height={250} data={data}>
                    <XAxis type={"number"} dataKey={abscissaName} domain={['dataMin', 'dataMax']} tickCount={10}
                    />
                    <YAxis type={"number"} domain={['auto', 'auto']}/>
                    <Tooltip/>
                    <Legend/>
                    <CartesianGrid stroke="#f5f5f5"/>
                    {
                        lines()
                    }
                </ComposedChart>
            </div>
            <Row justify={"center"}>
                <Col>
                    <Button type="primary" onClick={() => {
                    }}>
                        <CSVLink data={data} filename={`${props.imageName}.csv`}>Экспорт в Excel</CSVLink>
                    </Button>
                </Col>
                <Col>
                    <Button type="primary" onClick={exportChartAsPng}>
                        Экспорт в PNG
                    </Button>
                </Col>
            </Row>
        </div>
    )

}

export default Graph;
