import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';

class MapLocation extends StatefulWidget {
  final double x;
  final double y;
  const MapLocation(this.x, this.y);

  @override
  State<MapLocation> createState() => _MapLocationState();
}

class _MapLocationState extends State<MapLocation> {

  GoogleMapController? _controller;
  Location _location = Location();

  void _onMapCreated(GoogleMapController _cntlr)
  {
    _controller = _cntlr;
    _location.onLocationChanged.listen((l) {
      _controller?.animateCamera(
        CameraUpdate.newCameraPosition(
          CameraPosition(target: LatLng(l.latitude!, l.longitude!),zoom: 40),
        ),
      );
    });
  }
  static const _initialcameraposition = CameraPosition(
      target: LatLng(36.81654752781123, 10.16827768338616),
    zoom:11.5,
  );

  static final Marker _markerRes = Marker(
    markerId: MarkerId("Marker"),
    infoWindow: InfoWindow(title: "Restaurant Location"),
    icon: BitmapDescriptor.defaultMarker,
    position: LatLng(36.81424197824252, 10.175241101715837),
  );

  static final Marker _markerClient = Marker(
    markerId: MarkerId("Marker"),
    infoWindow: InfoWindow(title: "Client Location"),
    icon: BitmapDescriptor.defaultMarker,
    position: LatLng(36.81654752781123, 10.16827768338616),
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GoogleMap(
        markers: {
          _markerRes,
          _markerClient
        },
        mapType: MapType.normal,
        onMapCreated: _onMapCreated,
        myLocationEnabled: true,
        initialCameraPosition: _initialcameraposition,
      ),
    );
  }
}
