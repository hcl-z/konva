import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Stage, Layer, Circle, Transformer } from '../../lib';

function App() {
  useEffect(() => {
    const stage = new Stage({
      container: 'container',
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const layer = new Layer();
    stage.add(layer);
    const circle = new Circle({
      x: 300,
      y: 300,
      radius: 50,
      fill: 'red',
    });
    layer.add(circle);
    var tr = new Transformer({
      anchorStroke: 'rgba(30, 150, 235, 1)',
      anchorFill: 'white',
      anchorCornerRadius: 10,
      anchorStrokeWidth: 2,
      anchorSize: 8,
      borderStroke: 'rgba(30, 150, 235, 1)',
      borderStrokeWidth: 2,
      rotateLineVisible: false,
      useSingleNodeRotation: false,
      shouldOverdrawWholeArea: true,
      // rotateEnabled: false,
      // rotateAnchorOffset: 0,
      rotationSnaps: [0, 90, 180, 270],
      flipEnabled: false,
    });
    var tr1 = new Transformer({
      anchorStroke: 'rgba(30, 150, 235, 1)',
      anchorFill: 'white',
      anchorCornerRadius: 10,
      anchorStrokeWidth: 2,
      anchorSize: 8,
      borderStroke: 'rgba(30, 150, 235, 1)',
      borderStrokeWidth: 2,
      rotateLineVisible: false,
      useSingleNodeRotation: false,
      shouldOverdrawWholeArea: true,
      // rotateEnabled: false,
      // rotateAnchorOffset: 0,
      rotationSnaps: [0, 90, 180, 270],
      flipEnabled: false,
    });
    console.log(tr, tr1);
    layer.add(tr);
    tr.nodes([circle]);
  }, []);
  return <div id="container"></div>;
}

export default App