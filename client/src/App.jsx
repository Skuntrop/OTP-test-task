import EmailPage from "./EmailPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import OtpPage from "./OtpPage";
import {useState} from "react";


function App() {

    const [email, setEmail] = useState("")
    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<EmailPage email={email} handleEmailChange={handleEmailChange}/>}/>
                    <Route path="/signin" element={<OtpPage email={email}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
