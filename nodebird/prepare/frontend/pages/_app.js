import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';

//프로젝트 전체에 공통으로 들어갈 부분은 여기 넣으면 된다.
//ant 디자인은 전체적으로 사용할 것이기 때문에 이렇게 넣는다
const App = ({Component}) => {
    return(
        <>
        <Head>
            <meta charSet="utf-8"/>
            <title>NodeBird</title>
        </Head>
        <Component/>
        </>
    )
}

//propTypes는 
App.propTypes = {
    Component : PropTypes.elementType.isRequired,
}

export default App;