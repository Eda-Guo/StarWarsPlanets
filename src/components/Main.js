import React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import MainTable from './MainTable';
import Pagination from '@mui/material/Pagination';
import { styled } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';



class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      planets: [],
      pageCount: 0,
      page: 1,
      charLabel: [],
      charData: []
    }
    this.getData = this.getData.bind(this);
    this.changePage = this.changePage.bind(this);
  }


  getData() {
    axios.get('https://swapi.py4e.com/api/planets/')
      .then(response => {
        console.log("Get data from API: ", response.data.results);
        this.setState({ planets: response.data.results });
        this.setState({ pageCount: (Math.ceil(response.data.count / 10)) });
        this.getCharLable();
        this.getCharData();
      })
      .catch(error => {
        console.log("Opps Error: " + error);
        alert(error);
      })
  }

  changePage(event, value) {
    var pageNum = value;
    var url = "https://swapi.py4e.com/api/planets/?page=" + pageNum;
    this.setState({ page: value });
    // get data from [next]
    this.getDataFromNextPage(url);
  }

  getDataFromNextPage(url) {
    axios.get(url)
      .then(response => {
        console.log("Get data from API: ", response.data.results);
        this.setState({ planets: response.data.results });
        this.getCharLable();
        this.getCharData();
      })
      .catch(error => {
        console.log("Opps Error: " + error);
        alert(error);
      })
  }

  getCharLable() {
    var lables = [];
    this.state.planets.forEach((currPla) => {
      lables.push(currPla.name);
    });
    this.setState({ charLabel: lables });
  }

  getCharData() {
    var datas = [];
    this.state.planets.forEach((currPla) => {
      if (currPla.population === 'unknown') {
        datas.push(0);
      }
      else {
        datas.push(currPla.population);
      }
    });
    this.setState({ charData: datas });
  }

  render() {
    const MyButton = styled(Button)({
      background: 'linear-gradient(160deg,  #F7997D 40%, #FAB742 80%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px ',
      height: 60,
      width: 250,
      padding: '0 20px',
      fontWeight: 'bold'
    });

    return (
      <div className="container">
        <div className="butContainer">
          <MyButton sx={{ fontWeight: 'bold', fontSize: 15, color: 'beige' }} className="getBut" variant="contained" onClick={this.getData}>click to get plates</MyButton>
        </div>
        <div className="tableContainer">
          <MainTable planets={this.state.planets} />
          <div className="chartContainer">
            <Bar data={{
              labels: this.state.charLabel,
              datasets: [{
                label: '# of Population',
                data: this.state.charData,
                backgroundColor: ['#cf583a', '#fcd1d1', '#bae8e8', '#ad6c80', '#E2AE6C', '#49545B', '#ffd5ab', '#708160', '#D89336', '#34a3a3'],
                borderColor: 'gray',
                borderWidth: 1
              }]
            }}
              height={300}
              options={{ maintainAspectRatio: false }} />
          </div>
          <Box display="flex" height={55} bgcolor="#fcdac5" alignItems="center" justifyContent="center">
            <Pagination size="large" count={this.state.pageCount} page={this.state.page} onChange={this.changePage} showFirstButton showLastButton />
          </Box>
        </div>

      </div>
    );
  }
}

export default Main;