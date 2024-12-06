import { useEffect } from "react";
import "./App.less";



// const cropArea = document.getElementById('cropArea');
// let currentImage = null;
// let currentCroppedImage = null;


// function setupCropArea(img) {
//   const ratio = Math.min(cropArea.offsetWidth / img.width, cropArea.offsetHeight / img.height);
//   const width = img.width * ratio;
//   const height = img.height * ratio;
//   img.style.width = width + 'px';
//   img.style.height = height + 'px';
//   img.style.top = (cropArea.offsetHeight - height) / 2 + 'px';
//   img.style.left = (cropArea.offsetWidth - width) / 2 + 'px';
//   img.style.position = 'absolute';

//   // 添加裁剪区域选择功能
//   let startX, startY, width, height;
//   let dragging = false;

//   cropArea.addEventListener('mousedown', function (e) {
//     startX = e.offsetX;
//     startY = e.offsetY;
//     dragging = true;
//   });

//   document.addEventListener('mousemove', function (e) {
//     if (dragging) {
//       const x = e.offsetX;
//       const y = e.offsetY;
//       width = Math.abs(x - startX);
//       height = Math.abs(y - startY);
//       drawRectangle(startX, startY, width, height);
//     }
//   });

//   document.addEventListener('mouseup', function () {
//     dragging = false;
//     cropImage();
//   });

//   const drawRectangle = (x: number, y: number, w: number, h: number) => {
//     cropArea.innerHTML = ''; // 清除之前的矩形
//     const rect = document.createElement('div');
//     rect.style.position = 'absolute';
//     rect.style.border = '1px solid white';
//     rect.style.top = y + 'px';
//     rect.style.left = x + 'px';
//     rect.style.width = w + 'px';
//     rect.style.height = h + 'px';
//     cropArea.appendChild(rect);
//   }

//   const cropImage = () => {
//     const canvas = document.createElement('canvas');
//     canvas.width = width;
//     canvas.height = height;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(currentImage, startX, startY, width, height, 0, 0, width, height);
//     const dataUrl = canvas.toDataURL('image/png');
//     document.getElementById('croppedImage').src = dataUrl;
//     // 这里可以添加代码将裁剪后的图片保存到服务器或者进行其他处理
//   }
// }



function App() {

  
  const handleImages = (event: any) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        // img.onload = function () {
        //   currentImage = img;
        //   cropArea.innerHTML = ''; // 清除之前的图片
        //   cropArea.appendChild(img); // 显示新图片
        //   setupCropArea(img);
        // };
        // img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {

    const cropArea = document.getElementById('cropArea');
    let currentImage = null;
    let currentCroppedImage = null;

  
  }, [])

  return (
    <div className="App">

      <input type="file" id="imageLoader" multiple onChange={handleImages} />
      <div id="cropArea"></div>
      <img id="croppedImage" />

    </div>
  );
}

export default App;




