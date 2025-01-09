import Konva from './src';
const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
});

const gridLayer = new Konva.Layer();
stage.add(gridLayer);

const layer = new Konva.Layer();
stage.add(layer);

// 网格配置
const gridConfig = {
    spacing: 20,
    color: '#ddd',
    strokeWidth: 0.5,
    buffer: 1.5,
};

let currentViewport = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
};

function drawGrid() {
    gridLayer.clear();

    const scale = stage.scaleX();
    const spacing = gridConfig.spacing;

    // 计算视口范围（世界坐标）
    const viewportLeft = -stage.x() / scale;
    const viewportTop = -stage.y() / scale;
    const viewportWidth = stage.width() / scale;
    const viewportHeight = stage.height() / scale;

    // 计算缓冲区
    const bufferSize = {
        x: (viewportWidth * (gridConfig.buffer - 1)) / 2,
        y: (viewportHeight * (gridConfig.buffer - 1)) / 2,
    };

    // 计算网格起点（确保对齐到网格）
    const startX = Math.floor((viewportLeft - bufferSize.x) / spacing) * spacing;
    const startY = Math.floor((viewportTop - bufferSize.y) / spacing) * spacing;
    const endX =
        Math.ceil((viewportLeft + viewportWidth + bufferSize.x) / spacing) *
        spacing;
    const endY =
        Math.ceil((viewportTop + viewportHeight + bufferSize.y) / spacing) *
        spacing;

    currentViewport = { startX, startY, endX, endY };

    const group = new Konva.Group();
    // 创建垂直线
    for (let x = startX; x <= endX; x += spacing) {
        const line = new Konva.Line({
            points: [x, startY, x, endY],
            stroke: gridConfig.color,
            strokeWidth: gridConfig.strokeWidth / scale,
            listening: false,
        });
        group.add(line);
    }

    // 创建水平线
    for (let y = startY; y <= endY; y += spacing) {
        const line = new Konva.Line({
            points: [startX, y, endX, y],
            stroke: gridConfig.color,
            strokeWidth: gridConfig.strokeWidth / scale,
            listening: false,
        });
        group.add(line);
    }

    gridLayer.add(group);
}

function checkNeedsRedraw() {
    const scale = stage.scaleX();
    const viewportLeft = -stage.x() / scale;
    const viewportTop = -stage.y() / scale;
    const viewportRight = viewportLeft + stage.width() / scale;
    const viewportBottom = viewportTop + stage.height() / scale;

    const margin = gridConfig.spacing * 2;

    return (
        viewportLeft < currentViewport.startX + margin ||
        viewportRight > currentViewport.endX - margin ||
        viewportTop < currentViewport.startY + margin ||
        viewportBottom > currentViewport.endY - margin
    );
}

// 处理拖拽
stage.on('dragmove', () => {
    if (checkNeedsRedraw()) {
        drawGrid();
    }
});

stage.on('wheel', (e) => {
    e.evt.preventDefault();

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
    };

    let newScale = e.evt.deltaY > 0 ? oldScale * 0.9 : oldScale * 1.1;
    newScale = Math.max(0.1, Math.min(newScale, 10));

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
    };

    stage.position(newPos);
    drawGrid();
});

stage.draggable(true);
drawGrid();
const circle = new Konva.Circle({
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    fill: 'red',
});
layer.add(circle);

window.addEventListener('resize', () => {
    stage.width(window.innerWidth);
    stage.height(window.innerHeight);
    drawGrid();
});
var tr = new Konva.Transformer({
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
    rotateAnchorOffset: 0,
    anchorSize: 7,
    rotationSnaps: [0, 90, 180, 270],
    flipEnabled: false,
});
layer.add(tr);
tr.nodes([circle]);
const trn = tr.findOne('.top-left');
console.log(trn);
trn.on('mouseenter', function (params) {
    console.log(params.evt.pageX);
});
const p = trn.getAbsolutePosition();
const circle1 = new Konva.Circle({
    width: 20,
    height: 20,
    fill: 'red',
    x: p.x,
    y: p.y,
});
layer.add(circle1);
circle1.on('mouseenter', () => {
    console.log('enter');
});
// const deleteButton = new Konva.Circle({
//   radius: 10,
//   fill: 'red',
// });

// tr.add(deleteButton);

// function updatePos() {
//   deleteButton.position(tr.findOne('.top-right').position());
// }

// updatePos();

// circle.on('transform', updatePos);
