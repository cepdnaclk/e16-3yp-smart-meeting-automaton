import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './Screen/authScreen.dart';
import './Screen/timeTableScreen.dart';
import './providers/auth.dart';

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
            primarySwatch: Colors.blue,
            accentColor: Colors.black,
            fontFamily: 'Lato',
          ),
          home: TimeTable(),
          //auth.isAuth ? TimeTable() : AuthScreen(),
          routes: {},
        ),
      ),
    );
  }
}
