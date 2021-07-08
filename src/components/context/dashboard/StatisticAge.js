import React, { Component } from 'react';
import Chart from 'react-apexcharts'
class StatisticAge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [0,0,0],
      options: {
        chart: {
          width: '100%',
          type: 'pie',
        },
        colors: ['#FF7F00'],
        labels: ["Under 5", "Between 5 and 10", "Over 10"],
        theme: {
          monochrome: {
            enabled: true
          }
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -5
            }
          }
        },
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(1) + '%']
          }
        },
        legend: {
          show: false
        }
      },
    };
    this.getData();
  }
  getData(){
    fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/age-line-chart")
    .then(response => {
      response.json().then((data1) =>{
      this.updateUI(data1);
      });
    });
  }
  updateUI(data1){
    this.setState({
      series: data1
    })
  }
  render() {
    return (   
      <section className="panel">
          <Chart options={this.state.options} series={this.state.series} type="pie"/>
          <h4 className="titleChart">Statistic users by age in 2021</h4>
      </section>
    );
  }
}

export default StatisticAge;
