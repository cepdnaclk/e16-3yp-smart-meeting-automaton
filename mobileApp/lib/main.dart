import 'package:flutter/material.dart';
import 'package:mobileApp/providers/auth.dart';
import 'package:provider/provider.dart';

import './Screen/authScreen.dart';
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
      ],
      child: MaterialApp(
        title: 'SMA',
        theme: ThemeData(
          primarySwatch: Colors.purple,
          accentColor: Colors.deepOrange,
          fontFamily: 'Lato',
        ),
        home: AuthScreen(),
        routes: {},
      ),
    );
  }
}
