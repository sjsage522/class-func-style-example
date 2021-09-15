import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
    const [funcShow, setFuncShow] = useState(true);
    const [classShow, setClassShow] = useState(true);
    return (
        <div className="container">
            <h1>Hello World</h1>
            <input type="button" value="remove func" onClick={
                () => setFuncShow(false)
            }/>
            <input type="button" value="remove class" onClick={
                () => setClassShow(false)
            }/>
            {funcShow && <FuncComp initNumber={2}/>}
            {classShow && <ClassComp initNumber={2}/>}
        </div>
    );
}

const funcStyle = 'color:grey';
let funcId = 0;
function FuncComp(props) {
    const numberState = useState(props.initNumber);
    let number = numberState[0]; /* state */
    let setNumber = numberState[1]; /* function that changes state */

    const [date, setDate] = useState(new Date().toString()); /* destructuring assignment */

    // 두 번째 인자로 [](빈 배열)을 주게 되면,
    // componentDidMount 와 같은 효과를 가질 수 있다. (처음 렌더링 되고나서 한번 호출되고, 그 이후 업데이트될 때는 호출x)
    useEffect(function () {
        console.log('%cfunc => useEffect (componentDidMount) ' + (++funcId), funcStyle);

        return function () {//
            console.log('%cfunc => useEffect return (componentWillUnMount) ' + (++funcId), funcStyle)
        }
    }, []);

    // 랜더링이 실해되고 나서 호출 (매번)
    // side effect
    useEffect(function () {
        console.log('%cfunc => useEffect number (componentDidMount & componentDidUpdate) ' + (++funcId), funcStyle);
        document.title = number;

        // clean up
        // render 후, useEffect 가 실행되기 전에 처리할 작업들을 정의 (즉, 이전의 useEffect 를 정리(clean-up))
        return function () {
            console.log('%cfunc => useEffect number return (componentDidMount & componentDidUpdate) ' + (++funcId), funcStyle)
        }
    }, [number]);

    // 두번째 인자로 상태값을 주게되면, 해당 상태가 변경되었을 경우에만 useEffect 가 호출된다.
    useEffect(function () {
        console.log('%cfunc => useEffect date (componentDidMount & componentDidUpdate) ' + (++funcId), funcStyle);
        document.title = date;

        return function () {
            console.log('%cfunc => useEffect date return (componentDidMount & componentDidUpdate) ' + (++funcId), funcStyle)
        }
    }, [date]);

    console.log('%cfunc => render ' + (++funcId), funcStyle);
    return (
        <div className="container">
            <h2>function style component</h2>
            <p>Number : {number}</p>
            <p>Date : {date}</p>
            <input type="button" value="random" onClick={
                () => {
                    setNumber(Math.random())
                }
            }/>
            <input type="button" value="date" onClick={
                () => {
                    setDate(new Date().toString())
                }
            }/>
        </div>
    )
}

const classStyle = 'color:green';
class ClassComp extends React.Component {
    state = {
        number: this.props.initNumber,
        date: (new Date()).toString(),
    }

    //render 호출 전
    static getDerivedStateFromProps() {
        console.log('%cclass => getDerivedStateFromProps', classStyle);
        return {};
    }

    //컴포넌트가 생성되고 render 호출 후, 최초 한번
    componentDidMount() {
        console.log('%cclass => componentDidMount', classStyle);
    }

    //render 를 호출할 필요가 있는지? true -> render 호출o, false -> 호출x
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('%cclass => shouldComponentUpdate', classStyle);
        return true;
    }

    //컴포넌트 업데이트 시 render 호출 후
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('%cclass => getSnapshotBeforeUpdate', classStyle);
        return null;
    }

    //컴포넌트 업데이트 시 getSnapshotBeforeUpdate 호출 후
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('%cclass => componentDidUpdate', classStyle);
    }

    //컴포넌트 제거 시 호출 (정리부분)
    componentWillUnmount() {
        console.log('%cclass => componentWillUnmount', classStyle);
    }

    render() {
        console.log('%cclass => render', classStyle);
        return (
            <div className="container">
                <h2>class style component</h2>
                <p>Number : {this.state.number}</p>
                <p>Date : {this.state.date}</p>
                <input type="button" value="random" onClick={
                    () => {
                        this.setState({number: Math.random()})
                    }
                }/>
                <input type="button" value="date" onClick={
                    () => {
                        this.setState({date: (new Date().toString())})
                    }
                }/>
            </div>
        )
    }
}

export default App;
