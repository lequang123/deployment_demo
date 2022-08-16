
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '../../react-grid/index';
import { Button, Form } from 'react-bootstrap';

export class DataGrid extends PureComponent {
    constructor(props) {
        super(props);
    }


    fn = (n, src, got, all) => {
        if (n === 0) {
            if (got.length > 0) {
                all[all.length] = got;
            }
            return;
        }
        for (let j = 0; j < src.length; j++) {
            this.fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
    }

    combine = (a, min) => {

        const all = [];
        for (let i = min; i < a.length; i++) {
            this.fn(i, a, [], all);
        }
        all.push(a);
        return all;
    }

    getLongestContainNumber = (initArray, numbers) => {
        let resultArr = {
            arr: [],
            count: 0
        };
        let maxArr = {
            arr: [],
            count: 0
        };

        const finalArr = [];
        let countDup = 0;
        for (let i = 0; i < initArray.length; i++) {
            countDup = 0;
            for (let j = 0; j < numbers.length; j++) {
                const initArr = initArray[i];
                const numberArr = numbers[j];
                const containNumber = initArr.filter(val => numberArr?.listData.includes(val));
                if (containNumber.length > 0) {
                    resultArr = {
                        arr: initArray[i],
                        count: ++countDup
                    }
                }
                else {
                    break;
                }
            }
            if (resultArr.count > 14) {
                maxArr = JSON.parse(JSON.stringify(resultArr));
                finalArr.push(maxArr);
                resultArr = {
                    arr: [],
                    count: 0
                };
            }
        }
        finalArr.map(item => {
            item.arr = item.arr.sort(function (a, b) { return parseInt(a, 10) - parseInt(b, 10) });
        });

        return finalArr;
    }

    getLongestContainNumber1 = (initArray, numbers) => {
        if (!numbers || numbers.length === 0) {
            return;
        }
        let resultArr = {
            arr: [],
            count: 0
        };
        let maxArr = {
            arr: [],
            count: 0
        };

        const finalArr = [];
        let countDup = 0;
        for (let i = 0; i < initArray.length; i++) {
            countDup = 0;
            for (let j = 0; j < numbers.length; j++) {
                const initArr = initArray[i];
                const numberArr = numbers[j];
                const containNumber = numberArr?.listData.filter(val => initArr.toString() === val);
                if (containNumber.length > 0) {
                    resultArr = {
                        arr: initArr,
                        count: ++countDup
                    }
                }
                else {
                    break;
                }
            }
            if (resultArr.count >= 2) {
                maxArr = JSON.parse(JSON.stringify(resultArr));
                finalArr.push(maxArr);
                resultArr = {
                    arr: "",
                    count: 0
                };
            }
        }

        return finalArr;
    }


    getFirstArray = lookNumber => {
        const saveArr = [];
        const sliceData = this.props.gridDataJoin.slice(0, 20);
        let isBreak = true;

        for (let k = 0; k < sliceData.length; k++) {
            if (!sliceData[k].listData) {
                continue;
            }
            const nestedReverseArr = sliceData[k].listData.filter((v, i, a) => a.findIndex(t => (t === v)) === i);
            isBreak = true;

            for (let j = 0; j < nestedReverseArr.length; j++) {
                const first = nestedReverseArr[j].substring(0, 1);
                if (first === lookNumber.toString()) {
                    isBreak = false;
                    saveArr.push(nestedReverseArr[j]);
                }
            }

            if (isBreak) {
                break;
            }

        }
        const removeDupArr = saveArr.filter((v, i, a) => a.findIndex(t => (t === v)) === i);
        const combineArr = this.combine(removeDupArr, 4);

        return combineArr;
    }

    getEndArray = lookNumber => {
        const saveArr = [];
        const sliceData = this.props.gridDataJoin.slice(0, 20);
        let isBreak = true;

        for (let k = 0; k < sliceData.length; k++) {
            if (!sliceData[k].listData) {
                continue;
            }
            const nestedReverseArr = sliceData[k].listData.filter((v, i, a) => a.findIndex(t => (t === v)) === i);
            isBreak = true;

            for (let j = 0; j < nestedReverseArr.length; j++) {
                const end = nestedReverseArr[j].substring(1, 2);
                if (end === lookNumber.toString()) {
                    isBreak = false;
                    saveArr.push(nestedReverseArr[j]);
                }
            }

            if (isBreak) {
                break;
            }

        }
        const removeDupArr = saveArr.filter((v, i, a) => a.findIndex(t => (t === v)) === i);
        const combineArr = this.combine(removeDupArr, 4);

        return combineArr;
    }

    handleDelete = (event, id) => {
        event.preventDefault();
        const deleteData = this.props.gridDataJoin.filter(x => x.id !== id);
        this.props.setGridDataJoin(deleteData);
        this.props.setGridDataDelete(id);
    }

    buildGridHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={7}>Bảng</HeaderCell>
                <HeaderCell colWidth={5}>Xóa</HeaderCell>
                <HeaderCell colWidth={5}>Số thứ tự</HeaderCell>
                <HeaderCell colWidth={5}>Số 1</HeaderCell>
                <HeaderCell colWidth={5}>Số 2</HeaderCell>
                <HeaderCell colWidth={5}>Số 3</HeaderCell>
                <HeaderCell colWidth={5}>Số 4</HeaderCell>
                <HeaderCell colWidth={5}>Số 5</HeaderCell>
                <HeaderCell colWidth={5}>Số 6</HeaderCell>
                <HeaderCell colWidth={5}>Số 7</HeaderCell>
                <HeaderCell colWidth={5}>Số 8</HeaderCell>
                <HeaderCell colWidth={5}>Số 9</HeaderCell>
                <HeaderCell colWidth={5}>Số 10</HeaderCell>
                <HeaderCell colWidth={5}>Số 11</HeaderCell>
                <HeaderCell colWidth={5}>Số 12</HeaderCell>
                <HeaderCell colWidth={5}>Số 13</HeaderCell>
                <HeaderCell colWidth={5}>Số 14</HeaderCell>
                <HeaderCell colWidth={5}>Số 15</HeaderCell>
                <HeaderCell colWidth={5}>Số 16</HeaderCell>
                <HeaderCell colWidth={5}>Số 17</HeaderCell>
                <HeaderCell colWidth={5}>Số 18</HeaderCell>
                <HeaderCell colWidth={5}>Số 19</HeaderCell>
                <HeaderCell colWidth={5}>Số 20</HeaderCell>
                <HeaderCell colWidth={5}>Số 21</HeaderCell>
                <HeaderCell colWidth={5}>Số 22</HeaderCell>
                <HeaderCell colWidth={5}>Số 23</HeaderCell>
                <HeaderCell colWidth={5}>Số 24</HeaderCell>
                <HeaderCell colWidth={5}>Số 25</HeaderCell>
                <HeaderCell colWidth={5}>Số 26</HeaderCell>
                <HeaderCell colWidth={5}>Số 27</HeaderCell>
            </HeaderRow>
        );
    };

    buildGridHeader1 = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={10}>Số thứ tự</HeaderCell>
                <HeaderCell colWidth={30}>Dãy Số</HeaderCell>
                <HeaderCell colWidth={10}>Số lần xuất hiện</HeaderCell>
            </HeaderRow>
        );
    };

    buildGridBody1 = longestNumberArr => {
        if (longestNumberArr.length > 0) {
            let rows = [];
            let indexRow = 0;
            longestNumberArr.map(data => {
                data.map((item, index) => {
                    indexRow++;
                    rows.push(this.renderRow1(item, indexRow));
                });
            })
            return rows;
        }

        return [<Row key={`body${1}`} className="no-data"><Cell colSpan="3">không có dữ liệu</Cell></Row>];
    };

    renderRow1 = (item, index) => {
        return (
            <Row key={index}>
                <Cell className="text-center">{index}</Cell>
                <Cell className="text-center">{item.arr.join(' --- ')}</Cell>
                <Cell className="text-center">{item.count}</Cell>
            </Row>
        )
    };

    buildGridBody = () => {
        if (this.props.gridDataJoin.length > 0) {
            let rows = [];
            if (this.props.lookNumber !== '') {
                const dataJoin = [];
                let indexArr = 0;
                this.props.gridDataJoin.map(data => {
                    const filterArr = [];
                    data?.listData.map(item => {
                        const first = item.substring(0, 1);
                        if (first === this.props.lookNumber) {
                            filterArr.push(item);
                        }
                    });
                    if (filterArr.length > 0) {
                        const data = {
                            id: indexArr++,
                            listData: filterArr
                        }
                        dataJoin.push(data);
                    }
                    else {
                        dataJoin.push({ id: indexArr++, listData: [] });
                    }
                })
                dataJoin.map((item, index) => {
                    rows.push(this.renderRow(item, index));
                });

            }
            else {
                // const dataGrid = this.reverseArray(this.props.gridDataJoin);
                this.props.gridDataJoin.map((item, index) => {
                    rows.push(this.renderRow(item, index));
                });
            }
            return rows;
        }

        return [<Row key={`body${1}`} className="no-data"><Cell colSpan="29">không có dữ liệu</Cell></Row>];
    };

    renderRow = (item, index) => (
        <Row key={index}>
            <Cell className="parent-level-0">{`bảng ${index + 1}`}</Cell>
            <Cell >
                <Form.Check
                    className="text-center"
                    onClick={event => this.handleDelete(event, item.id)}
                    checked
                    disabled={item.listData.length < 27}
                    type='checkbox'
                    id={`check-${index}`}
                />
            </Cell>
            <Cell className="text-center">{index}</Cell>
            {
                item?.listData.map(number => <Cell>{number}</Cell>)
            }
        </Row>
    );

    buildGridHeader4 = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={10}>Số</HeaderCell>
                <HeaderCell colWidth={10}>Số lần</HeaderCell>
            </HeaderRow >
        );
    };

    buildGridBody4 = longNumber => {
        if (longNumber !== undefined && longNumber.length > 0) {
            let rows = [];
            const test = [...longNumber];
            const test1 = test.sort(function (a, b) { return b.count - a.count });
            const getMax4 = test1.slice(0, 4);
            const joinArr = getMax4.map(x => x.arr).join('-');
            const row1 = <Row>
                <Cell className="text-center">{joinArr}</Cell>
                <Cell className="text-center"></Cell>
            </Row >
            rows.push(row1);
            if (test1.length >= 8) {
                const getMax8 = test1.slice(4, 8);
                const joinArr2 = getMax8.map(x => x.arr).join('-');
                const row2 = <Row>
                    <Cell className="text-center">{joinArr2}</Cell>
                    <Cell className="text-center"></Cell>
                </Row >
                rows.push(row2);
            }
            if (test1.length >= 12) {
                const getMax12 = test1.slice(8, 12);
                const joinArr3 = getMax12.map(x => x.arr).join('-');
                const row2 = <Row>
                    <Cell className="text-center">{joinArr3}</Cell>
                    <Cell className="text-center"></Cell>
                </Row >
                rows.push(row2);
            }
            //const testArr = this.getMaxValue(this.props.testArr);
            test1.map((data, index, getMax4) => {
                rows.push(this.renderRow4(data, index));
            })
            return rows;
        }

        return [<Row key={`body${1}`} className="no-data"><Cell colSpan="3">không có dữ liệu</Cell></Row>];
    };

    getMaxValue = arr => {
        const arrayFiltered = [];
        arr.forEach(obj => {
            const item = arrayFiltered.find(thisItem => thisItem.arr === obj.arr);
            if (item) {
                if (item.count < obj.count) {
                    arrayFiltered.push(obj);
                }

                return;
            }
            arrayFiltered.push(obj);
        });
        return arrayFiltered;
    }


    renderRow4 = (item, index) => {
        if (item.count >= 3) {
            console.log(item.count);
        }
        return (
            <Row key={index}>
                <Cell className="text-center">{item.arr}</Cell>
                <Cell className="text-center">{item.count}</Cell>
            </Row>
        )
    };

    render() {
        const longestNumberArr = [];
        const longestNumberArrEnd = [];
        for (let i = 0; i < 10; i++) {
            const firstArr = this.getFirstArray(i);
            const onlyGetFour = firstArr.filter(x => x.length === 4);
            let longestNumber = this.getLongestContainNumber(onlyGetFour, this.props.gridDataJoin);
            longestNumber.sort(function (a, b) { return b.count - a.count });
            longestNumber = longestNumber.slice(0, 5);
            longestNumberArr.push(longestNumber);
        }
        for (let j = 9; j >= 0; j--) {
            const firstArrEnd = this.getEndArray(j);
            const onlyGetFourEnd = firstArrEnd.filter(x => x.length === 4);
            let longestNumberEnd = this.getLongestContainNumber(onlyGetFourEnd, this.props.gridDataJoin);
            longestNumberEnd.sort(function (a, b) { return b.count - a.count });
            longestNumberEnd = longestNumberEnd.slice(0, 5);
            longestNumberArrEnd.push(longestNumberEnd);
        }
        const arrFilter = longestNumberArr.filter(x => x.length > 0);
        const arrWin = [];
        arrFilter.map(filter => {
            filter.map(item => {
                const arr = { stringJoin: item.arr.join(','), count: item.count };
                arrWin.push(arr);
            })
        })

        const arrFilterEnd = longestNumberArrEnd.filter(x => x.length > 0);
        const arrWinEnd = [];
        arrFilterEnd.map(filter => {
            filter.map(item => {
                const arr = { stringJoin: item.arr.join(','), count: item.count };
                arrWinEnd.push(arr);
            })
        })
        if (arrWinEnd.length > 0 || arrWin.length > 0) {
            const combine = [...arrWinEnd, ...arrWin]
            this.props.setArrayWin(combine);
        }

        const filterArr = Array.from(Array(100).keys());
        const longNumber = this.getLongestContainNumber1(filterArr, this.props.gridDataJoin);

        //if (longNumber !== undefined && longNumber.length > 0) {
        //    this.props.setTestaArr(longNumber);
        //}

        //teddy1996

        return (
            <>
                <div className='table-number'>
                    <Table
                        width={100}
                        autoWidth={false}
                        header={this.buildGridHeader4()}
                        body={this.buildGridBody4(longNumber)}
                        isPaging={false}
                        containerPadding={0}
                        adjustedHeight={10}
                    />
                    <Table
                        width={250}
                        autoWidth={false}
                        header={this.buildGridHeader1()}
                        body={this.buildGridBody1(longestNumberArr)}
                        isPaging={false}
                        containerPadding={0}
                        adjustedHeight={10}
                    />
                    <Table
                        width={250}
                        autoWidth={false}
                        header={this.buildGridHeader1()}
                        body={this.buildGridBody1(longestNumberArrEnd)}
                        isPaging={false}
                        containerPadding={0}
                        adjustedHeight={10}
                    />
                    <Table
                        width={document.body.clientWidth - 600}
                        autoWidth={false}
                        header={this.buildGridHeader()}
                        body={this.buildGridBody()}
                        isPaging={false}
                        containerPadding={0}
                        adjustedHeight={10}
                    />
                </div>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridData, gridDataJoin, lookNumber, showWin } = state;
    return {
        gridData,
        gridDataJoin,
        lookNumber,
        showWin
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);