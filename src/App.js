import React, {useState} from 'react';
import './App.css';

function App() {
    return (
        <div className="container">
            <h1>Hello World</h1>
            <FuncComp initNumber={2}/>
            <ClassComp initNumber={2}/>
        </div>
    );
}

function FuncComp(props) {
    const numberState = useState(props.initNumber);
    let number = numberState[0]; /* state */
    let setNumber = numberState[1]; /* function that changes state */

    const [date, setDate] = useState(new Date().toString()); /* destructuring assignment */

    console.log('numberState', numberState); /* Array(2) */

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
