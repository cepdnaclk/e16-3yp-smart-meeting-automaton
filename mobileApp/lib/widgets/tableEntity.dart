import 'package:flutter/material.dart';

class TableEntity extends StatelessWidget {
  final String room;
  final String sub;
  final String time;

  TableEntity({this.room, this.sub, this.time});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (ctx, constraint) {
        final weightAv = constraint.maxWidth;
        return Row(
          // mainAxisAlignment: MainAxisAlignment.spaceAround,
          // crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              // color: Colors.white12,
              width: weightAv * 0.3,
              child: Card(
                color: Colors.white,
                child: Text(
                  room,
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                    fontStyle: FontStyle.italic,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
            Container(
              // color: Colors.white12,
              width: weightAv * 0.3,
              child: Card(
                color: Colors.white,
                child: Text(
                  sub,
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                    fontStyle: FontStyle.italic,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
            Container(
              // color: Colors.white12,
              width: weightAv * 0.3,
              child: Card(
                color: Colors.white,
                child: Text(
                  time,
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                    fontStyle: FontStyle.italic,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}
