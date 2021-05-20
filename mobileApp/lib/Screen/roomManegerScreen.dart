import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../widgets/roomComp.dart';

class RoomManeger extends StatefulWidget {
  @override
  _RoomManegerState createState() => _RoomManegerState();
}

class _RoomManegerState extends State<RoomManeger> {
  // final dumy = [
  //   {
  //     'name': 'ac',
  //     'state': true,
  //   },
  //   {
  //     'name': 'pro',
  //     'state': true,
  //   }
  // ];

  bool _isInit = false;
  bool _isLoading = false;
  List _componentList;

  @override
  void initState() {
    _isInit = true;
    super.initState();
  }

  void _chengeState(String id, bool nextState) {
    print(_componentList);
    for (var i = 0; i < _componentList.length; i++) {
      if (_componentList[i]['id'] == id) {
        _componentList[i]['state'] = nextState;
        break;
      }
    }
    print(_componentList);
  }

  Future<void> _fetchData() async {
    final String url = 'http://10.0.2.2:5000/main/timeTable';
    try {
      // final respose = await http.post(
      //   url,
      //   body: null,
      // );
      // _componentList = json.decode(respose.body);
      _componentList = [
        {
          'id': 'Ac01',
          'name': 'ac',
          'state': true,
        },
        {
          'id': 'pro01',
          'name': 'pro',
          'state': true,
        }
      ];
      print(_componentList);
    } catch (e) {
      throw (e);
    }
  }

  @override
  void didChangeDependencies() {
    if (_isInit) {
      setState(() {
        _isLoading = true;
      });

      try {
        _fetchData().then((value) {
          setState(() {
            _isLoading = false;
          });
        }).catchError((e) {
          _showErrorDialog('Data fetch failed.');
        });
      } catch (e) {
        _showErrorDialog('Data fetch failed');
      }
    }
    _isInit = false;
    super.didChangeDependencies();
  }

  void _showErrorDialog(String msg) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('Oopzz'),
        content: Text(msg),
        actions: <Widget>[
          FlatButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: Text('Okey'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final deviceSize = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
        title: Text('Room Maneger'),
        actions: [
          IconButton(
            color: Colors.black,
            icon: Icon(Icons.refresh),
            onPressed: _fetchData,
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _fetchData,
        child: Stack(
          children: [
            Container(
              width: deviceSize.width,
              height: deviceSize.height,
              child: Image.asset(
                'assets/images/meting.jpg',
                fit: BoxFit.cover,
              ),
            ),
            Container(
              width: deviceSize.width,
              height: deviceSize.height,
              // color: Colors.white,
              alignment: Alignment.center,
              child: Container(
                // color: Colors.white,
                width: deviceSize.width * 0.8,
                height: deviceSize.height * 0.8,
                child: _isLoading
                    ? Center(
                        child: CircularProgressIndicator(
                          backgroundColor: Colors.white,
                        ),
                      )
                    : ListView.builder(
                        itemCount: _componentList.length,
                        itemBuilder: (ctx, index) {
                          return RoomComponent(
                            changeState: _chengeState,
                            id: _componentList[index]['id'],
                            key: Key(_componentList[index]['id']),
                            name: _componentList[index]['name'],
                            compState: _componentList[index]['state'],
                          );
                        },
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
