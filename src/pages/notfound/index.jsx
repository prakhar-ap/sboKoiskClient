import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../../images/404.jpg';
class NotFoundPage extends React.Component{

    onClick = () => {
        return (
            <Link to={"/"} />
        )
    }
    render(){
        return (
            <div className={'pageNotFound'}>
                <img src={PageNotFound} onClick={this.onClick}/>
                <p style={{textAlign:"center"}}>
                    <Link to="/">Go to Home </Link>
                </p>
        </div>
        )
    }
}
export default NotFoundPage;
