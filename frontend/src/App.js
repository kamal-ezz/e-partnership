import Header from "./components/Header";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import store from "./store";

function App() {
  return (
    <StoreProvider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
