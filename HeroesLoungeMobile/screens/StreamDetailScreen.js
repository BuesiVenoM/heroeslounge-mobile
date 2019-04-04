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
    this.state ={ isLoading: true, matchId: 0, team1: 0, team2:0, team1logo:"",team2logo:"", teams:0}
  }
  
  static navigationOptions = {
    header: null,
  };

  render() {
    this.state.teams = this.props.navigation.getParam('teams', 0);
    this.state.matchId = this.props.navigation.getParam('matchId', 0);
    return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'}}>
   <View style={{flex:1, backgroundColor:"red", width: "100%"}}>
   <Image
          style={{width: 100, height: 100}}
          source={{uri: this.state.team1logo.path}}
        />
    <Text>{this.state.teams[0].id}</Text>
    <Text>{this.state.teams[0].title}</Text>
    <Text>{this.state.teams[0].short_description}</Text>
    <Text>hello world 1.........</Text>
    </View>
      <View style={{flex:1, backgroundColor:"blue", width:"100%"}}>
      <Image
          style={{width: 100, height: 100}}
          source={{uri: this.state.team2logo.path}} 
        />
    <Text>{this.state.teams[1].id}</Text>
    <Text>{this.state.teams[1].title}</Text>
    <Text>{this.state.teams[1].short_description}</Text>
    <Text>hello world 2.........</Text>
    </View>
    </View>
    );
  }

  componentDidMount(){
    this.state.teams = this.props.navigation.getParam('teams', 0);
    console.log(this.state.teams);
    //this.state.team1 = fetch('https://heroeslounge.gg/api/v1/teams/' + this.props.navigation.getParam('team1', 0));

    var request_1_url = 'https://heroeslounge.gg/api/v1/teams/' + this.state.teams[0].id;
    var request_2_url = 'https://heroeslounge.gg/api/v1/teams/' + this.state.teams[1].id;
    var request_3_url = 'https://heroeslounge.gg/api/v1/teams/' + this.state.teams[0].id + '/logo';
    var request_4_url = 'https://heroeslounge.gg/api/v1/teams/' + this.state.teams[1].id + '/logo';

    console.log(request_1_url);
    console.log(request_2_url);
    console.log(request_3_url);
    console.log(request_4_url);



    fetch(request_1_url).then((response) => response.json()).then((responseData)  => {
        this.setState({
          team1: responseData
        });
    }).then(()=>{
        fetch(request_2_url).then((response) => response.json()).then((responseData) => {
         this.setState({
            team2: responseData
         });
     }).then(()=>{
      fetch(request_3_url).then((response) => response.json()).then((responseData) => {
       this.setState({
          team1logo: responseData
       });
   }).then(()=>{
    fetch(request_4_url).then((response) => response.json()).then((responseData) => {
     this.setState({
        team2logo: responseData
     });
 }).done();}).done();}).done();
    }).done();
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
