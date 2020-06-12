import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignPage from "./pages/signpage/signpage.component";
import {addCollectionAndDocuments, auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";
import {createStructuredSelector} from "reselect";
import CheckoutPage from './pages/checkout/checkout.component';
import {selectCurrentUser} from "./redux/user/user.selectors";
import {selectCollectionsForPreview} from "./redux/shop/shop.selectors";

class App extends React.Component{
  constructor() {
    super();

  }

  unsubscribeFromAuth = null;

  componentDidMount() {


    const { setCurrentUser, collectionsArray } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log(userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          // console.log(snapshot.data());
          // function setCurrentUser dispatch the action
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            })
          }, () => {
            console.log(this.state);
          });
      }
      setCurrentUser( userAuth );

      // add collections by first time
      // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})));
      // this.setState({ currentUser: user})
      //const userRef = createUserProfileDocument(user);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route exact path='/signin' render={() =>
            this.props.currentUser ?
              (<Redirect to='/' />) :
              (<SignPage />)}
          />
        </Switch>
      </div>
    );
  }
}

/* const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
}); */

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser((user)))
});

// we can pass as first argument null, if don't need any element of state
export default connect(mapStateToProps, mapDispatchToProps)(App);
