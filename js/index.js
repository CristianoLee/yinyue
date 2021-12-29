// window.addEventListener('load', function () {
//     var img = this.document.querySelector('.pic');
//     var ol = document.querySelector('ol');
//     var flag = true; // 节流阀控制图片
//     // 把这些图片路径放入一个数组
//     var imgArr = [
//         "images/1.jpg",
//         "images/2.jpg",
//         "images/3.jpg",
//         "images/4.jpg",
//         "images/5.jpg"
//     ];
//     var index = 0; // 图片当前索引值
//     // 生成对应图片个数的li
//     for (let i = 0; i < imgArr.length; i++) {
//         // 创造li
//         var li = this.document.createElement('li');
//         // 将li添加到ol中
//         ol.appendChild(li);
//         changeImg();
//         // 点击li按钮切换到相应图片
//         ol.children[i].onclick = () => {
//             console.log('点击');
//             flag = false;
//             index = i;
//             changeImg();
//             circleChange(index);
//             this.setTimeout(function () {
//                 flag = true;
//             }, 2000);
//         }
//     }

//     circleChange(index);
//     // 鼠标经过静止图片轮播
//     img.onmouseover = () => {
//         flag = false;
//     }
//     // 鼠标离开图片继续轮播
//     img.onmouseleave = () => {
//         flag = true;
//     }

//     // 此方法给图片添加路径
//     function changeImg() {
//         img.src = imgArr[index];
//     }

//     // 回到上一张图片
//     function prev() {
//         if (index == 0) {
//             index = imgArr.length - 1;
//         } else {
//             index--;
//         }
//         changeImg();
//     }

//     // 去下一张图片
//     function next() {
//         if (flag) {
//             if (index == imgArr.length - 1) {
//                 index = 0;
//             } else {
//                 index++;
//             }
//             circleChange(index);
//             changeImg();
//         }

//     }
//     var timer = setInterval(function () {
//         next();
//     }, 2000);
//     // 按钮随着图片变化
//     function circleChange(index) {
//         for (let i = 0; i < ol.children.length; i++) {
//             ol.children[i].style.backgroundColor = '';
//         }
//         ol.children[index].style.backgroundColor = 'blue';
//     }
// })