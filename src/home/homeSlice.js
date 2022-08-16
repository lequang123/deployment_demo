import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        },
        gridData: [],
        gridDataJoin: [],
        deleteId: [],
        lookNumber: '',
        arrayWin: [],
        showWin: {show: false},
        arrayWinNumber: [],
        testArr: []
    },
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridData: (state, action) => {
            if(state.gridData === null){
                state.gridData = [];
            }
            const combineData = [...state.gridData, action.payload];
            const tables = combineData.length / 27;
            const joinData = [];
            let j = 0
            if(tables <= 1){
                const data1 = {
                    id: j++,
                    listData: combineData.slice(0, 27)
                }
                joinData.push(data1);
            }
            else if(1 < tables){
                const data1 = {
                    id: j++,
                    listData: combineData.slice(0, 27)
                }
                joinData.push(data1);

                for(let i = 1; i < tables; i++){
                    const data2 = {
                        id: j++,
                        listData:  combineData.slice(27 * i, (i+1) * 27 )
                    }
                    joinData.push(data2);
                }
            }
            state.gridData =  [...state.gridData, action.payload]
            let deleteArr = joinData;
            if(state.deleteId.length > 0){
                deleteArr =  joinData.filter(x => !state.deleteId.includes(x.id));
                setGridDataDelete([]);
            }
            const reverseArr = [];
            for(let k = deleteArr.length - 1; k >= 0; k--)
            {   
                reverseArr.push(deleteArr[k]);
            }
            if (reverseArr.length > 70) {
                state.gridDataJoin = reverseArr.slice(0, 70);
            }
            else {
                state.gridDataJoin = reverseArr;
            }
        },
        setTestaArr: (state, action) => {
            state.testArr = [...state.testArr, ...action.payload];
        },
        setGridDataJoin: (state, action) => {
            state.gridDataJoin =  action.payload;
        },
        setGridDataDelete: (state, action) => {
            state.deleteId =  [...state.deleteId, action.payload];
        },
        setLookNumber: (state, action) => {
            state.lookNumber =  action.payload;
        },
        setArrayWin: (state, action) => {
            const parseArr = JSON.parse(JSON.stringify(state.arrayWin));
            parseArr.forEach(item =>{
                const isFalse = action.payload.filter(x => item.stringJoin === x.stringJoin).length > 0;
                if (!isFalse) {
                    //console.log(item.stringJoin + ': ' + item.count);
                    state.arrayWinNumber = [...state.arrayWinNumber, item.count];
                    const arrayWinParse = JSON.parse(JSON.stringify(state.arrayWin));
                    const coppyFilterArr = arrayWinParse.filter(x1 => x1.stringJoin !== item.stringJoin);
                    state.arrayWin = coppyFilterArr;
                }
            })
            
            state.arrayWin = [...state.arrayWin, ...action.payload];
            const parseArrFinal = JSON.parse(JSON.stringify(state.arrayWin));
            const res = Object.values(parseArrFinal.reduce((acc, obj) => {
                const curr = acc[obj.stringJoin];
                acc[obj.stringJoin] = curr ? (curr.count < obj.count ? obj : curr) : obj;
                return acc;
              }, {}));
            state.arrayWin = res;
        },
        setShowWinNumber: (state, action) => {
            state.showWin = action.payload;
        },
    } 
});

const { actions, reducer } = homeSlice;

export const {
    setGridParams,
    setGridData,
    setGridDataJoin,
    setGridDataDelete,
    setLookNumber,
    setArrayWin,
    setShowWinNumber,
    setTestaArr
} = actions;

export default reducer;