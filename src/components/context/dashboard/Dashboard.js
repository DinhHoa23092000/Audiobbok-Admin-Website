import React, { Component }  from 'react';
import StatisticUser from './StatisticUser';
import StatisticAge from './StatisticAge';
import StatisticStory from './StatisticStory';
import CountNumber from './CountNumber';
import StoryStatisticLineChart from './StoryStatisticLineChart';
import TopStoryView from './TopStoryView';
export default class Dashboard extends Component{
  render() {
    return (
      <main role="main">
        <CountNumber/>
        <StatisticUser/>
        <StoryStatisticLineChart/>
        {/* <StatisticAge/> */}
        <TopStoryView/>
        <StatisticStory/>
       
      </main>
    );
  }
};