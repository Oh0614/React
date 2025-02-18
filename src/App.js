import React from "react";
import MainContainer from "./components/Main/Main.Container";
import SignInContainer from "./components/Login/SignIn.Container";
import {BrowserRouter, Route, Routes} from "react-router";
import MenuController from "./components/Navigation/MenuController";
import CreateContainer from "./components/CRUD/Create.Container";

/*route 사용하여 특정 화면으로 라우팅 할 때 정의하여 사용한다 */
const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignInContainer/>}/>
                <Route path="/toolpad" element={<MainContainer/>}/>
                <Route path="/signIn" element={<SignInContainer/>}/>
                <Route path="/menuController" element={<MenuController/>}/>
                <Route path="/create/createObject" element={<CreateContainer />}/>
            </Routes>

        </BrowserRouter>

    );

};

export default App;
