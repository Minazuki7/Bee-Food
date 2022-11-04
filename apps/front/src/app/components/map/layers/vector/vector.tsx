import { PureComponent } from "react";
import { MapBrowserEvent } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { transform } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import Circle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import { MapContext } from "../../map";
import { IMapContext } from "../../map-types";
import { TVectorLayerProps, TVectorLayerComponentProps } from "./vector-types";

class VectorLayerComponent extends PureComponent<TVectorLayerComponentProps> {
  layer!: VectorLayer;
  source!: VectorSource;

  componentDidMount() {
    this.source = new VectorSource({
      features: undefined,
    });

    this.layer = new VectorLayer({
      source: this.source,
    });

    this.props.map.addLayer(this.layer);
    this.props.map.on("singleclick", this.onMapClick);
  }

  /*
  componentWillUnmount() {
    this.props.map.removeLayer(this.layer);
  }
  componentDidUpdate(prevProps: TVectorLayerComponentProps) {
    if (prevProps.features != this.props.features) {
      this.source.clear();
      if (this.props.features) {
        this.source.addFeatures(this.props.features);
      }
    }
  }
  */

  onMapClick = (event: MapBrowserEvent) => {
    const destination = "EPSG:3857";
    const source = "EPSG:4326";

    const coord = this.props.selected;
    let x = transform(coord, source, destination);

    const featureToAdd = new Feature({
      geometry: new Point(x),
    });
    const style = new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: "red" }),
        stroke: new Stroke({
          color: [0, 0, 0],
          width: 2,
        }),
      }),
    });
    featureToAdd.setStyle(style);
    this.source.clear();
    this.source.addFeatures([featureToAdd]);
  };

  render() {
    return null;
  }
}
export const VectorLayerWithContext = (props: TVectorLayerProps) => {
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          return (
            <VectorLayerComponent
              {...props}
              map={mapContext.map}
              selected={mapContext.selected}
            />
          );
        }
        return;
      }}
    </MapContext.Consumer>
  );
};
