export default [
  [{
    el: "mxwCar",
    type: "move",
    from: [460, 0, 700],
    to: [460, 0, 280],
    radian: Math.PI,
    hasGoods: false,
    time: 2000
  }],
  [{
    el: "mxwCar",
    type: "rotate",
    radian: Math.PI,
    varyRadian: Math.PI / 2,
    hasGoods: false,
    time: 2000
  }],
  [{
    el: "mxwCar",
    type: "move",
    from: [400, 0, 280],
    to: [590, 0, 280],
    hasGoods: false,
    time: 2000
  }],
  [{
    el: "mxwCar",
    type: "move",
    from: [590, 0, 280],
    to: [590, 0, 280],
    hasGoods: true,
    time: 500
  }],
  [{
    el: "mxwCar",
    type: "rotate",
    radian: Math.PI,
    varyRadian: -Math.PI / 2,
    hasGoods: true,
    time: 2000
  }],
  [{
    el: "mxwCar",
    type: "move",
    from: [590, 0, 280],
    to: [590, 0, -215],
    hasGoods: true,
    time: 2000
  }],
  [{
    el: "mxwCar",
    type: "rotate",
    radian: Math.PI,
    varyRadian: Math.PI / 2,
    hasGoods: true,
    time: 2000
  }],
  [{
    el: "mxwCar",
    type: "move",
    from: [590, 0, -215],
    to: [590, 0, -215],
    hasGoods: true,
    time: 500
  }],
  [{
    el: "mxwCar",
    type: "move",
    from: [590, 0, -215],
    to: [400, 0, -215],
    hasGoods: true,
    time: 1000
  }],
  [{
    el: "mxwCar",
    type: "rotate",
    radian: Math.PI,
    varyRadian: Math.PI / 2,
    hasGoods: true,
    time: 2000
  }],
  [{
    el: "mxwCar",
    type: "move",
    from: [400, 0, -215],
    to: [400, 0, 700],
    hasGoods: true,
    time: 3000
  }],
  [{
    el: "mxwCar",
    type: "move",
    from: [400, 0, 700],
    to: [400, 0, 700],
    hasGoods: true,
    time: 500
  }],
];
