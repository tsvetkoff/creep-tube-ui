import React, {useRef, useState} from 'react';
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {ParamsTooltips} from "./ParamsTooltips";
import {DefaultParamsValues} from "./DefaultParamsValues";
import TimeGraph from "./TimeGraph";
import RadialGraph from "./RadialGraph";
import Stop from "./Stop";
import {ParamsNames} from "./ParamsNames";
import parse from 'html-react-parser';
import {Tooltip} from "react-tippy";
import 'react-tippy/dist/tippy.css';

const BuildComponent = function () {
    const [graphData, setGraphData] = useState({})
    const taskRef = useRef(null)
    const [isClick, setIsClick] = useState(false)
    const {register, handleSubmit, control} = useForm({
        defaultValues: DefaultParamsValues
    })
    const [nextTime, setNextTime] = useState(20)
    const onSubmit = (data) => {
        setIsClick(true)
        let stressTimesObjects = data['stressTimes'];
        data['stressTimes'] = stressTimesObjects.map(temp => {
                return parseFloat(temp['time'])
            }
        )
        console.log(data)
        let params = JSON.stringify(data);
        getApiData(params)
    }
    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control,
        name: "stressTimes"
    })

    const createStressTimesInputs = () => {
        const flexWindow = 4;
        let stressTimes = fields.map((item, index) => {
            return (
                <div className={"d-flex container p-lg-0"}>
                    <Controller
                        render={({field}) =>
                            <input
                                className={"form-control"}
                                onWheel={event => event.currentTarget.blur()}
                                type="number"
                                step={'any'}
                                required={index === 0}
                                min={0} {...field}
                            />
                        }
                        name={`stressTimes.${index}.time`}
                        control={control}
                    />
                    <button type="button"
                            className={"btn btn-danger"}
                            onClick={
                                () => {
                                    if (index !== 0) {
                                        remove(index)
                                        setNextTime(nextTime - 5)
                                    }
                                }
                            }>
                        -
                    </button>
                </div>
            );
        })

        let flexingStressTimes = []
        for (let i = 0; i < stressTimes.length; i += flexWindow) {
            flexingStressTimes.push(<div className={"d-flex"}>{
                stressTimes.slice(i, i + flexWindow)
            }</div>)
        }

        return flexingStressTimes
    }

    const getApiData = async (params) => {
        if (!isClick) {
            await fetch(
                `${process.env.REACT_APP_REST_URL}/run`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: params
                }
            )
                .then((response) => {
                    console.log(response)
                })
            taskRef.current = setInterval(async () => {
                await fetch(
                    `${process.env.REACT_APP_REST_URL}/build`,
                    {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json"
                        }
                    })
                    .then(response => {
                        if (!response) {
                            alert('Внутрення ошибка сервера. Обратитесь к администратору')
                        }
                        if (response.status === 201) {
                            setIsClick(false)
                            clearInterval(taskRef.current)
                        }
                        return response.json()
                    })
                    .then(data => {
                        console.log(data)
                        setGraphData(data)
                    })
                    .catch(
                        err => {
                            console.log(err);
                        }
                    )
            }, 1000);
        }
    }
    let timeLines = () => <></>
    let radialLines = () => <></>
    if (Object.keys(graphData).length !== 0) {
        const graphs = graphData['graphDto']
        const t = graphData.t
        const r = graphData.r
        timeLines = () => {
            if (t) {
                return (
                    <>
                        <div className={"d-flex"}>
                            <TimeGraph imageName={"eps_z"} ordinates={graphs['eps_z']}
                                       name="\Large \varepsilon_z(t)" abscissa={t}
                                       countGraphs={1}/>
                            <TimeGraph imageName={"theta"} name="\Large \theta(t)" ordinates={graphs['theta']}
                                       abscissa={t}
                                       countGraphs={1}/>
                        </div>
                        <div className={"d-flex"}>
                            <TimeGraph imageName={'omega'} name={"\\Large  \\omega(t)"} abscissa={t}
                                       ordinates={graphs['omega']}
                                       countGraphs={2}/>
                            <TimeGraph imageName={'Omega'} ordinates={graphs['Omega']} name={"\\Large \\Omega(t)"}
                                       abscissa={t}
                                       countGraphs={2}/>
                        </div>
                    </>
                )
            }
        }
        radialLines = () => {
            const count = fields.length
            if (graphs) {
                return (
                    <>
                        <div className={"d-flex"}>
                            <RadialGraph imageName={'sigma_z_0'} name="\Large \sigma_{z}^{0}(r)"
                                         ordinates={graphs['sigma_z0']} abscissa={r}
                                         countGraphs={count}/>

                            <RadialGraph imageName={'sigma_z'} name="\Large \sigma_z(r)" ordinates={graphs['sigma_z']}
                                         abscissa={r}
                                         countGraphs={count}/>
                        </div>
                        <div className={"d-flex"}>
                            <RadialGraph imageName={'sigma_theta_0'} name="\Large \sigma_{\theta}^0(r)"
                                         ordinates={graphs['sigma_theta0']}
                                         abscissa={r} countGraphs={count}/>
                            <RadialGraph imageName={"sigma_theta"} name="\Large \sigma_{\theta}(r)"
                                         ordinates={graphs['sigma_theta']}
                                         abscissa={r} countGraphs={count}/>
                        </div>
                        <div className={"d-flex"}>
                            <RadialGraph imageName={'sigma_r_0'} name="\Large \sigma_r^0(r)"
                                         ordinates={graphs['sigma_r0']}
                                         abscissa={r} countGraphs={count}/>
                            <RadialGraph imageName={'sigma_r'} name="\Large \sigma_r(r)" ordinates={graphs['sigma_r']}
                                         abscissa={r}
                                         countGraphs={count}/>
                        </div>

                        <div className={"d-flex"}>
                            <RadialGraph imageName={'tau_0'} name="\Large \tau_0(r)" ordinates={graphs['tau0']}
                                         abscissa={r}
                                         countGraphs={count}/>
                            <RadialGraph imageName={'tau'} name="\Large \tau(r)" ordinates={graphs['tau']} abscissa={r}
                                         countGraphs={count}/>
                        </div>
                    </>
                )
            }
        }
    }


    return (
        <div className={"d-flex"}>
            <form className={"row-gap-3"} onSubmit={handleSubmit(onSubmit)}>
                <div className={"input-group container"}>
                    {
                        Object.keys(ParamsTooltips).map(k => {
                            return (
                                <div className={"col-3"}>
                                    <Tooltip title={ParamsTooltips[k]} position="top" trigger="mouseenter"
                                             arrow={true}>
                                        <span className="input-group-text">{parse(ParamsNames[k] + ":")}</span>
                                    </Tooltip>
                                    <input type="number"
                                           onWheel={event => event.currentTarget.blur()}
                                           step={'any'}
                                           defaultValue={DefaultParamsValues[k]}  {...register(k, {
                                        required: true,
                                        valueAsNumber: true
                                    })}
                                           className="form-control form-control-success"
                                    />

                                </div>
                            )
                        })
                    }
                </div>
                <div className={"input-group container pt-2"}>
                    <div className={"d-flex"}>
                            <span
                                className={"input-group-text"}>Моменты времени отображения напряжения</span>
                        <button
                            type="button"
                            className={"btn btn-primary"}
                            onClick={() => {
                                append({time: nextTime});
                                setNextTime(nextTime + 5)
                            }}
                        >+
                        </button>
                    </div>
                    <div>
                        {createStressTimesInputs()}
                    </div>
                </div>

                <input type="submit" className={"btn btn-success rounded-pill px-3"} disabled={isClick}/>
                <Stop disabled={!isClick} shutDown={() => {
                    clearInterval(taskRef.current);
                    setIsClick(false)
                }}/>
            </form>
            <div className={"container"}>
                {radialLines()}
                {timeLines()}
            </div>
        </div>
    )
}


export default BuildComponent;