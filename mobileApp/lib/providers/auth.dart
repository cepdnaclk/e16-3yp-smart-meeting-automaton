import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;

class Auth with ChangeNotifier {
  String _token;
  DateTime _expireDate;
  String _userId;

  bool get isAuth {
    return token != null;
  }

  String get token {
    if (_expireDate != null &&
        _expireDate.isAfter(DateTime.now()) &&
        _token != null) {
      return _token;
    }
    return null;
  }

  Future<void> signup(String userName, String password) async {
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

      final responseDate = json.decode(response.body);
      _token = responseDate['token'];
      _userId = userName;
      _expireDate = DateTime.now().add(
        Duration(
          minutes: responseDate['expire'],
        ),
      );
      notifyListeners();
    } catch (err) {
      print(err);
      throw err;
    }
  }
}
