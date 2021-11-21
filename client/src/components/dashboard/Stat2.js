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
        var i = dict.map((val, key) => {
            index.push(val.ind)
            count.push(val.v1)
        })


        const data = {
            labels: index,
            datasets: [
                {
                    label: 'No. of Clicks',
                    data: count,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.9)',
                        'rgba(54, 162, 235, 0.9)',
                        'rgba(255, 206, 86, 0.9)',
                        'rgba(75, 192, 192, 0.9)',
                        'rgba(153, 102, 255, 0.9)',
                        'rgba(255, 159, 64, 0.9)',
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
                </div>
                <Pie data={data} />
            </>
        )
    }
}

export default PieChart

