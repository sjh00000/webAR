AFRAME.registerComponent('arline', {
    schema: {
      start: { type: 'vec3' },
      end: { type: 'vec3' },
      color: { default: '#ff0000' }
    },
    init: function() {
      var start = this.data.start;
      var end = this.data.end;
      var color = this.data.color;
      var line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([start, end]),
        new THREE.LineBasicMaterial({ color: color, linewidth: 20 })
      );

      this.el.object3D.add(line);

      // 使用animation组件使线段动态
      this.el.setAttribute('animation', {
        property: 'position',
        dur: 5000, // 持续时间
        from: end, // 起始点
        to: { x: end.x+1 , y: end.y, z: end.z }, // 终点
        loop: true, // 循环播放
        easing: 'linear' // 缓动函数

      });
    }
  });

  AFRAME.registerComponent('flow-curve', {
    init: function() {
      var curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.3, -3),
        new THREE.Vector3(1, 0, -3),
        new THREE.Vector3(0, -0.3, -1),
        new THREE.Vector3(-1, -0.1, -2),
        new THREE.Vector3(0, -0.2, -3),
      ]);

      var geometry = new THREE.Geometry().setFromPoints(curve.getPoints(100));
      var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
      var line = new THREE.Line(geometry, material);

      this.el.setObject3D('line', line);
    }
  });

  AFRAME.registerComponent('arc-curve', {
    init: function() {
      var curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-1, 0.2, -3),
        new THREE.Vector3(0, 0.4, -2),
        new THREE.Vector3(1, 0.7, -3)
      );

      var geometry = new THREE.Geometry().setFromPoints(curve.getPoints(50));
      var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
      var line = new THREE.Line(geometry, material);

      this.el.setObject3D('line', line);
    }
  });