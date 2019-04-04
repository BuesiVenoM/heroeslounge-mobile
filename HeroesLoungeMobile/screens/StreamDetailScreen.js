import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList, 
  ListItem
} from 'react-native';

import sortBy from 'array-sort-by';
import { WebBrowser } from 'expo';
import { Linking } from 'react-native';
import Touchable from 'react-native-platform-touchable';

import { MonoText } from '../components/StyledText';
import moment from 'moment';
import { black } from 'ansi-colors';

export default class StreamDetail extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true, matchId: 0}
  }
  
  static navigationOptions = {
    header: null,
  };

  render() {
    this.state.matchId = this.props.navigation.getParam('matchId', 0);
    return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'}}>
   <View style={{flex:1, backgroundColor:"red", width: "100%"}}>
   <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://heroeslounge.gg/storage/app/uploads/public/5a9/1b1/38b/5a91b138bc3ab994358442.png'}}
        />
    <Text>{this.state.matchId}</Text>
    <Text>hello world 1.........</Text>
    <Text>hello world 1.........</Text>
    <Text>hello world 1.........</Text>
    </View>
      <View style={{flex:1, backgroundColor:"blue", width:"100%"}}>
    <Text>hello world 2.........</Text>
    <Text>hello world 2.........</Text>
    <Text>hello world 2.........</Text>
    <Text>hello world 2.........</Text>
    </View>
    </View>
    );
  }

  componentDidMount(){
    //var url = 'https://heroeslounge.gg/api/v1/matches/withApprovedCastBetween/' + this.props.navigation.getParam('startDate', moment().format("YYYY-MM-DD")) + '/' + this.props.navigation.getParam('endDate', moment().format("YYYY-MM-DD"));
    var url = 'https://heroeslounge.gg/api/v1/matches/' + this.props.navigation.getParam('matchId', 1) + "/teams";
    console.log(url)
    this.state.matchId = this.props.navigation.getParam('matchId', 1)
    var options = { 
      headers: {
        "Content-Type": "application/json"
      } 
    }
    return fetch(url, options)
      .then((response) => response.json())
      .catch((error) =>{
        console.error(error);
      });
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  FlatList:{

  }
});
