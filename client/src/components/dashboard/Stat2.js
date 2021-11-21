import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class PieChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dict: this.props.dict
        }
    }

    render() {
        const { dict } = this.state
        var index = []
        var count = []
        console.log(dict)
        var i = dict.map((val, key) => {
            index.push(val.index)
            count.push(val.v1)
        })

        console.log(index, count)

        const data = {
            labels: index,
            datasets: [
                {
                    label: '# of Votes',
                    data: count,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        return (
            <>
                <div className='header'>
                    <h1 className='title'>Pie Chart</h1>
                    <div className='links'>
                        <a
                            className='btn btn-gh'
                            href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Pie.js'
                        >
                            Github Source
                        </a>
                    </div>
                </div>
                <Pie data={data} />
            </>
        )
    }
}

export default PieChart

