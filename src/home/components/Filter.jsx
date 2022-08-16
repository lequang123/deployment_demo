import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';


export class Filter extends PureComponent {
    constructor(props) {
        super(props);
        this.numberInput = React.createRef();
        this.state = {
            number: '',
        };
    }

    handleTemplateNameChange = event => {
        this.setState({
            number: event.target.value
        });
    };

    onKeyDown = event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          this.handleAdd(event);
        }
      }

    handleAdd = event => {
        event.preventDefault();
        this.numberInput.current.value = '';
        this.numberInput.current.focus();
        this.props.setLookNumber('');
        this.props.setGridData(this.state.number);
    };

    pasteCustomerHandler = (event) => {
        const items = (event.clipboardData || window.clipboardData).getData('text')
            .replace(/[^0-9]/g,'');
            
        const splitItem = items.match(/.{1,2}/g);
        splitItem.map(item =>{
            this.props.setGridData(item);
        })
        this.props.setLookNumber('');
        this.numberInput.current.value = '';
        this.numberInput.current.focus();
    };


    handleGetFirstNumber = event => {
        event.preventDefault();
        this.props.setLookNumber(this.state.number);
    };

    handleGetWinNumber = event => {
        event.preventDefault();
        const counts = {};
        this.props.arrayWinNumber.forEach((item) => {
            console.log(item);
        });

        this.props.arrayWinNumber.forEach((x) => {
        counts[x] = (counts[x] || 0) + 1;
        });
        console.log(counts)
    };


    render() {
        return (
            <Form className="form-filter" onSubmit={this.handleSubmit}>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label htmlFor="number">Số</Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none"
                            ref={this.numberInput}
                            onPaste={event => this.pasteCustomerHandler(event)}
                            id="number" autoComplete="off"
                            onChange={this.handleTemplateNameChange}
                            onKeyDown={this.onKeyDown}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button className="mr-2" variant="primary" size="sm"
                            onClick={this.handleAdd}
                        >
                           Thêm số
                        </Button>
                        <Button className="mr-2" variant="primary" size="sm"
                            onClick={this.handleGetFirstNumber}
                        >
                            tìm kiếm đầu
                        </Button>
                        <Button className="mr-2" variant="primary" size="sm"
                            onClick={this.handleGetWinNumber}
                        >
                            số win nhiều nhất
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridData, gridDataJoin, arrayWinNumber } = state;
    return { gridData, gridDataJoin, arrayWinNumber};
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
