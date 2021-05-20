import 'package:flutter/material.dart';

import 'package:http/http.dart' as http;
import 'package:mobileApp/Screen/roomManegerScreen.dart';

class RoomComponent extends StatefulWidget {
  final String name;
  final bool compState;
  final String id;
  final changeState;

  RoomComponent({
    this.changeState,
    this.name,
    this.compState,
    Key key,
    this.id,
  }) : super(key: key);

  @override
  _RoomComponentState createState() => _RoomComponentState(
        name: name,
        compState: compState,
        id: id,
      );
}

class _RoomComponentState extends State<RoomComponent> {
  bool compState;
  final String name;
  final String id;

  _RoomComponentState({
    this.name,
    this.compState,
    this.id,
  });

  bool _isLoading = false;

  Future<void> _changeCompState(bool nextState, String component) async {
    final String url = '';
    setState(() {
      _isLoading = true;
    });
    final payLoad = {
      'component': component,
      'id': id,
      'state': nextState,
    };
    try {
      // final respose = await http.post(
      //   url,
      //   headers: <String, String>{
      //     'x-auth': 'token',
      //   },
      //   body: payLoad,
      // );
      // print(respose);
      widget.changeState(id, nextState);
    } catch (e) {
      throw (e);
    }
    // resposeData = json.decode(respose.body);

    setState(() {
      compState = nextState;
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: _isLoading
          ? Center(
              child: CircularProgressIndicator(
                backgroundColor: Colors.white,
              ),
            )
          : SwitchListTile(
              activeColor: Colors.black,
              title: Text(
                name,
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
