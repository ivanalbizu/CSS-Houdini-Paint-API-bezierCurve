class CoordinateMap {
  // get a point (X,Y) inside a given bezierCurve ('t' is a distance (0 to 1))
  _getBezierXY(t, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey) {
    return {
      x:
        Math.pow(1 - t, 3) * sx +
        3 * t * Math.pow(1 - t, 2) * cp1x +
        3 * t * t * (1 - t) * cp2x +
        t * t * t * ex,
      y:
        Math.pow(1 - t, 3) * sy +
        3 * t * Math.pow(1 - t, 2) * cp1y +
        3 * t * t * (1 - t) * cp2y +
        t * t * t * ey,
    };
  }

  static get inputProperties() {
    return [
      '--colorLine',
      '--colorPoint',
      '--lineDash',
      '--sx',
      '--sy',
      '--cp1x',
      '--cp1y',
      '--cp2x',
      '--cp2y',
      '--ex',
      '--ey',
      '--point1',
      '--point2',
      '--points',
    ];
  }

  paint(ctx, size, props) {
    const { width, height } = size;

    const lineDash = props
      .get('--lineDash')
      .toString()
      .trim()
      .split(',')
      .map((p) => Number(p.trim()));

    const colorLine = props.get('--colorLine').toString();
    const colorPoint = props.get('--colorPoint').toString();
    const sx = (Number(props.get('--sx')) * width) / 100 || 0;
    const sy = (Number(props.get('--sy')) * height) / 100 || 0;
    const cp1x = (Number(props.get('--cp1x')) * width) / 100 || 0;
    const cp1y = (Number(props.get('--cp1y')) * height) / 100 || 0;
    const cp2x = (Number(props.get('--cp2x')) * width) / 100 || 0;
    const cp2y = (Number(props.get('--cp2y')) * height) / 100 || 0;
    const ex = (Number(props.get('--ex')) * width) / 100 || 0;
    const ey = (Number(props.get('--ey')) * height) / 100 || 0;
    const point1 = Number(props.get('--point1')) / 100 || 0;
    const point2 = Number(props.get('--point2')) / 100 || 0;

    ctx.beginPath();
    ctx.setLineDash(lineDash);
    ctx.strokeStyle = colorLine;
    ctx.lineWidth = 1.5;
    ctx.moveTo(sx, sy);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey);
    ctx.stroke();

    const p1 = this._getBezierXY(
      point1,
      sx,
      sy,
      cp1x,
      cp1y,
      cp2x,
      cp2y,
      ex,
      ey
    );
    const p2 = this._getBezierXY(
      point2,
      sx,
      sy,
      cp1x,
      cp1y,
      cp2x,
      cp2y,
      ex,
      ey
    );
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle = colorPoint;
    ctx.arc(p1.x, p1.y, 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(p2.x, p2.y, 8, 0, 2 * Math.PI);
    ctx.stroke();

    // With array of length points
    const points = props
      .get('--points')
      .toString()
      .trim()
      .split(',')
      .map((p) => Number(p.trim()) / 100);
    points.forEach((point) => {
      const p = this._getBezierXY(
        point,
        sx,
        sy,
        cp1x,
        cp1y,
        cp2x,
        cp2y,
        ex,
        ey
      );
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, 2 * Math.PI);
      ctx.stroke();
    });
  }
}

registerPaint('coordinateMap', CoordinateMap);
