import 'dart:convert';

import 'package:flutter/material.dart';

import 'package:http/http.dart' as http;
import 'package:mobileApp/Screen/roomManegerScreen.dart';

class RoomComponent extends StatefulWidget {
  final String name;
  final bool compState;
  final String id;
  final changeState;
  final compId;

  RoomComponent({
    this.changeState,
    this.name,
    this.compId,
    this.compState,
    Key key,
    this.id,
  }) : super(key: key);

  @override
  _RoomComponentState createState() => _RoomComponentState(
        name: name,
        compState: compState,
        id: id,
        compId: compId,
      );
}

class _RoomComponentState extends State<RoomComponent> {
  bool compState;
  final String name;
  final String id;
  final compId;

  _RoomComponentState({
    this.name,
    this.compState,
    this.id,
    this.compId,
  });

  bool _isLoading = false;

  Future<void> _changeCompState(bool nextState, String component) async {
    String url = "http://10.0.2.2:3000/components/control/";
    print(component);
    if (component == "ac") {
      url += "ac";
      print(url);
    } else if (component == 'pro') {
      url += "pro";
      print(url);
    }
    setState(() {
      _isLoading = true;
    });
    final payLoad = {
      'component': component,
      'id': id,
      'state': nextState,
    };
    print('payload');
    try {
      final respose = await http.post(
        url,
        headers: <String, String>{
          'x-auth': 'token',
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: json.encode(payLoad),
      );
      print('res');
      print(respose);
      widget.changeState(id, nextState);
    } catch (e) {
      // throw (e);
      print(e);
    }
    // resposeData = json.decode(respose.body);

    setState(() {
      compState = nextState;
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white,
      elevation: 5,
      child: _isLoading
          ? Center(
              child: CircularProgressIndicator(
                backgroundColor: Colors.white,
              ),
            )
          : SwitchListTile(
              activeColor: Colors.black,
              title: Text(
                compId,
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.black,
                ),
              ),
              value: compState,
              onChanged: (val) {
                _changeCompState(val, name);
              },
              // controlAffinity: ListTileControlAffinity.leading,
            ),
    );
  }
}

// LayoutBuilder(
//       builder: (ctx, constrints) {
//         final avWidth = constrints.maxWidth;
//         return Row(
//           mainAxisAlignment: MainAxisAlignment.spaceAround,
//           children: [
//             Container(
//               width: avWidth > 50 ? 50 : avWidth * 0.6,
//               height: avWidth > 50 ? 50 : avWidth * 0.6,
//               color: Colors.white,
//             ),
//             Container(
//               child: SwitchListTile(
//                 value: true,
//                 onChanged: null,
//               ),
//             ),
//           ],
//         );
//       },
//     );
