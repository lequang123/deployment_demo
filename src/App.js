import React, { Fragment, Component } from 'react';
import './App.css';
import './table.scss';
import { Table, HeaderRow, HeaderCell, Row, Cell } from './react-grid/index';
import { connect } from 'react-redux';
import { ActionCreators } from './actions';
import { bindActionCreators } from 'redux';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        test: ''
    };
  }

  componentDidMount() {
    this.props.setData('test set data');
  }

  buildHeader = () => {
    return (
        <HeaderRow>
            <HeaderCell colWidth={20}>{this.props.gridData}</HeaderCell>
        </HeaderRow>
    );
  };

  buildBody = () => {
      return [
          <Row key={`body${1}`} className="no-data" >
              <Cell className='text-center'>
                  test
              </Cell>
          </Row>
      ];
  };

  render(){
    return (
      <div className="App">
        <Table
          width={document.body.clientWidth}
          autoWidth={false}
          header={this.buildHeader()}
          body={this.buildBody()}
          containerPadding={0}
          adjustedHeight={10}
      />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridData } = state;
    return { gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
