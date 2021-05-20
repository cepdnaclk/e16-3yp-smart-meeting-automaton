import 'package:flutter/material.dart';

class RoomComponent extends StatefulWidget {
  final String name;
  final bool compState;

  RoomComponent({this.name, this.compState});

  @override
  _RoomComponentState createState() => _RoomComponentState(
        name: name,
        compState: compState,
      );
}

class _RoomComponentState extends State<RoomComponent> {
  bool compState;
  final String name;
  _RoomComponentState({this.name, this.compState});
  @override
  Widget build(BuildContext context) {
    print(compState);
    print(name);
    return Container(
      color: Colors.white,
      child: SwitchListTile(
        title: Text(name),
        value: compState,
        onChanged: (val) {
          print(val);
          setState(() {
            compState = val;
          });
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
