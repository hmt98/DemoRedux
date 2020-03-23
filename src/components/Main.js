import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import getTemp from '../api/getTemp';
import {
  startFetchData,
  fetchSuccess,
  fetchError,
} from '../redux/actionCreaters';
class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
    };
  }

  getWeatherMessage() {
    const {myCityName, myError, myIsLoading, myTemp} = this.props;
    if (myIsLoading) return '...Loading';
    if (myError) return `Vui lòng thử lại!`;
    if (!myCityName) return 'Nhập tên thành phố của bạn!';
    return `${myCityName} hiện tại là ${myTemp}oC`;
  }

  getTempByCityName() {
    const {cityName} = this.state;
    this.props.startFetchData();
    getTemp(cityName)
      .then(res =>
        this.props.fetchSuccess(cityName, res['list'][1]['main']['temp']),
      )
      .catch(() => this.props.fetchError());
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.messeage}>{this.getWeatherMessage()}</Text>
        <TextInput
          style={styles.textInput}
          placeholder="City Name"
          value={this.state.cityName}
          onChangeText={text => this.setState({cityName: text})}
        />
        <TouchableOpacity
          onPress={this.getTempByCityName.bind(this)}
          style={styles.button}>
          <Text>Lấy nhiệt độ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messeage: {
    color: 'white',
    fontSize: 30,
  },
  button: {
    padding: 10,
    backgroundColor: 'yellow',
    margin: 10,
  },
  textInput: {
    backgroundColor: 'grey',
    height: 40,
    width: 200,
    margin: 10,
    color: 'white',
  },
});

function mapStateToProps(state) {
  return {
    myCityName: state.cityName,
    myTemp: state.temp,
    myError: state.err,
    myIsLoading: state.isLoading,
  };
}
export default connect(mapStateToProps, {
  startFetchData,
  fetchSuccess,
  fetchError,
})(main);
