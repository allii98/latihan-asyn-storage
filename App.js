import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { data } from 'browserslist';

let obj = {nama: 'nabilla', alamat:'kajen'};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      arr: [
       {nama: 'nabilla', alamat:'kajen'},
       {nama: 'ayu', alamat:'kebumen'},
       {nama: 'elda', alamat:'sukabumi'},
       {nama: 'fahri', alamat:'bandung'},
      ]
    };
  }

  componentDidMount() {
    this.getData('@arrobj');
  }

  // fungsi simpan data
  saveData = async (data, key) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      console.log('data berhasil disimpan');
    } catch (e) {
      console.log(e);
    }
  }
  
  // fungsi read data
  getData = async (key) =>{
    try {
      let value = await AsyncStorage.getItem(key);
      value = JSON.parse(value);
      if (value !== null) {
        
        this.setState({data: value})
      }
      console.log('data berhasil di get', value)
    } catch (e) {
      console.log(e);
    }
  }

  // fungsi update data
  updateData = () => {
    let value = this.state.data;
    value[0].nama = 'Ria Nabilla';
    this.saveData(data, '@arrobj');
    this.setState({data: value})
  }

  //fungsi delete data

  deleteData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log('data berhasil dihapus');
      this.setState({data :[]});
    } catch (e) {
      console.log(e);
      console.log('data gagal dihapus');
    }
  }

  render() {
    return (
      <View>
        
        <Text>Simpan Data</Text>
        <TouchableOpacity onPress={() => this.saveData('Hello World', '@str')}>
          <Text>Simpan</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.saveData(obj, '@object')}>
          <Text>Simpan data object</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.saveData(this.state.arr, '@arrobj')}>
          <Text>Simpan data array</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateData()}>
          <Text>Update data </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.getData('@arrobj')}>
          <Text>Get data</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.deleteData('@arrobj')}>
          <Text>Delete data</Text>
        </TouchableOpacity>

        <FlatList 
          data={this.state.data}
          keyExtractor={(item) => item.nama}
          renderItem={({item}) =>
          <View  style={{
                   marginHorizontal:20,
                   marginVertical:10,
                   backgroundColor: '#0d47a1',
                   padding: 10,
                   borderRadius: 10,
                   elevation: 5
          }}>
            <Text style={{
                   color: '#ffffff',
                   fontSize: 12,
                   fontWeight:'bold',
               }}>{item.nama}</Text>
            <Text style={{
                   color: '#ffffff',
                   fontSize: 12,
                   fontWeight:'bold',
               }}>{item.alamat}</Text>
          </View>
          }
        />
      </View>
    );
  }
}
