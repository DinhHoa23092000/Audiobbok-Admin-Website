import React, { Component } from "react";
import Chart from "react-apexcharts";
class StatisticStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [{
        name: [],
        data: []
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: false,
          formatter: function (val) {
            return val ;
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        xaxis: {
          categories: [],
          position: 'top',
          axisBorder: {
            show: true
            
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val;
            }
          }
        }
      },
    };
    this.getData();
  } 
  getData(){
    fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/story-pie-chart")
    .then(response =>{
      response.json().then((data1) =>{
      this.updateUI(data1);
    });
    });
  }
  updateUI(data1){
    let story=[];
    let quantity=[];
    for(var i=0; i< data1.length;i++){
      story.push(data1[i].story_name);
      quantity.push(data1[i].total_quantity);
    }
    this.setState({
      series: [{
        name: "Quantity",
        data: quantity
      }],
      options: {
        xaxis: {
          categories: story
        }
      }
    })
  }  
  render() {
    return (
        <section className="panel important">
          <h3 className="titleChart">Top 5 favourite stories in 2021</h3>
          <Chart options={this.state.options} series={this.state.series} type="bar" height={365} />
        </section>
    );
  }
}
export default StatisticStory;