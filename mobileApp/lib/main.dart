import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './providers/auth.dart';
import './Screen/authScreen.dart';
import './Screen/roomManegerScreen.dart';
import './Screen/timeTableScreen.dart';

void main() => runApp(SMA());

class SMA extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider.value(
          value: Auth(),
        ),
        // ChangeNotifierProxyProvider<Auth, TimeTable>(
        //   builder: (ctx, auth, ),
        // ),
      ],
      child: Consumer<Auth>(
        builder: (ctx, auth, _) => MaterialApp(
          title: 'SMA',
          theme: ThemeData(
            primarySwatch: Colors.deepPurple,
            accentColor: Colors.black,
            fontFamily: 'Lato',
          ),
          home: RoomManeger(),
          // RoomManeger(),
          //auth.isAuth ? TimeTable() : AuthScreen(),
          routes: {},
        ),
      ),
    );
  }
}
