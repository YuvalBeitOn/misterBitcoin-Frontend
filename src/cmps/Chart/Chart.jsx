import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './Chart.scss'

export default function Chart({ data, title, color, desc }) {
    return (
        <div className="chart flex column align-center">
            <h2>{title}</h2>
            <h4 className="desc">{desc}</h4>
            <LineChart class="line-chart" width={1000} height={250} data={data}
                margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Legend name={title} />
                <Line type="monotone" dataKey="y" name={title} stroke={color} />
            </LineChart>
        </div>
    )
}

