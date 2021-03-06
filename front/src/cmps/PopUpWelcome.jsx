import React from "react";
import { updateUser } from '../store/actions/userActions';
import { useDispatch,useSelector } from "react-redux";
import { userService } from '../services/userService';


const PopUpWelcome = (props) => {
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.user.loggedInUser)

    let currentTime = new Date()
    const currYear = currentTime.getFullYear();
    const currMonth = currentTime.getMonth() + 1;
    const today = currentTime.getDate();

    const doInOut = async ev => {
        loggedInUser.hours[currYear][currMonth][today].push(Math.round(Date.now() / 1000));
        dispatch(updateUser(loggedInUser))
        sessionStorage.setItem('user', JSON.stringify(loggedInUser))
        props.toggle();
    }

    return (
        <div>
            <div className="relative">
                {/* If user is out, dont display pop-up */}
                {(userService.hasOutHour(loggedInUser) ? null :
                    <div>
                        <div className="purple-bg"></div>
                        <div className="pop-image"></div>
                        <div className="popup2 ca">
                            <div className="rb">
                                <div></div>
                                <button className="close-x" onClick={props.toggle}>X</button>
                            </div>

                            <h1>Welcome Back, {loggedInUser.name} !</h1>
                            {(userService.hasInHour(loggedInUser) ?
                                <div className="grey-text">Leaving so soon?</div> :
                                <div className="grey-text">start your working day</div>)}
                            <div className="hour-popup"><b>
                                {new Date().getHours()} : {(new Date().getMinutes() < 10 ? 0 : null)}{new Date().getMinutes()}</b>
                            </div>

                            {(userService.hasInHour(loggedInUser) ?
                                <button className="clock-btn tvalign" onClick={doInOut}><i className="far fa-stop-circle fa-2x tvalign"></i> CLOCK OUT</button> :
                                <button className="clock-btn tvalign" onClick={doInOut}><i className="far fa-play-circle fa-2x tvalign"></i> CLOCK IN</button>)}

                            <button className="skip-text" onClick={props.toggle}>Skip for now</button>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PopUpWelcome