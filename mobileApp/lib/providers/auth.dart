import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;

class Auth with ChangeNotifier {
  String _token;
  DateTime _expireDate;
  String _userId;

  Future<void> signup(String userName, String password) async {
    print(userName);
    print(password);
    final payLoad = {
      'userId': userName,
      'password': password,
    };
    final String url = 'http://10.0.2.2:5000/login/admin';
    try {
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: json.encode(payLoad),
      );
      print(response.body);
    } catch (err) {
      print(err);
      throw err;
    }
  }
}
