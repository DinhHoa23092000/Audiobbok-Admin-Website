import React, { Component } from "react";
import Chart from "react-apexcharts";
class StoryStatisticLineChart extends Component {
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
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
      },
      series: [
        {
          name: "story",
          data: [0,0,0,0,0,0,0,0,0,0,0,0]
        }
      ]
    };
    this.getData();
  }
  getData(){
    fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/story-line-chart")
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
          name: "total stories",
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
          type="line"/>
        <h4 className="titleChart">Number of stories in 2021</h4>
      </section>
    );
  }
}
export default StoryStatisticLineChart;