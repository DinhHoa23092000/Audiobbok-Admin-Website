import React, { Component } from "react";
import Chart from "react-apexcharts";
class StatisticUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
      },
      series: [
        {
          name: "user",
          data: [0,0,0,0,0,0,0,0,0,0,0,0]
        }
      ]
    };
    this.getData();
  }
  getData(){
    fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/user-line-chart")
    .then(response => {
      response.json().then((data1) =>  {
      this.updateUI(data1);
    });
    });
    }
  updateUI(data1){
    this.setState({
      series: [
        {
          name: "total users",
          data: data1
        }
      ]
    })
  }  
  render() {
    return (
      <section className="panel">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="area"/>
        <h4 className="titleChart">Number of users in 2021</h4>
      </section>
    );
  }
}
export default StatisticUser;