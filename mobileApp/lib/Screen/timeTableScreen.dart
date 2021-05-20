import 'dart:convert';

import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../widgets/tableEntity.dart';

class TimeTable extends StatefulWidget {
  static const String routName = '/time-Table';

  @override
  _TimeTableState createState() => _TimeTableState();
}

class _TimeTableState extends State<TimeTable> {
  bool _isInit = false;
  bool _isLoading = false;
  List _timeTableData;

  @override
  void initState() {
    _isInit = true;
    super.initState();
  }

  Future<void> _fetchData() async {
    final String url = 'http://10.0.2.2:5000/main/timeTable';
    try {
      final respose = await http.post(
        url,
        body: null,
      );
      _timeTableData = json.decode(respose.body);
      print(_timeTableData);
    } catch (e) {
      throw (e);
    }
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

  Future<void> _qrCodeScanner() async {
    try {
      final qrCode = await FlutterBarcodeScanner.scanBarcode(
        '#ff6666',
        'Cancel',
        true,
        ScanMode.QR,
      );
      print(qrCode);
    } catch (e) {
      print(e);
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

  @override
  Widget build(BuildContext context) {
    final deviceSize = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
        title: Text('Time Table'),
        actions: [
          IconButton(
            color: Colors.black,
            icon: Icon(Icons.qr_code_scanner),
            onPressed: _qrCodeScanner,
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
                width: deviceSize.width * 0.8,
                height: deviceSize.height * 0.8,
                child: _isLoading
                    ? Center(
                        child: CircularProgressIndicator(
                          backgroundColor: Colors.white,
                        ),
                      )
                    : ListView.builder(
                        itemBuilder: (ctx, index) {
                          return TableEntity(
                            key: _timeTableData[index]['id'],
                            room: _timeTableData[index]['room'],
                            sub: _timeTableData[index]['sub'],
                            time: _timeTableData[index]['time'],
                          );
                        },
                        itemCount: _timeTableData.length,
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
