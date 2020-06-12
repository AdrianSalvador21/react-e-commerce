import React from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import {createStructuredSelector} from "reselect";
import {selectIsCollectionFetching, selectIsCollectionsLoaded} from "../../redux/shop/shop.selectors";


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);


// Router pass props -> match
// match.path -> /shop
class ShopPage extends React.Component {

  constructor() {
    super();

    this.state = {
      isLoading: true
    }
  }
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    /*const {updateCollections} = this.props;
    const collectionRef = firestore.collection('collections');
    collectionRef.get().then(snapshot => {
      console.log(snapshot);
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      console.log(collectionsMap);
      updateCollections(collectionsMap);
      this.setState({isLoading: false})
    })*/

    /* fetch('https://firestore.googleapis.com/v1/projects/e-commerce-487e3/databases/(default)/documents/collections')
      .then(response => response.json())
      .then(collections => console.log(collections)); */

    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync()

  }

  render() {
    const {match, isCollectionFetching, isCollectionsLoaded} = this.props;
    console.log(isCollectionFetching);
    // const {isLoading} = this.state;
    console.log(this.state);
    // console.log(isLoading);
    return (
        <div className='shop-page'>
          <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} />
          <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionsPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />} />
        </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
