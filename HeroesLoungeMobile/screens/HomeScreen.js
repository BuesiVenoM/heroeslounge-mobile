import React from 'react';
import DatePicker from 'react-native-datepicker';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList, 
  ListItem,
  Button
} from 'react-native';

import sortBy from 'array-sort-by';
import { WebBrowser } from 'expo';
import { Linking } from 'react-native';
import Touchable from 'react-native-platform-touchable';

import { MonoText } from '../components/StyledText';
import moment, { months } from 'moment';
import { black } from 'ansi-colors';


export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true, startDate: moment().format('YYYY-MM-DD'), endDate:moment().add(1, 'months').format('YYYY-MM-DD')}
  }
  
  static navigationOptions = {
    header: null,
  };

  selectionStreams(){
    console.log("Show streams between: " + this.state.startDate + " and: " + this.state.endDate)
    this.props.navigation.navigate("SelectionStreams", {startDate: this.state.startDate, endDate: this.state.endDate})

  }

  render() {
    return (
      // Try setting `justifyContent` to `center`.
      // Try setting `flexDirection` to `row`.
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View style={{height: 50, backgroundColor: 'powderblue'}}><Text>select the range of casted streams</Text></View>
        <View><Text>Startdatum</Text>
          <DatePicker
                style={{width: 200}}
                date={this.state.startDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={moment().format("YYYY-MM-DD")}
                maxDate={moment().add(1, "months").format("YYYY-MM-DD")}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(startDate) => {this.setState({startDate: startDate})}}
              />
              <Text>Enddatum</Text>
          <DatePicker
                style={{width: 200}}
                date={this.state.endDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={moment().format("YYYY-MM-DD")}
                maxDate={moment().add(2, "months").format("YYYY-MM-DD")}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(endDate) => {this.setState({endDate: endDate})}}
              />
              </View>
              <Button
                onPress={this.selectionStreams.bind(this)}
                title="show streams"
                color="#841584"
                accessibilityLabel="show streams in selection range"
              />
        <View style={{height: 50, backgroundColor: 'powderblue'}}><Text>Test1</Text></View>
      </View>
    );
  }

  handleClick = () => {
    Linking.canOpenURL(this.props.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,

          backgroundColor: "#CED0CE",

        }}
      />
    );
};

  componentDidMount(){
    var yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')
    var tomorrow = moment().add(1, 'days').format('YYYY-MM-DD')
    var url = 'https://heroeslounge.gg/api/v1/matches/withApprovedCastBetween/' + yesterday + '/' + tomorrow;
    var options = { 
      headers: {
        "Content-Type": "application/json"
      } 
    }
    return fetch(url, options)
      .then((response) => response.json())
      .then((responseJson) => {
        // convert to proper array
        // alert
        var matches = []
          for (var key in responseJson) {
            if (responseJson.hasOwnProperty(key)) {
                //alert(key + " -> " + JSON.stringify(responseJson[key]));
                matches.push(responseJson[key])
            }
          }
        //sort that array by time and date
        sortBy(matches, (s) => moment(s.wbp).format("YYYYMMDDhhmm"));

        this.setState({
          isLoading: false,
          dataSource: matches
        }, function(){
        });
        
      })
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
