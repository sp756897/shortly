import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class VerticalBar extends Component {
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
        var i = dict.map((val, key) => {
            index.push(val.ind)
            count.push(val.v1)
        })


        const data = {
            labels: index,
            datasets: [
                {
                    label: "No. Of Clicks",
                    data: count,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
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

        const options = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };

        return (
            <>
                <div className='header'>
                </div>
                <Bar data={data} options={options} />
            </>
        )
    }
}

export default VerticalBar